import { useEffect, useState } from 'react';
import { client } from '../lib/Client';

import SliderItem from './A_SubComponents/SliderItem';

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const QUERY = '*[_type == "banner"]';

    const getData = async () => {
      const response = await client.fetch(QUERY);
      setBannerData(response);
    };

    getData();
  }, []);

  return (
    <div className="banner">
      <div className="container">
        <div className="slider-container has-scrollbar">
          {
          bannerData?.map((object, i) => (
            <SliderItem key={i} item={object} />
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Banner;
