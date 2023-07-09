import React, { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from '../service/article'

const Demo = () => {
  const [article,setArticle]=useState({
    url:'',
    summary:''
  })
   
  const [allArticles, setAllArticles]=useState([]);

  


  const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('article')
    )

    if(articlesFromLocalStorage){
       setAllArticles(articlesFromLocalStorage)
    }
  },[]);


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const { data }= await getSummary({articleUrl: article.url})

    if(data?.summary){
      const newArticle = {
        ...article,
        summary:data.summary
      }


      const updatedAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
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
         <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
           {allArticles.map((item,index)=>(
            <div
             key={`link-${index}`}
             onClick={()=>setArticle(item)}
            className="link_card">

              <div className="copy_btm">
                <img src={copy} alt="copy_icon" className="w-[6-rem] h-[6-rem] object-contain" />
              </div>
                    
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>

            </div>
           ))}
         </div>
      </div>
      {/* {results} */}

      <div className="my-10 max-w-full flex-justify-center items-center">
         {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
         ) : error ? (
           <p className="font-inter font-bold text-black text-center">Well that wasnt supposed to happen
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
           </p>
         ):(
          article.summary && (
             <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article<span className="blue_gradient px-2">Summary</span></h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
             </div>
          )
         )}
      </div>
    </section>
  );
};

export default Demo;
