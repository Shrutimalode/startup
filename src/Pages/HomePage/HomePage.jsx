import React, { useState } from 'react';
import { FcShop, FcHome, FcInTransit, FcFactory, FcOrganization, FcLandscape } from "react-icons/fc";
import { useNavigate } from 'react-router';
import ServicesPage from './ServicesPage';

import toast from 'react-hot-toast';
import Footer from '../../Components/Footer/Footer';
import Review from './Review';
import AdsCarousel from '../../Components/AdsCarousel/AdsCarousel';



const HomePage = () => {
    const [search,setSearch] = useState('');
    const navigate = useNavigate();
    const blocks = [
        {
            name: 'Farm',
            description: 'Explore the best farms in Wardha',
            icon: '/images/farm.png',
            link: 'farm'
        },
        {
            name: 'Plot',
            description: 'Explore the best plots in Wardha',
            icon: '/images/plot.png',
            link: 'plot'
        },
        {
            name: 'House',
            description: 'Explore the best houses in Wardha',
            icon: '/images/house.png',
            link: 'house'
        },
        {
            name: 'Flat',
            description: 'Explore the best flats in Wardha',
            icon: '/images/flat.png',
            link: 'flat'
        },
        {
            name: 'Commercial',
            description: 'Explore the best commercial properties in Wardha',
            icon: '/images/shop.png',
            link: 'commercial'
        },
        {
            name: 'Rent',
            description: 'Explore the best rental properties in Wardha',
            icon: '/images/rent.png',
            link: 'rent'
        },
    ]

    const searchHandler = ()=>{
        if(search){
            localStorage.setItem('searchFilter', search);
            localStorage.setItem('typeFilter', '');
            navigate(`/properties`);
        }
        else{
            toast.error('Please enter a search term');
        }
    }


    return (
        <>
        <div className='h-full w-full relative'>
            <img src='/images/loginbg.jpg' className='bg-center absolute w-full h-full bg-cover blur-[3px]' />
            <div className="absolute z-[2] h-full w-full flex flex-col md:flex-row  overflow-y-auto items-center justify-center py-1 px-4 sm:px-8">
                <div className="grow basis-1/2 flex  items-center justify-center px-1 sm:px-26 md:px-32 ">
                    <div className="flex flex-col gap-12 px-2 sm:px-4 py-6">
                        <div className="text-4xl text-white sm:text-4xl md:text-6xl font-black text-wrap w-full overflow-hidden">
                            Discover Wardha's Real Estate Gems
                        </div>
                        <div className="opacity-90 text-white font-light text-wrap">
                            Explore verified listings of plots, flats, farms and
                            comercial properties in Wardha.
                        </div>

                        <div className="join w-full">
                            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="input focus-within:outline-none border-primary join-item" placeholder="Search" />
                            <button type='button' onClick={()=>searchHandler()} className="btn btn-primary join-item">Search</button>
                        </div>
                    </div>
                </div>
                <div className="grow basis-1/2 flex items-center justify-center w-full">
                    <div className="grid grid-cols-2 gap-4 min-w-fit items-center justify-center overflow-y-auto p-0 sm:p-4 w-full">
                        {blocks.map((block, index) => <CardType key={index} block={block} />)}
                    </div>
                </div>
            </div>
        </div>
        <AdsCarousel />
        <ServicesPage />
        <Review/>
        <Footer/>
        </>

    );
};

const CardType = ({block}) => {
    const navigate = useNavigate();

    const handleClick = (link) => {
        localStorage.setItem('typeFilter', link);
        navigate(`/properties`);
    }

    return (
        <button type='button' onClick={()=>handleClick(block.link)} className="basis-[45%] text-white px-1 grow glass opacity-80 hover:opacity-100 cursor-pointer py-2 card">
            <div className="icon basis-1/3 flex items-center justify-center w-full">
            {/* <block.icon className='text-4xl' /> */}
            <div className="relative w-16 h-16">
            <img src={block.icon} className='bg-cover'/>

            </div>
            </div>
            <div className="w-full basis-2/3 flex flex-col gap-2 items-center justify-center">
                <div className="text-lg sm:text-xl font-semibold">{block.name}</div>
                <span className='text-xs hidden sm:flex text-wrap'>{block.description}</span>
            </div>
        </button>
    )
}

export default HomePage;