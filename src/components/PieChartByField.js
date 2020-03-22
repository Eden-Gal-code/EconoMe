import React from "react";
import { PieChart, Pie, Sector } from "recharts";

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value}₪`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class PieChartByField extends React.Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/hqnrgxpj/";
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      usr: JSON.parse(sessionStorage.getItem("user")),
      data: []
    };
    this.state.usr.fields.map(field => {
      this.state.data.push(this.SearchField(field));
      return null;
    });
  }
  SearchField(field) {
    let obj = { name: field, value: 0 };
    this.state.usr.expenses.map(exp => {
      if (exp.field === field) {
        obj.value += exp.amount;
      }
      return null;
    });
    return obj;
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    return (
      <PieChart
        width={
          window.innerWidth > 500
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.95
        }
        height={400}
      >
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.state.data}
          innerRadius={70}
          outerRadius={100}
          fill="#0088FE"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
          className="d-flex justify-content-center"
        />
      </PieChart>
    );
  }
}
export default PieChartByField;
