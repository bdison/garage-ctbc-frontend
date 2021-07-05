import React from "react";
import { connect } from "react-redux";
import { Progress, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

class SegmentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      SegmentGroup: "",
      SegmentDetailType: "",
      SegmentDetailHeader: "",
      segmentDetailData: {
        ThisYearTotal: 0,
        LastYearTotal: 0,
        ThisYearOrder: 0,
        LastYearOrder: 0,
        LastYearChart: [0, 0, 0, 0],
        ThisYearChart: [0, 0, 0, 0]
      },
      thisyearBgc: "",
      lastyearBgc: "",
      chartTitle: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  actions = {
    segmentGroupGenerator: (group) => {
      switch (group) {
        case "Revenue Distribution":
          this.setState({
            SegmentGroup: "Revenue Distribution",
          });
          break;
        case "Seat in Use Distribution":
          this.setState({
            SegmentGroup: "Seat in Use Distribution",
          });
          break;
        default:
          this.setState({
            SegmentGroup: "Number of Customers",
          });
          break;
      }
    },
    segmentGenerator: (seg) => {
      if (seg !== undefined) {
        const { segmentDetailHeaderSelector, colorSelector, lightColorSelector } = this.actions;
        this.setState({
          SegmentDetailType: seg,
          SegmentDetailHeader: segmentDetailHeaderSelector(seg),
          thisyearBgc: colorSelector(seg),
          lastyearBgc: lightColorSelector(seg),
        });
      }
    },
    segmentDetailDataGenerator: (seg, detail) => {
      if (detail !== undefined) {
        this.setState(
          prevState => ({
            ...prevState,
            segmentDetailData: detail
          })
        );
      }
    },
    chartTitleGenerator: (title) => {
      this.setState(
        prevState => ({
          ...prevState,
          chartTitle: title
        }));
    },
    handleSegmentDetails: (seg, percentage, detail, group, title) => {
      if (percentage > 0) {
        this.toggle();
        this.actions.segmentGroupGenerator(group);
        this.actions.segmentGenerator(seg);
        this.actions.segmentDetailDataGenerator(seg, detail);
        this.actions.chartTitleGenerator(title);
      }
    },
    segmentDetailHeaderSelector: (seg) => {
      let headerWording;
      switch (seg) {
        case "25":
          headerWording = "(0~24)";
          break;
        case "50":
          headerWording = "(25~49)";
          break;
        case "100":
          headerWording = "(50~99)";
          break;
        case "250":
          headerWording = "(100~249)";
          break;
        case "250up":
          headerWording = "(250 up)";
          break;
        default:
          headerWording = seg;
          break;
      }
      return headerWording;
    },
    colorSelector: (key) => {
      switch (key) {
        case "SB":
        case "25":
        case "BelowTwentyFive":
          return "#0096cc";

        case "50":
        case "BelowFifty":
          return "#FACA2A";

        case "MB":
        case "100":
        case "BelowHundred":
          return "#09DAB7";

        case "HC":
        case "250":
          return "#7883E5";

        case "ENT":
        case "250up":
        case "TwoHundredFiftyUp":
          return "#2a556e";

        case "Reseller":
          return "#7883e5";

        case "MSP":
          return "#06846F";

        default:
          return "#777777";
      }
    },
    lightColorSelector: (key) => {
      switch (key) {
        case "Reseller":
          return "#0382b0";

        case "MSP":
          return "#088e78";

        default:
          return "#e9ecef";
      }
    }
  }

  render() {
    const { segmentFiled, dataSource, chartTitle, PartnerType } = this.props;

    return (
      <Row>
        <Col>
          <h5>{segmentFiled}</h5>
          <Progress multi>
            {
              // item[0] = "key"
              // item[1] = "percentage"
              // item[2] = "total count"
              // item[3] = "tooltip description"
              // item[4] = "popup detail value"
              dataSource.map((item) => (
                <Progress key={item} bar value={item[1]} max={item[2]}>
                  <div
                    onClick={() => { this.actions.handleSegmentDetails(item[0], item[1], item[4], segmentFiled, chartTitle, PartnerType); }}
                    style={{ backgroundColor: this.actions.colorSelector(item[0]), height: "100%" }}
                  >
                    {
                      Number(item[1]) > 0 ?
                        item[1] + "%"
                        :
                        null
                    }
                  </div>
                </Progress>
              ))
            }
          </Progress>
          {
            dataSource.map((item) => (
              <div key={item} className="float-left mb-2 mr-2">
                <span
                  data-tip={item[3] + ": " + item[1] + "%"}
                  data-for={item[0] + "Tip"}
                  className="text-navy" style={{ fontSize: "10px" }}
                >
                  <FontAwesomeIcon icon={faCircle} className="mr-1" style={{ color: this.actions.colorSelector(item[0]) }} />
                  {item[0]}
                </span>
                <ReactTooltip id={item[0] + "Tip"} />
              </div>
            ))
          }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PartnerType: state.partnerdetail.profileData.PartnerType
  };
};
export default connect(mapStateToProps, null)(SegmentBar);
