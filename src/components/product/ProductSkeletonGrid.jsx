import React from 'react';
import ProductLoader from './ProductLoader.jsx';

const ProductSkeletonGrid = ({ count = 12 }) => {
  return (
    <div className="flex flex-wrap gap-7 justify-center items-start w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ProductLoader key={i} />
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;
