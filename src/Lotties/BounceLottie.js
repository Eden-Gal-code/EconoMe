// UncontrolledLottie.jsx
import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Bounce.json";

class UncontrolledLottie extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };

    return <Lottie options={defaultOptions} height={190} width={700} />;
  }
}

export default UncontrolledLottie;
