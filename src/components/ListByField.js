import React from "react";
import { ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
class ListByField extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <ListGroup>
            <ListGroup.Item variant="success">
              {this.props.field}
            </ListGroup.Item>
            {this.props.list.map(exp => {
              return (
                <ListGroup.Item>
                  {exp.caption}
                  <br />
                  Amount: {exp.amount} ₪
                  <br />
                  {exp.date}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Container>
      </React.Fragment>
    );
  }
}

export default ListByField;
