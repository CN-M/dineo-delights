import testimonialOne from '../assets/images/testimonial-1.jpg';
import quotes from '../assets/images/icons/quotes.svg';

const Testimonial = () => (
  <div className="testimonial">

    <h2 className="title">testimonial</h2>

    <div className="testimonial-card">

      <img src={testimonialOne} alt="alan doe" className="testimonial-banner" width="80" height="80" />

      <p className="testimonial-name">BridgeT Mohale</p>

      <p className="testimonial-title">CEO & Founder Bridget&apos;s Delights</p>

      <img src={quotes} alt="quotation" className="quotation-img" width="26" />

      <p className="testimonial-desc">
        Lorem ipsum dolor sit amet consectetur Lorem ipsum
        dolor dolor sit amet.
      </p>

    </div>

  </div>
);

export default Testimonial;
