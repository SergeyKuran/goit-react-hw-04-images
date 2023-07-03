import { ThreeCircles } from 'react-loader-spinner';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <ThreeCircles
      height="100"
      position="relative"
      top="50%"
      left="50%"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#8e0000"
      innerCircleColor="#00ff00"
      middleCircleColor="#0000ff"
    />
  );
};

export default Loader;
