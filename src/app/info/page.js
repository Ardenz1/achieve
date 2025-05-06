import Link from  'next/link';
export default function Info() {
    return (
      <div className=" relative bg-[url('/infobg.png')] bg-cover bg-center items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Link href="/">
          <i className="absolute top-5 left-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-orange"></i>
        </Link>
        <h1 className="font-bold text-4xl mb-20 mt-10">Nutrition Info </h1>

        <div className="bg-white w-full text-xl p-6 rounded-lg shadow-md text-achieve-grey lg:w-1/2 mx-auto">
        <p>Hello! Thank you for using or visiting achieve, this page explains the math behind how this works and my inspiration behind it!</p>
        <h4 className="font-bold text-xl mt-10">Inspiration</h4>
          <p>This app was born from my own health journey. I wanted a tool that could help me track my nutrition while being flexible enough to accommodate different needs.</p>
          <p>For me, it’s a way to log my daily food intake. For someone else, it might be a way to focus on tracking protein consumption. My goal was to make a simple yet adaptable tool that works for everyone.</p>
        <h4 className="font-bold text-xl mt-10">Math</h4>
        <p>A healthy daily calorie intake typically ranges from 1,600 to 3,000 calories, depending on factors like age, sex, activity level, and overall health. Based on the Dietary Guidelines for Americans, this app uses a 2,000-calorie daily average as a reference point.</p>
        <p>The calculations are straightforward: <br></br> (Amount / Serving Size) × Calories, Protein, Fat, etc. <br></br> This helps provide a clear breakdown of your daily intake based on the portions you consume.</p>
       <br></br> <p> If you only want to track one of the nutrients like protien, simply enter amount consumed and serving size, plus the nutrient you want to track. </p>
        <h4 className="font-bold text-xl mt-10">Sources</h4>
        <Link className="hover:text-achieve-orange" href="https://www.dietaryguidelines.gov/" target="_blank">    
         <p>*https://www.dietaryguidelines.gov/</p></Link>
     
        </div>
      
      </div>
 
    );
  }
  