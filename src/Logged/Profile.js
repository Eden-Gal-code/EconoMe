import React from "react";
import Jumbo from "../components/Jumbo";
import { Tabs, Tab, Container, Row, Col, Nav } from "react-bootstrap";
import YearlyChart from "../components/YearlyChart";
import MonthlyChart from "../components/MonthlyChart";
import { withRouter } from "react-router-dom";
import PieChartByField from "../components/PieChartByField";
import LocBarChart from "../components/LocBarChart";
import EditMonthly from "../components/EditMonthly";
import EditYearly from "../components/EditYearly";
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
            <h6> Work Place: {this.state.usr.workplace}</h6>
            <h6> Balance: {this.state.usr.balance}</h6>
            <h6> Income: {this.state.usr.income}</h6>
          </Jumbo>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">
                      Yearly Balance
                      <EditYearly />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      Monthly Balance
                      <EditMonthly />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">By Location</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="forth">By Category</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {" "}
                    <YearlyChart></YearlyChart>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <MonthlyChart></MonthlyChart>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    {" "}
                    <LocBarChart></LocBarChart>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    <PieChartByField></PieChartByField>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(Profile);
