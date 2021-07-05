import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import SegmentBar from "./segmentBar";
import ChartLegend from "./chartLegend";
import { currencySymbolGenerator, zeroToKMGConverter, thousandsSeparator } from "../../utility/common";

class RevenueBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // Data Source
        const region = "NABU";
        const { RevenueCustomerData } = this.props;
        const revenueData = RevenueCustomerData.RunChartDataSet;
        const segmentData = RevenueCustomerData.PercentageRateDiff;

        // Revenue Chart
        const state = {
            labels: ["January", "February", "March",
                     "April", "May"],
            datasets: [
              {
                label: "TotalRevenue",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
              }
            ]
        };
        const revenueSeatsAllData = {
            labels: revenueData.TimeLabel,
            datasets: [
                {
                    label: "Reseller Revenue",
                    yAxisID: "y-axis-1",
                    type: "bar",
                    data: revenueData.ResellerRevenue,
                    backgroundColor: "rgba(120, 131, 229, 0.35)",
                    borderColor: "rgba(120, 131, 229, 0.35)",
                    LegendBackgroundColors: ["rgba(120, 131, 229, 0.35)"],
                    LegendBorders: ["0 solid rgba(120, 131, 229, 0.35)"],
                    stack: "stack1"
                },
                {
                    label: "MSP Revenue",
                    yAxisID: "y-axis-1",
                    type: "bar",
                    data: revenueData.MSPRevenue,
                    backgroundColor: "rgba(10, 191, 161, 0.35)",
                    borderColor: "rgba(10, 191, 161, 0.35)",
                    LegendBackgroundColors: ["rgba(10, 191, 161, 0.35)"],
                    LegendBorders: ["0 solid rgba(10, 191, 161, 0.35)"],
                    stack: "stack1"
                },
                {
                    label: "Reseller Customer",
                    yAxisID: "y-axis-2",
                    type: "line",
                    data: revenueData.ResellerCustomer,
                    backgroundColor: "rgba(120, 131, 229, 1)",
                    borderColor: "rgba(120, 131, 229, 1)",
                    LegendBackgroundColors: ["rgba(120, 131, 229, 1)"],
                    LegendBorders: ["0px solid rgba(120, 131, 229, 1)"],
                    fill: false,
                },
                {
                    label: "MSP Customer",
                    yAxisID: "y-axis-2",
                    type: "line",
                    data: revenueData.MSPCustomer,
                    borderColor: "rgba(10, 191, 161, 1)",
                    backgroundColor: "rgba(10, 191, 161, 1)",
                    LegendBackgroundColors: ["rgba(10, 191, 161, 1)"],
                    LegendBorders: ["0px solid rgba(10, 191, 161, 1)"],
                    fill: false
                }
            ]
        };
        const allOptions = {
            title: {
                display: false,
                text: "Monthly Revenue and Seat Run Chart"
            },
            tooltips: {
                intersect: true,
                mode: "x",
                callbacks: {
                    label: function (tooltipItem, data) {
                        let tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        if (!tooltipValue && tooltipValue !== 0) return;
                        if (data.datasets[tooltipItem.datasetIndex].label.includes("Revenue")) {
                            return `${data.datasets[tooltipItem.datasetIndex].label}: ${currencySymbolGenerator(region)} ${thousandsSeparator(tooltipValue)}`;
                        }
                        return `${data.datasets[tooltipItem.datasetIndex].label}: ${thousandsSeparator(tooltipValue)}`;
                    },
                },
            },
            legend: {
                display: true,
                labels: {
                    usePointStyle: true
                }
            },
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [
                    {
                        id: "y-axis-1",
                        position: "left",
                        stacked: true,
                        type: "linear",
                        gridLines: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value) {
                                return currencySymbolGenerator(region) + zeroToKMGConverter(value);
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Revenue"
                        }
                    }, {
                        id: "y-axis-2",
                        position: "right",
                        stacked: false,
                        type: "linear",
                        gridLines: {
                            drawOnChartArea: false
                        },
                        ticks: { beginAtZero: true },
                        scaleLabel: {
                            display: true,
                            labelString: "Customer"
                        }
                    }
                ]
            }
        };


        // Segmentment Chart
        const revenueRate = [
            ["Reseller", parseFloat(segmentData.ResellerRevenuePercentage * 100).toFixed(2), 100, "Reseller"],
            ["MSP", parseFloat(segmentData.MSPRevenuePercentage * 100).toFixed(2), 100, "MSP"]
        ];
        const customerRate = [
            ["Reseller", parseFloat(segmentData.ResellerCustomerPercentage * 100).toFixed(2), 100, "Reseller"],
            ["MSP", parseFloat(segmentData.MSPCustomerPercentage * 100).toFixed(2), 100, "MSP"]
        ];

        return (
            <Card className="mb-1">
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0"> Revenue and Customer</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <SegmentBar segmentFiled={"Revenue"} dataSource={revenueRate} popup={false} />
                        </Col>
                        <Col>
                            <SegmentBar segmentFiled={"Customer"} dataSource={customerRate} popup={false} />
                        </Col>
                    </Row>
                    <div className="u-chart-scroll">
                        <div className="u-chart-wrapper">
                            <Row>
                                <Col>
                                    <h5>Overview</h5>
                                </Col>
                                <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                                    <ChartLegend dataSets={revenueSeatsAllData["datasets"]} />
                                </Col>
                            </Row>
                            <div className="u-revenueseats-bar-chart-canvas-wrapper">
                                <Bar data={revenueSeatsAllData} options={allOptions} />
                            </div>
                            <div className="u-revenueseats-bar-chart-canvas-wrapper">
                                <Line
                                    data={state}
                                    options={{
                                        title:{
                                        display:true,
                                        text:"Average Rainfall per month",
                                        fontSize:20
                                        },
                                        legend:{
                                        display:true,
                                        position:"right"
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        RevenueCustomerData: state.dashboard.uccDashboard.RevenueCustomerData
    };
};

export default connect(mapStateToProps, null)(RevenueBoard);