import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const reviews = [
    {
        id: 1,
        name: "John Doe",
        img: "/images/r1.png",
        review: "Great service and amazing experience! Highly recommend. Great service and amazing experience! Highly recommend. Great service and amazing experience! Highly recommend.",
        rating: 5,
        position: "MLA",
    },
    {
        id: 2,
        name: "Jane Smith",
        img: "/images/r1.png",
        review: "Very helpful and professional.",
        rating: 4,
        position: "MLA",
    },
    {
        id: 3,
        name: "Alice Johnson",
        img: "/images/r1.png",
        review: "Good experience overall.",
        rating: 3,
        position: "MLA",
    },
];

const Review = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Customer Reviews</h2>
            <Carousel
                showArrows={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showIndicators={false}
                className="bg-white dark:bg-base-300 p-1 max-w-100 w-full rounded-lg shadow-lg"
            >
                {reviews.map((review) => (
                    <div key={review.id} className="p-4 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-black dark:text-white">{review.name}</h4>
                        <p className="text-sm text-black dark:text-white text-center">{review.position}</p>
                        <div className="flex mt-2">
                            {Array(5).fill(0).map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">★</span>
                            ))}
                        </div>
                        <p className="line-clamp-2 text-sm opacity-80">{review.review}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Review;
