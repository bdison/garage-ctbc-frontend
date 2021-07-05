import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import _ from "lodash";
import { Container, Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import ListTableDetail from "./listTableDetail";
import { paneDataConverter } from "../../utility/common";
import "./topicList.css";
import * as Setup from "../../utility/common";
import { initTopicListData, getTopicListData, mockTopicListData } from "../../redux/actions/topicListActions";

// eslint-disable-next-line no-unused-vars
const generateTopicListFQDN = (indexKey) => {
  return Setup.connectSteam("getucccustomerlist/"+indexKey+"?start=0&end=-1");
};

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexKey: null,
      title: null,
      columnType: null,
      count:{
        customer:0,
        opportunity:0
      }
    };
  }
  componentDidMount() {
    const listKey = window.location.hash.replace("#/List/", "");
    const listInfoData = paneDataConverter(listKey);
    this.setState({ indexKey: listKey, title: listInfoData["title"], columnType: listInfoData["columnType"] });

    // Get Topic List Data
    const { cookies  } = this.props;
    const GET_TOPIC_LIST_FQDN = generateTopicListFQDN(listKey);
    this.props.getTopicListData(GET_TOPIC_LIST_FQDN, cookies, window.location.hash);
    // this.props.mockTopicListData(listInfoData["columnType"]);
  }
  componentDidUpdate(prevProps){
    const { topicListLoading, topicList } = this.props;
    if(!topicListLoading && topicListLoading !== prevProps.topicListLoading){
      this.setState(prevState=>({
        ...prevState,
        count:{
          customer:_.uniq(_.map(topicList,"CustomerId")).length,
          opportunity:topicList.length
        }
      }));
    }
  }
  componentWillUnmount(){
    this.props.initTopicListData();
  }
  render() {
    const { title, columnType, count } = this.state;
    return (
      <Container fluid className="p-0" name="topic-list">
        <Row>
          <Col className=" pb-3 d-flex justify-content-end">
            <div className="custonerlist-button d-flex pl-2 pr-2 justify-content-center align-items-center">
              <div className="button-icon"><div className="custonerlist-button-icon"></div></div>
              <div className="pl-2 button-font"><h4>Customer List</h4></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="m-0">
              <CardHeader>
                <CardTitle className="topic-list-title font-interstate">
                  {title}
                </CardTitle>
                <b className="topic-list-subtitle font-interstate">
                {count.customer} {count.customer > 1 ? "Customers" : "Customer"} , {count.opportunity} {count.opportunity > 1 ? "Opportunities" : "Opportunity"}
              </b>
              </CardHeader>
              <CardBody className="topic-list-holder" >
                <ListTableDetail columnType={columnType} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topicList: state.topiclist.topicList,
    topicListLoading: state.topiclist.topicListLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mockTopicListData: (type)=> dispatch(mockTopicListData(type)),
    initTopicListData: () => dispatch(initTopicListData()),
    getTopicListData: (apiDomain, cookieProps, pathName) => dispatch(getTopicListData(apiDomain, cookieProps, pathName)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TopicList));
