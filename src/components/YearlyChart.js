import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

class YearlyChart extends React.Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      data: []
    };
    this.state.usr.yearly.map(data => {
      this.state.data.push({
        name: data.year,
        balance: data.Ybalance
      });
      return null;
    });
    this.state.data.push({
      name: new Date().getFullYear(),
      balance: this.state.usr.balance
    });
  }

  render() {
    return (
      <LineChart
        width={450}
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

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    );
  }
}

export default YearlyChart;
