'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
    { id: 'featured', name: 'Featured Brands' },
    { id: 'standard', name: 'Standard Fireworks' },
    { id: 'kaliswari', name: 'Sri Kaliswari' },
    { id: 'ayyan', name: 'Ayyan Fireworks' },
    { id: 'coronation', name: 'Coronation' },
    { id: 'sony', name: 'Sony Fireworks' },
    { id: 'cock', name: 'Cock Brand' }
];

const brands = [
    {
        id: 1,
        name: "Standard Fireworks",
        description: "Leading manufacturer of quality fireworks since 1942",
        logo: "/demo.jpg",
        featured: true,
        products: [
            { id: 's1', name: "Sparkler Deluxe", price: 99 },
            { id: 's2', name: "Rocket Blast", price: 199 },
            { id: 's3', name: "Color Fountain", price: 149 }
        ]
    },
    {
        id: 2,
        name: "Sri Kaliswari",
        description: "Premium fireworks for all celebrations",
        logo: "/demo.jpg",
        featured: true,
        products: [
            { id: 'k1', name: "Mega Chakkar", price: 129 },
            { id: 'k2', name: "Flower Shower", price: 179 },
            { id: 'k3', name: "Thunder Bomb", price: 89 }
        ]
    },
    {
        id: 3,
        name: "Ayyan Fireworks",
        description: "Traditional and modern fireworks solutions",
        logo: "/demo.jpg",
        featured: false,
        products: [
            { id: 'a1', name: "Sparkle Rain", price: 109 },
            { id: 'a2', name: "Whistling Rocket", price: 159 }
        ]
    },
    {
        id: 4,
        name: "Coronation",
        description: "Innovative and safe firework products",
        logo: "/demo.jpg",
        featured: false,
        products: [
            { id: 'c1', name: "Sky Lantern", price: 79 },
            { id: 'c2', name: "Crackling Fountain", price: 139 }
        ]
    },
    {
        id: 5,
        name: "Sony Fireworks",
        description: "High-quality crackers for every occasion",
        logo: "/demo.jpg",
        featured: false,
        products: [
            { id: 'so1', name: "Color Smoke", price: 69 },
            { id: 'so2', name: "Spinning Top", price: 119 }
        ]
    },
    {
        id: 6,
        name: "Cock Brand",
        description: "Trusted name in fireworks industry",
        logo: "/demo.jpg",
        featured: true,
        products: [
            { id: 'cb1', name: "Aerial Shell", price: 229 },
            { id: 'cb2', name: "Roman Candle", price: 169 },
            { id: 'cb3', name: "Flower Pot", price: 99 }
        ]
    }
];

export default function ShopByBrands() {
    const [selectedBrand, setSelectedBrand] = useState(categories[0].id);
    
    const filteredBrands = selectedBrand === 'featured' 
        ? brands.filter(brand => brand.featured) 
        : brands.filter(brand => brand.name.toLowerCase().replace(/\s+/g, '-') === selectedBrand);

    return (
        <main className="min-h-screen bg-white">
            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Brands Sidebar */}
                        <div className="w-full md:w-1/4 lg:w-1/5">
                            <div className="bg-white border rounded-lg p-4 md:sticky md:top-24">
                                <h2 className="text-lg font-bold mb-4 text-black">Brands</h2>
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedBrand(category.id)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                                                selectedBrand === category.id
                                                    ? 'bg-red-500 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Brands Grid */}
                        <div className="w-full md:w-3/4 lg:w-4/5">
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {filteredBrands.map((brand) => (
                                    <Link
                                        key={brand.id}
                                        href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group"
                                    >
                                        <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="relative aspect-square overflow-hidden">
                                                <Image
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                                
                                                <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 py-1 text-xs md:text-sm rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 whitespace-nowrap">
                                                    View Products
                                                </button>
                                            </div>
                                            <div className="p-2 md:p-3">
                                                <h3 className="text-xs md:text-sm font-semibold text-black mb-1 truncate">{brand.name}</h3>
                                                <p className="text-xs text-gray-500 mb-1 line-clamp-2">{brand.description}</p>
                                                <p className="text-xs md:text-sm text-red-600 font-semibold">{brand.products.length} Products</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
