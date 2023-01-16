import { urlFor } from '../../lib/Client';

const SliderItem = ({
  item: {
    imgSrc, bannerTitle, bannerSubitle, bannerText,
  },
}) => {
  const alt = bannerTitle.toLowerCase();
  return (
    <div className="slider-item">
      <img src={urlFor(imgSrc).url()} alt={alt} className="banner-img" />
      <div className="banner-content">
        <p className="banner-subtitle">{bannerSubitle}</p>
        <h2 className="banner-title">{bannerTitle}</h2>
        <p className="banner-text">
          starting at R <b>{bannerText}</b>.00
        </p>
        <a href="#product-main" className="banner-btn">Shop now</a>
      </div>
    </div>
  );
};

export default SliderItem;
