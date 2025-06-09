
import "../styles/NavFoot.css"
import { useEffect, useState } from 'react';

const images = [
  "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/audio1.webp",
  "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/product1.webp",
  "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/product2.webp",
  "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/product3.webp",
  "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/freesound.webp",
];



const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-max sm:mx-15 p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">About <span className="text-fuchsia-500">Vipvendor.ng</span></h1>

      <div className="hero my-5 bg-gradient-to-tr from-fuchsia-300 to-neutral-400 via-pink-300 rounded-2xl ">
        {images.map((img, i) => (
          <aside
            className={`slide ${i === currentIndex ? 'active' : ''} reveal-${i + 1} `}
            key={i}
          >
            <img
              src={img}
              alt={`slide ${i + 1}`}
            />
          </aside>
        ))}
      </div>

      
      <p className="text-lg text-gray-700 mb-4">
        At <span className="text-fuchsia-500">Vipvendor.ng</span>, we are redefining the way Nigerians experience technology. As a leading platform for high-quality <strong>new and pre-owned devices</strong>, we offer an exceptional range of smartphones, laptops, accessories, and gadgets at competitive prices — all backed by reliable <strong>warranties</strong>.
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        Our commitment goes beyond just selling products; we are dedicated to offering <strong>seamless customer support</strong> and ensuring that each device purchased meets the highest standards of quality. Whether you&apos;re looking for the latest <strong>brand-new models</strong> or searching for affordable <strong>used devices</strong> with guaranteed reliability, we’ve got you covered.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        But that’s not all. At <span className="text-fuchsia-500">Vipvendor.ng</span>, we also provide <strong>repair services</strong>, <strong>consultancy</strong>, and <strong>after-sales support</strong>, making us your trusted partner throughout the lifecycle of your technology. Whether you need technical guidance or a quick fix, our team is always ready to help with expert solutions tailored to your needs.
      </p>

      <aside className='relative h-fit '>
        <img src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/vipoutside.webp" alt="image" className='border-b-1 border-fuchsia-500 w-full h-full lg:absolute lg:bottom-0 lg:right-0 xl:relative rounded-xl shadow-xl object-contain ' />
      </aside>
      
      <blockquote className="bg-gray-100 p-4 my-4 border-l-4 border-gray-400 italic text-gray-700">
        “We taking over the street soon ✅”
      </blockquote>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is clear: to be Nigeria’s <strong>#1 recommerce destination</strong>, giving you access to top-tier, guaranteed <strong>pre-owned gadgets</strong>, while offering the flexibility to <strong>trade in</strong> or <strong>swap out</strong> older models for value. We&apos;re here to empower your tech journey, offering <strong>affordable, sustainable, and reliable devices</strong> with a focus on customer satisfaction.
      </p>

      <p className="text-lg text-gray-700">
        We’re more than just a store — we’re your <strong>go-to tech partner</strong>.
      </p>
    </div>
  );
};

export default About;
