// import './SingleProduct.scss';
import SingleFeature from './A_SubComponents/SingleFeature';

const ProductSingleFeature = ({ product }) => (
  <div className="product-featured">
    <h2 className="title">{product[0]?.name}</h2>
    <div className="showcase-wrapper has-scrollbar">
      <div className="showcase-container">
        {
          product.map((object, i) => (
            <SingleFeature key={i} product={object} />))
        }
      </div>
    </div>
  </div>
);
export default ProductSingleFeature;
