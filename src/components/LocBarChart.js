import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default class Example extends React.Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      data: []
    };
    this.state.usr.locations.map(loc => {
      this.state.data.push(this.SearchLocs(loc));
      return null;
    });
  }
  SearchLocs(loc) {
    let obj = { name: loc, value: 0 };
    this.state.usr.expenses.map(exp => {
      if (exp.location === loc) {
        obj.value += exp.amount;
      }
      return null;
    });
    return obj;
  }
  render() {
    return (
      <BarChart
        width={
          window.innerWidth > 500
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.95
        }
        height={400}
        data={this.state.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#ffc658" />
      </BarChart>
    );
  }
}
