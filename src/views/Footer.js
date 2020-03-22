import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import Github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

const FooterPage = () => {
  return (
    <MDBFooter className="font-small py-3 ">
      <MDBContainer>
        <a href="https://github.com/Eden-Gal-code">
          <img alt="" src={Github} width={40} height={40}></img>
        </a>
        <a href="https://www.linkedin.com/in/edengal/">
          <img alt="" src={linkedin} width={42} height={42}></img>
        </a>
      </MDBContainer>
      <div className="footer-copyright text-center ">
        <MDBContainer fluid>Created By Eden Gal</MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
