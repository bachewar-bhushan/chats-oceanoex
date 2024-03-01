import React from "react";
import { BallTriangle, ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <ColorRing
  visible={true}
  height="40"
  width="40"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#2b5d9a','#2b5d9a','#2b5d9a','#2b5d9a','#2b5d9a','#2b5d9a']}
  />
    </>
  );
};

export default Loading;
