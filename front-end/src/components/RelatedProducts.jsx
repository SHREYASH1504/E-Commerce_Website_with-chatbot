import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Product_Item from './Product_Item';
import Title from './Title';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = [...products]; // Clone array

            // Filter by category and subCategory
            productsCopy = productsCopy.filter((item) => item.category === category);
            
            // Check if subCategory exists before filtering
            if (subCategory) {
                productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);
            }

            setRelated(productsCopy.slice(0, 5)); // Select first 5 products
        }
    }, [products, category, subCategory]); // Fixed dependency array

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                {related.map((item, index) => (
                    <Product_Item 
                        key={item._id || index} 
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        image={item.image} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts;