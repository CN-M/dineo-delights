/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import CategoryItem from './A_SubComponents/CategoryItem';
import { client, urlFor } from '../lib/Client';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const QUERY = '*[_type == "category"]';
      const response = await client.fetch(QUERY);
      setCategoryData(response);
    };

    getData();
  }, []);
  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {
          categoryData?.map((object, i) => (
            <CategoryItem key={i} category={object} />
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Category;
