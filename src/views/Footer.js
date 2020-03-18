import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import { SocialIcon } from "react-social-icons";
const FooterPage = () => {
  return (
    <MDBFooter className="font-small py-3 ">
      <MDBContainer className="text-center">
        <SocialIcon url="https://github.com/Eden-Gal-code" />
        <SocialIcon url="https://www.linkedin.com/in/edengal/" />
      </MDBContainer>
      <div className="footer-copyright text-center ">
        <MDBContainer fluid>Created By Eden Gal</MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
