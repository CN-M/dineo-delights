/* eslint-disable no-plusplus */
import MainProduct from './A_SubComponents/MainProduct';

const ProductGrid = ({ heading, productData }) => (
  <div className="product-main" id="product-main">
    <h2 className="title">{heading}</h2>
    <div className="product-grid">
      {
        productData?.map((object, i) => (
          <MainProduct key={i} product={object} />
        ))
      }
    </div>
  </div>
);
export default ProductGrid;
