import { useEffect, useState } from 'react';

import { client } from '../lib/Client';
import Featured from './A_SubComponents/Featured';

const ProductFeatured = () => {
  const [dealData, setDealData] = useState([]);

  useEffect(() => {
    const QUERY = `*[_type == "dealOfTheWeek"] {
      ...,
      deal->
    }`;

    const getData = async () => {
      const response = await client.fetch(QUERY);
      setDealData(response);
    };

    getData();
  }, []);
  return (
    <div className="product-featured">
      <h2 className="title">Deal of the Week</h2>
      <div className="showcase-wrapper has-scrollbar">
        {
          dealData?.map((object, i) => (
            <div key={i} className="showcase-container">
              <Featured key={i} product={object} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductFeatured;
