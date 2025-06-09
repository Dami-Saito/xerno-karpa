import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../lib/Supabase.js";
import "../../styles/NavFoot.css"

const Latest = () => {

  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  
  useEffect(() => {
    const loadDeals = async () => {
      const { data, error } = await supabase
        .from('gbanjo')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching gbanjo deals:', error);
      } else {
        setDeals(data);
      }

      setLoading(false);
    };

    loadDeals();
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const handleClick = (dealID) => {
    navigate(`/gbanjopage?deal=${dealID}`)
  }

  return (
    <section className="px-4 py-6 w-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
    <div className="flex space-x-4 w-max py-2 sm:w-full sm:justify-evenly lg:w-full lg:justify-evenly overflow-x-auto snap-x snap-mandatory scrollbar-hide">
    {loading
        ? Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-full max-w-[140px] sm:w-max md:max-w-[155px] p-4 animate-pulse">
            <div className="w-full h-40 bg-gray-200 rounded-md mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full mb-1" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
        ))
        : deals.map((deal) => (
            <div 
            key={deal.id}
            onClick={()=> handleClick(deal.id)} 
            className="w-full max-w-[160px] sm:max-w-[190px] md:max-w-[175px] border-fuchsia-200/50 border-b-1 border-r-1 px-1 sm:px-1 snap-start scrollbar-hide cursor-pointer">
              <div className="w-full h-auto bg-gray-100 rounded-md overflow-hidden mb-3 relative">
                  {!imageLoaded[deal.id] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
                  <img
                  src={deal.gallery?.[0] || 'https://via.placeholder.com/300'}
                  alt={deal.title}
                  onLoad={() => handleImageLoad(deal.id)}
                  className={`w-full h-auto object-contain hover:scale-120 transition-all duration-500 ease-in-out ${
                      imageLoaded[deal.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  />
              </div>
              <h3 className="text-[17px] font-medium ">{deal.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{deal.description}</p>
              <p className="text-blue-600 font-semibold mt-2">₦{deal.price.toLocaleString()}</p>
            </div>
          ))}
    </div>
    </section>
  )
}

export default Latest