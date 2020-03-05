import React from "react";
import Jumbo from "../components/Jumbo";
import { Tabs, Tab, Container } from "react-bootstrap";
import YearlyChart from "../components/YearlyChart";
import MonthlyChart from "../components/MonthlyChart";
import { withRouter } from "react-router-dom";
import PieChartByField from "../components/PieChartByField";
import LocBarChart from "../components/LocBarChart";
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      islogged: true
    };
    if (sessionStorage.getItem("user") === null) {
      this.props.history.push("/views/Login");
      this.state.islogged = false;
    }
  }

  render() {
    if (this.state.islogged) {
      return (
        <React.Fragment>
          <Jumbo
            Head={this.state.usr.firstName + " " + this.state.usr.lastName}
          >
            <h6> Workplace: {this.state.usr.workPlace}</h6>
            <h6> Balance: {this.state.usr.balance}</h6>
            <h6> Income: {this.state.usr.income}</h6>
          </Jumbo>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="yearly" title="Yearly Balance">
              <Container className="d-flex justify-content-center">
                <YearlyChart></YearlyChart>
              </Container>
            </Tab>
            <Tab eventKey="monthly" title="Monthly Balance">
              <Container className="d-flex justify-content-center">
                <MonthlyChart></MonthlyChart>
              </Container>
            </Tab>
            <Tab eventKey="loc" title="By Location">
              <Container className="d-flex justify-content-center">
                <br />
                <LocBarChart></LocBarChart>
              </Container>
            </Tab>
            <Tab eventKey="field" title="By Field">
              <Container className="d-flex justify-content-center">
                <PieChartByField></PieChartByField>
              </Container>
            </Tab>
          </Tabs>
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(Profile);
