import React, { useState } from "react";
import { useNavigate } from "react-router";
import ServicesPage from "./ServicesPage";
import Footer from "../../Components/Footer/Footer";
import Review from "./Review";
import AdsCarousel from "../../Components/AdsCarousel/AdsCarousel";
import toast from "react-hot-toast";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const blocks = [
    {
      name: "Farm",
      description: "Explore the best farms in Wardha",
      icon: "/images/farm.png",
      link: "farm",
    },
    {
      name: "Plot",
      description: "Explore the best plots in Wardha",
      icon: "/images/plot.png",
      link: "plot",
    },
    {
      name: "House",
      description: "Explore the best houses in Wardha",
      icon: "/images/house.png",
      link: "house",
    },
    {
      name: "Flat",
      description: "Explore the best flats in Wardha",
      icon: "/images/flat.png",
      link: "flat",
    },
    {
      name: "Commercial",
      description: "Explore the best commercial properties in Wardha",
      icon: "/images/shop.png",
      link: "commercial",
    },
    {
      name: "Rent",
      description: "Explore the best rental properties in Wardha",
      icon: "/images/rent.png",
      link: "rent",
    },
  ];

  const searchHandler = () => {
    if (search) {
      localStorage.setItem("searchFilter", search);
      localStorage.setItem("typeFilter", "");
      navigate(`/properties`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#f9fafb] text-gray-900 flex flex-col">
        {/* Background Image with dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75"
          style={{ backgroundImage: "url(/images/loginbg.jpg)" }}
        ></div>

        {/* Main content container */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center md:items-start gap-16 min-h-[500px]">
          {/* Left: Headings & Search */}
          <section className="flex flex-col justify-center flex-1 max-w-lg text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              Discover Wardha's Real Estate Gems
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-light text-gray-100 max-w-md">
              Explore verified listings of plots, flats, farms and comercial properties in Wardha.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-2 max-w-md mx-auto md:mx-0">
              <input
                type="search"
                aria-label="Search properties"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="flex-grow rounded-lg border border-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-lg"
              />
              <button
                type="button"
                onClick={searchHandler}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg px-6 py-3 font-semibold text-white shadow-md transition"
              >
                Search
              </button>
            </div>
          </section>

          {/* Right: Property Categories Grid */}
          <section className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg w-full">
            {blocks.map((block, index) => (
              <CardType key={index} block={block} />
            ))}
          </section>
        </main>

        {/* Other page sections - no change in content or placement */}
        <AdsCarousel />
        <ServicesPage />
        <Review />
        <Footer />
      </div>
    </>
  );
};

const CardType = ({ block }) => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    localStorage.setItem("typeFilter", link);
    navigate(`/properties`);
  };

  return (
    <button
      type="button"
      onClick={() => handleClick(block.link)}
      className="group rounded-2xl bg-white bg-opacity-40 backdrop-blur-lg shadow-lg flex flex-col items-center p-6 text-gray-900 transition transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label={`Browse ${block.name} properties`}
    >
      <img
        src={block.icon}
        alt={`${block.name} icon`}
        className="w-16 h-16 mb-4 object-contain"
        loading="lazy"
      />
      <h3 className="text-xl font-semibold mb-1">{block.name}</h3>
      <p className="text-sm text-gray-700 hidden sm:block">{block.description}</p>
    </button>
  );
};

export default HomePage;
