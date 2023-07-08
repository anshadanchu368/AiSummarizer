import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-content items-center flex-col text-white border border-black">
      <nav className="flex  justify-between  items-center w-full mb-10 pt-3 border border-black">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/anshadanchu368")}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">Summarise article
      <br  className="max-md:hidden "/>
      <span className="orange_gradient">OpenAI</span></h1>
      <h2 className="desc">Simplify you reading ith summize an open source articel summarizer that transfors lengthy articles into clear and concise summaries </h2>
    </header>
  );
};

export default Hero;
