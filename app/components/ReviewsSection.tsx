'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Vishal Kumar",
        rating: 5,
        comment: "Exceptional quality crackers! The vibrant colors and precise timing of the fireworks made our celebration truly memorable.",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        date: "January 15, 2025"
    },
    {
        id: 2,
        name: "Barath Ramanathan",
        rating: 5,
        comment: "Impressive selection of ground spinners. The long-lasting effects and safe performance exceeded our expectations.",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        date: "January 20, 2025"
    },
    {
        id: 3,
        name: "Niranjan Patel",
        rating: 5,
        comment: "Outstanding product quality and customer service. Will definitely purchase again for future celebrations.",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        date: "January 25, 2025"
    },
    {
        id: 4,
        name: "Deepak Raja",
        rating: 4,
        comment: "The sound crackers were impressive with their powerful yet safe performance. Highly recommended for enthusiasts!",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        date: "January 28, 2025"
    }
];

const ReviewsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    if (!isMounted) {
        return null; // Return null on server-side and initial client-side render
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
                    Customer Reviews
                </h2>
                
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
                        >
                            <div className="flex items-center mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={reviews[currentIndex].avatar}
                                        alt={reviews[currentIndex].name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{reviews[currentIndex].name}</h3>
                                    <div className="flex text-yellow-400">
                                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{reviews[currentIndex].comment}</p>
                            <p className="text-gray-400 text-sm">{reviews[currentIndex].date}</p>
                        </motion.div>
                    </AnimatePresence>

                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
