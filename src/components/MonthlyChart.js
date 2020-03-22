import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

class MonthlyChart extends React.Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      data: []
    };
    this.state.usr.monthly.map(data => {
      this.state.data.push({
        name: data.month,
        balance: data.Mbalance
      });
      return null;
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
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="" /> */}
      </LineChart>
    );
  }
}

export default MonthlyChart;
