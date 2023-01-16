import ctaBanner from '../assets/images/cta-banner.jpg';

const CTA = () => (
  <div className="cta-container">
    <img src={ctaBanner} alt="summer collection" className="cta-banner" />
    <a href="/" className="cta-content">
      <p className="discount">Our Best Selection Yet!</p>
      <h2 className="cta-title">Summer collection</h2>
      <p className="cta-text">Starting @ R110</p>
      <button className="cta-btn">Shop now</button>
    </a>
  </div>
);

export default CTA;
