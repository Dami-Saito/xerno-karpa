import * as ReactRouterDom from 'react-router-dom';
const { Link, useNavigate } = ReactRouterDom;

const categories = [
  {
    name: "smartphones",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/smartphone.webp"
  },
  {
    name: "gaming",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/gaming.webp"
  },
  {
    name: "sound",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/headsets.webp"
  },
  {
    name: "accessories",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/watches.webp"
  },
  {
    name: "laptop",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/laptop.webp"
  },
  {
    name: "gadgets",
    image: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/category/gadgets.webp"
  },
]

const Category = () => {

  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/shop?category=${category}`)
  } 

  return (
  <section className="w-full">
    <aside className="text-start sm:text-center">
      <h1 className="text-xl sm:text-2xl font-spartan font-semibold">
        Popular Categories
      </h1>
      <div className="flex flex-col sm:flex-row justify-start sm:justify-center pb-3">
        <p className=" text-gray-400 sm:text-xl text-start sm:text-center">
          Explore our growing range of categories
        </p>
      </div>
    </aside>

    {/* Scrolling container */}
    <section
      className="flex overflow-x-auto sm:justify-start lg:justify-center w-full gap-2 scrollbar-hide ">
        {categories.map (({name, image}) => (
          <div 
          className="flex-shrink-0 w-36 h-36 bg-gray-200 flex flex-col justify-center items-center"
          key={name}
          onClick={() => handleClick(name)}
          >
            <img
            src={image}
            alt={name}
            className="rounded-full object-contain h-14 hover:scale-130 transition-all duration-300 ease-in-out"
            />
            <p className="capitalize font-semibold">{name}</p>
          </div>
        ))}
    
    </section>

    <div className='mt-4 flex justify-center items-center'>
      <Link to="/shop">
        <button className="group relative inline-flex h-10 items-center justify-center rounded-md bg-neutral-200 px-6 font-medium text-neutral-900"><span>All Categories</span><div className="relative ml-1 h-4 w-4 overflow-hidden"><div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></div></button>
      </Link>
    </div>
  </section>
  );
};

export default Category