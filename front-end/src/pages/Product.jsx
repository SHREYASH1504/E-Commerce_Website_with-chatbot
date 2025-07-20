import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    console.log("Product ID from URL:", productId); // Debugging

    if (!productId) {
      console.error("Invalid product ID, redirecting...");
      navigate('/'); 
      return;
    }

    // Ensure proper comparison by converting IDs to the same type
    const product = products.find((item) => String(item._id) === String(productId));
    
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image); // Ensure image array handling
    } else {
      console.error("Product not found, redirecting...");
      navigate('/');
    }
  }, [productId, products, navigate]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image && Array.isArray(productData.image) ? (
              productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt={`Product ${index + 1}`}
                  onClick={() => setImage(item)}
                />
              ))
            ) : (
              <img src={productData.image} className='w-[24%] sm:w-full sm:mb-3' alt="Product" />
            )}
          </div>
          <div className='flex-1'>
            <img src={image} className='w-full' alt="Main Product" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, index) => (
              <img key={index} src={assets.star_icon} alt="Star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="Dull Star" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          
          {productData.sizes && productData.sizes.length > 0 && (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button 
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original Product</p>
            <p>💰 Cash on Delivery Available</p>
            <p>🔄 Easy Returns & Exchange within 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col border px-6 py-6 text-sm text-gray-500'>
          <p>
            Experience the perfect blend of style, functionality, and durability with our latest product. Crafted with high-quality materials and designed for everyday use, this product offers unmatched comfort and convenience.
          </p>
          <div className='leading-relaxed'>
            <b>Key Features:</b>
            <br /> ✅ Premium-quality materials for long-lasting use
            <br /> ✅ Stylish and modern design
            <br /> ✅ Lightweight and portable
            <br /> ✅ User-friendly functionality
          </div>
          <hr className="my-2" />
          <p>Upgrade your lifestyle with this must-have product today! 🚀</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subcategory} />
    </div>
  );
};

export default Product;