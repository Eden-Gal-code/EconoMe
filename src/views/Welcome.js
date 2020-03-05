import React from "react";
import Jumbo from "../components/Jumbo";
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    if (sessionStorage.getItem("user") !== null) {
      sessionStorage.removeItem("user");
    }
  }
  render() {
    return (
      <React.Fragment>
        <Jumbo Head="Welcom">Track All Your Expenses!!</Jumbo>
      </React.Fragment>
    );
  }
}
export default Welcome;
