import ProductShowcase from './A_SubComponents/ProductShowcase';

const ProductMinimal = ({ productData }) => {
  const data = productData.length;
  const first = 4;

  return (
    <div className="product-minimal">
      <div className="product-showcase">
        <h2 className="title">New Arrivals</h2>
        <div className="showcase-wrapper has-scrollbar">
          <div className="showcase-container">

            {
            // productData.slice(0, 4)?.map((object, i) => (
            productData.slice(0, first)?.map((object, i) => (
              <ProductShowcase key={i} product={object} />))
            }

          </div>
          <div className="showcase-container">

            {
            // productData.slice(4, 8)?.map((object, i) => (
            productData.slice(4, first * 2)?.map((object, i) => (
              <ProductShowcase key={i} product={object} />))
            }

          </div>
        </div>
      </div>
      <div className="product-showcase">
        <h2 className="title">Trending</h2>
        <div className="showcase-wrapper  has-scrollbar">
          <div className="showcase-container">

            {
            // productData.slice(8, 12)?.map((object, i) => (
            productData.slice(8, first * 3)?.map((object, i) => (
              <ProductShowcase key={i} product={object} />))
            }

          </div>
          <div className="showcase-container">

            {
            // productData.slice(12, 16)?.map((object, i) => (
            productData.slice(12, first * 4)?.map((object, i) => (
              <ProductShowcase key={i} product={object} />))
            }

          </div>
        </div>
      </div>
      <div className="product-showcase">
        <h2 className="title">Top Rated</h2>
        <div className="showcase-wrapper  has-scrollbar">
          <div className="showcase-container">

            {
            // productData.slice(16, 20)?.map((object, i) => (
            productData.slice(16, first * 5)?.map((object, i) => (
              <ProductShowcase key={i} product={object} />))
            }

          </div>
          <div className="showcase-container">

            {
              // productData.slice(16, 24)?.map((object, i) => (
              productData.slice(20, first * 6)?.map((object, i) => (
                <ProductShowcase key={i} product={object} />))
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMinimal;
