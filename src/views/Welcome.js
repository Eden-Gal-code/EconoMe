import React from "react";
import Jumbo from "../components/Jumbo";
import { Card, Container, CardDeck } from "react-bootstrap";
import Style from "../StyledComponents/CenterStyle";
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
        <Style>
          <Container className="center">
            <CardDeck>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Tracking your Expenses</Card.Header>
                <Card.Body>
                  <Card.Title>Tracking by Catagories</Card.Title>
                  <Card.Text>
                    You can Decide the catagories you want to track!
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Analyzing your Expenses</Card.Header>
                <Card.Body>
                  <Card.Title>Analyzing by Factors</Card.Title>
                  <Card.Text>
                    Analyze Yearly Expenses Analyze Monthly Expenses
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Where you spend it</Card.Header>
                <Card.Body>
                  <Card.Title>Keep track where you spend</Card.Title>
                  <Card.Text>
                    Where do tou spend most of your money? At work? At Home?
                    Here you will be able to know exactly where!
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Container>
        </Style>
      </React.Fragment>
    );
  }
}
export default Welcome;
