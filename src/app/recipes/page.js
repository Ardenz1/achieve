'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Info() {
  // State to manage the visibility of the recipe list
  const [glutenFreeVisible, setGlutenFreeVisible] = useState(false);
  const [dashDietVisible, setDashDietVisible] = useState(false);
  const [mediterraneanVisible, setMediterraneanVisible] = useState(false);
  const [vegetarianVisible, setVegetarianVisible] = useState(false);
  const [snacksVisible, setSnacksVisible] = useState(false);

  // Toggle visibility for each food diet section
  const toggleVisibility = (section) => {
    switch (section) {
      case 'glutenFree':
        setGlutenFreeVisible(!glutenFreeVisible);
        break;
      case 'dashDiet':
        setDashDietVisible(!dashDietVisible);
        break;
      case 'mediterranean':
        setMediterraneanVisible(!mediterraneanVisible);
        break;
      case 'vegetarian':
        setVegetarianVisible(!vegetarianVisible);
        break;
      case 'snacks':
        setSnacksVisible(!snacksVisible);
        break;
      default:
        break;
    }
  };

  return (
    
    <div className="relative bg-[url('/recipesbg.png')] bg-cover bg-center items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Link href="/">
      <i className="absolute top-5 left-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-purple"></i>
    </Link>
    <h1 className="font-bold text-4xl mb-10 text-center">Meal Suggestions</h1>
  
    {/* Grid Layout */}
    <div className="grid grid-cols-1  gap-8 w-full max-w-7xl mx-auto">
      
      {/* Gluten Free Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className={`flex items-center justify-between bg-achieve-purple  text-achieve-grey p-4 rounded-lg`}>
          <h3 className="font-bold text-2xl">Gluten Free</h3>
          <button onClick={() => toggleVisibility('glutenFree')}>
            <i className={`fa-solid text-2xl ${glutenFreeVisible ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${glutenFreeVisible ? 'max-h-[500px] p-4' : 'max-h-0 p-0'} bg-achieve-purple/20 rounded-b-lg`}>
        <p><Link target="_blank" href="https://www.monashfodmap.com/recipe/chocolate-mug-cake/">Chocolate Mug Cake
        </Link></p>
          <p><Link target="_blank" href="https://mygluten-freekitchen.com/gluten-free-slow-cooker-turkey-and-rice-soup/">Gluten-free Slow Cooker Turkey and Rice Soup</Link></p>
          <p><Link target="_blank" href="https://www.mamaknowsglutenfree.com/gluten-free-tortillas/">Gluten-Free Tortillas</Link></p>
          <p><Link target="_blank" href="https://www.mamaknowsglutenfree.com/gluten-free-fried-rice/">Gluten-Free Fried Rice
          </Link></p>
        </div>
      </div>
  
      {/* DASH Diet Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className={`flex items-center justify-between bg-achieve-bluepurple  text-achieve-grey p-4 rounded-lg`}>
          <h3 className="font-bold text-2xl">DASH Diet</h3>
          <button onClick={() => toggleVisibility('dashDiet')}>
            <i className={`fa-solid text-2xl ${dashDietVisible ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${dashDietVisible ? 'max-h-[500px] p-4' : 'max-h-0 p-0'} bg-achieve-bluepurple/20 rounded-b-lg`}>
        <p><Link target="_blank" href="https://www.mayoclinic.org/healthy-lifestyle/recipes/banana-oatmeal-pancakes/rcp-20197673">
        Banana oatmeal pancakes</Link></p>
        <p><Link target="_blank" href="https://www.eatingwell.com/recipe/7939117/chickpea-pasta-with-mushrooms-kale/">Chickpea Pasta with Mushrooms & Kale</Link></p>
        <p><Link target="_blank" href="https://www.eatingwell.com/recipe/267223/walnut-rosemary-crusted-salmon/">Walnut-Rosemary Crusted Salmon</Link></p>
        <p><Link target="_blank" href="https://www.tasteofhome.com/recipes/black-bean-sweet-potato-rice-bowls/">Sweet Potato Bowl</Link></p>
        </div>
      </div>
  
      {/* Mediterranean Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className={`flex items-center justify-between bg-achieve-pink  text-achieve-grey p-4 rounded-lg`}>
          <h3 className="font-bold text-2xl">Mediterranean</h3>
          <button onClick={() => toggleVisibility('mediterranean')}>
            <i className={`fa-solid text-2xl ${mediterraneanVisible ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${mediterraneanVisible ? 'max-h-[500px] p-4' : 'max-h-0 p-0'} bg-achieve-pink/20 rounded-b-lg`}>
          <p><Link target="_blank" href="https://www.themediterraneandish.com/spanakopita-egg-muffins/">Spanakopita Egg Muffins</Link></p>
          <p><Link target="_blank" href="https://www.themediterraneandish.com/sweet-potato-hash-recipe/">Sweet Potato Hash</Link></p>
          <p><Link target="_blank" href="https://www.themediterraneandish.com/greek-sheet-pan-chicken/">Greek Sheet-Pan Chicken</Link></p>
          <p><Link target="_blank" href="https://www.themediterraneandish.com/chicken-shawarma-recipe/">Easy Homemade Chicken Shawarma</Link></p>
        </div>
      </div>
  
      {/* Vegetarian Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className={`flex items-center justify-between bg-achieve-orange  text-achieve-grey p-4 rounded-lg`}>
          <h3 className="font-bold text-2xl">Vegetarian</h3>
          <button onClick={() => toggleVisibility('vegetarian')}>
            <i className={`fa-solid text-2xl ${vegetarianVisible ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${vegetarianVisible ? 'max-h-[500px] p-4' : 'max-h-0 p-0'} bg-achieve-orange/20 rounded-b-lg`}>
        <p><Link target="_blank" href="https://cookieandkate.com/spinach-lasagna/">Spinach Lasagna</Link></p>
        <p><Link target="_blank" href="https://flavorfeeds.com/2025/03/11/honey-mustard-glazed-mushrooms-recipe-quick-side-dish/">Honey Mustard Glazed Mushrooms</Link></p>
        <p><Link target="_blank" href="https://www.themediterraneandish.com/chicken-shawarma-recipe/">Almond Flour Pancakes</Link></p>
        <p><Link target="_blank" href="https://minimalistbaker.com/coconut-curried-golden-lentils-20-minutes/">Coconut Curried Golden Lentils</Link></p>
        </div>
      </div>
  
      {/* Snacks & Desserts Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className={`flex items-center justify-between bg-achieve-yellow  text-achieve-grey p-4 rounded-lg`}>
          <h3 className="font-bold text-2xl">Snacks & Desserts</h3>
          <button onClick={() => toggleVisibility('snacks')}>
            <i className={`fa-solid text-2xl ${snacksVisible ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${snacksVisible ? 'max-h-[500px] p-4' : 'max-h-0 p-0'} bg-achieve-yellow/20 rounded-b-lg`}>
        <p><Link target="_blank" href="https://www.skinnytaste.com/cottage-cheese-cheesecake/">Cottage Cheese Cheesecake
        </Link></p>
        <p><Link target="_blank" href="https://www.skinnytaste.com/flourless-chocolate-cake/">Flourless Chocolate Cake
        </Link></p>
        <p><Link target="_blank" href="https://www.thepioneerwoman.com/food-cooking/recipes/a61100125/mock-apple-pie-recipe/">Mock Apple Pie
        </Link></p>
        <p><Link target="_blank" href="https://www.thepioneerwoman.com/food-cooking/recipes/a61769941/air-fryer-doughnuts-recipe/">Air Fryer Doughnuts
        </Link></p>
        </div>
      </div>
  
    </div>
  </div>
  
  );
}
