import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Breadcrumbs = ({ product }) => {
  if (!product) return null;

  const { category, type, name } = product;

  return (
    <div className="text-[16px] capitalize">
      <Link to="/">
        <FaHome size={20} className="fill-fuchsia-700 inline" />
      </Link>
      <span className="text-fuchsia-700 pl-1">/ <Link to="/shop">shop</Link></span>
      {category && (
        <span className="text-fuchsia-700 pl-1">/ <Link to={`/shop?category=${category}`}>{category}</Link></span>
      )}
      {type && (
        <span className="text-fuchsia-700 pl-1">/ <Link to={`/shop?type=${type}`}>{type}</Link></span>
      )}
      {name && (
        <span className="ml-1 text-fuchsia-700">/ {name}</span>
      )}
    </div>
  );
};

export default Breadcrumbs;
