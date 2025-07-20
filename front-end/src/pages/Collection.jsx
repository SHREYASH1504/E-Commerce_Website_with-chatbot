import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/Product_Item';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

 // In your Collection.jsx:
useEffect(() => {
  console.log("Collection received products:", products);
  console.log("Products count in Collection:", products.length);
  setFilterProducts(products);
}, [products]);

  const applyFilters = (categories, subCategories) => {
    let filtered = products;

    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    if (subCategories.length > 0) {
      filtered = filtered.filter((p) => subCategories.includes(p.subcategory)); 
    }
    

    setFilterProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((c) => c !== value);

    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, selectedSubCategories);
  };

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedSubCategories = checked
      ? [...selectedSubCategories, value]
      : selectedSubCategories.filter((c) => c !== value);

    setSelectedSubCategories(updatedSubCategories);
    applyFilters(selectedCategories, updatedSubCategories);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    let sortedProducts = [...filterProducts];

    if (value === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      setFilterProducts(products); // Reset to default order for "Relevant"
      return;
    }

    setFilterProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t px-4 py-4">
      {/* Filters Section */}
      <div className="sm:w-64">
        {/* Filters Toggle for Mobile */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 pl-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>

        {/* Filter Options (Hidden on Mobile unless opened) */}
        <div className={`flex flex-col gap-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Category Filter */}
          <div className="border border-gray-300 px-6 py-4 rounded-lg shadow-sm">
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Men"
                  onChange={handleCategoryChange}
                />{' '}
                Men
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Women"
                  onChange={handleCategoryChange}
                />{' '}
                Women
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Kids"
                  onChange={handleCategoryChange}
                />{' '}
                Kids
              </label>
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="border border-gray-300 px-6 py-4 rounded-lg shadow-sm mt-4">
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Topwear"
                  onChange={handleSubCategoryChange}
                />{' '}
                Topwear
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Bottomwear"
                  onChange={handleSubCategoryChange}
                />{' '}
                Bottomwear
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  value="Winterwear"
                  onChange={handleSubCategoryChange}
                />{' '}
                Winterwear
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Collections) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product Sort */}
          <select className="border-2 border-gray-300 text-sm px-2" onChange={handleSort}>
            <option value="relevant">Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;