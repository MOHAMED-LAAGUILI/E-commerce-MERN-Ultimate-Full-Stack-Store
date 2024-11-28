import { useEffect, useState } from "react";

import slide0 from "../assets/images/home/slide1.jpg"
import slide1 from "../assets/images/home/slide.jpg"
import slide2 from "../assets/images/home/slide2.jpg"
import slide3 from "../assets/images/home/slide3.jpg"

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '99.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    name: 'Smartwatch',
    price: '149.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    price: '49.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 4,
    name: 'Portable Speaker',
    price: '79.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 5,
    name: 'Portable Speaker',
    price: '79.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 6,
    name: 'Portable Speaker',
    price: '79.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 7,
    name: 'Portable Speaker',
    price: '79.99',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 8,
    name: 'Portable Speaker',
    price: '79.99',
    image: 'https://via.placeholder.com/200',
  },
  // Add more products as needed
];

const slides = [
  {
    image: slide0, // Replace with actual image URL
    heading: "Welcome to Our Store",
    subheading: "Find the best deals on your favorite gadgets!"
  },
  {
    image: slide1, // Replace with actual image URL
    heading: "Latest Tech at Unbeatable Prices",
    subheading: "Discover the hottest gadgets on the market."
  },
  {
    image: slide2, // Replace with actual image URL
    heading: "Shop Our Exclusive Offers",
    subheading: "Get amazing discounts on your favorite products!"
  },
  {
    image: slide3, // Replace with actual image URL
    heading: "Get amazing discounts",
    subheading: "Get amazing discounts on your favorite products!"
  }
];


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  
  return (
    <div className="bg-slate-100 ">
      {/* Hero Section */}
      <header
  className="relative bg-cover bg-center text-center py-56 rounded-lg shadow-md transition-all"
  style={{
    backgroundImage: `url(${slides[currentSlide].image})`,
  }}
>
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

  {/* Content Wrapper */}
  <div className="relative z-10 backdrop-blur-lg bg-white bg-opacity-10 rounded-lg shadow-xl mx-auto max-w-2xl p-8">
    <h1 className="text-5xl font-extrabold text-white">{slides[currentSlide].heading}</h1>
    <p className="mt-4 text-xl text-gray-100">{slides[currentSlide].subheading}</p>
  </div>
</header>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                <p className="text-gray-600 mt-2">{p.price} $</p>
                <button className="mt-4 w-full bg-primary-200 text-white py-2 rounded hover:bg-primary-100 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
