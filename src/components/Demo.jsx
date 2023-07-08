import React, { useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from '../service/article'

const Demo = () => {
  const [article,setArticle]=useState({
    url:'',
    summary:''
  })

  const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const { data }= await getSummary({articleUrl: article.url})

    if(data?.summary){
      const newArticle = {
        ...article,
        summary:data.summary
      }

      setArticle(newArticle);
      console.log(newArticle);
      console.log("Fetch error:", error);
    }
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* {search}
       */}
      <div className="flex flex-col w-full">
        <form
          className="relative justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-3 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a Url"
            value={article.url}
            onChange={(e)=>setArticle({
              ...article,
               url:e.target.value
            })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn
             peer-focus:border-gray-700
             peer-focus:text-gray-700"
          >
            Enter
          </button>
        </form>
        {/* {Browse Url istory} */}
      </div>
      {/* {results} */}
    </section>
  );
};

export default Demo;
