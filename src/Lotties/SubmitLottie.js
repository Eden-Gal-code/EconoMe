// UncontrolledLottie.jsx
import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Submit.json";

class UncontrolledLottie extends Component {
  state = { isStopped: !this.props.pressed };
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: false,
      animationData: animationData
    };

    return (
      <Lottie
        options={defaultOptions}
        height={190}
        width={300}
        isPaused={this.state.isStopped}
      />
    );
  }
}

export default UncontrolledLottie;
