import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import backP from "../assets/BackPhoto.jpg";
const Style = styled.div`
  .jumbo {
    background: url(${backP}) no-repeat fixed bottom;
    background-size: cover;
    color: #ccc;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;
const Jumbo = props => {
  return (
    <Style>
      <Jumbotron fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <h2>{props.Head}</h2>
          <div>{props.children} </div>
        </Container>
      </Jumbotron>
    </Style>
  );
};
export default Jumbo;
