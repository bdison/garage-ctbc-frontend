import React, { Component } from "react";

export class ChartLegend extends Component {
  render() {
    const { dataSets } = this.props;

    const legendWrapper = {
      userSelect: "none",
      color: "#666666",
      display: "inline-block",
      fontWeight: 800,
      fontSize: "11px",
      padding: "0.5rem",
      border: "0.5px solid #E6E9F1",
      borderRadius: "3px",
      textAlign: "right",
      marginBottom: "5px"
    };

    return (
      <div style={legendWrapper}>
        {
          dataSets.map((item) => {
            return (
              <div key={"legend" + item["label"]} style={{ display: "flex", margin: "0.25rem 0" }} >
                {
                  item.LegendBackgroundColors.map((value, index) =>
                    <div key={index} style={{ height: "15px", width: "15px", backgroundColor: item.LegendBackgroundColors[index], border: item.LegendBorders[index], marginRight: "5px" }}></div>
                  )
                }
                <div style={{ height: "15px", lineHeight: "15px" }}>{item["label"]}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default ChartLegend;