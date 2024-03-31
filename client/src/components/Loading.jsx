import { Triangle } from 'react-loader-spinner';

const Loading = () => (
  <div className="loader">

    <Triangle
      height="80"
      width="80"
      color="hsl(353, 100%, 78%)"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible
    />
  </div>
);

export default Loading;
