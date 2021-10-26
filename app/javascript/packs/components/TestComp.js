import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class TestComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: "Heyy my first chart",
          align: "center",
        },
        chart: {
          type: "rangeBar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          type: "datetime",
        },
      },
      series: [
        {
          data: [
            {
              x: "Code",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-04").getTime(),
              ],
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-04").getTime(),
                new Date("2019-03-08").getTime(),
              ],
            },
            {
              x: "Validation",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-12").getTime(),
              ],
            },
            {
              x: "Deployment",
              y: [
                new Date("2019-03-12").getTime(),
                new Date("2019-03-18").getTime(),
              ],
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="rangeBar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}
