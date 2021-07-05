import React from "react";
import { connect } from "react-redux";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { ListHeaderFormatter, customTotalFormatter } from "../../components/Common";

const commonColumns = [
  {
    dataField: "CustomerId",
    text: "Customer ID",
    csvExport: false,
    hidden: true
  },
  {
    dataField: "CustomerName",
    text: "Company Name",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "SerialId",
    text: "Serial ID",
    csvExport: false,
    hidden: true
  }
];

const traditionalColumns = [
  {
    dataField: "CustomerCSN",
    text: "CSN",
    csvExport: false,
    hidden: true
  },
  {
    dataField: "LastOrderDate",
    text: "Posting Date",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "ProductName",
    text: "Product",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "ExpirationDate",
    text: "Expiration Date",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "TotalRenewableSeat",
    text: "Total Renewable Seat",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "LastRenewType",
    text: "Last Renew",
    sort: true,
    headerFormatter: ListHeaderFormatter
  }];
const subsrciptionColumns = [
  {
    dataField: "ProductName",
    text: "Product",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "Type",
    text: "Product Type",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "ProvisionedUnit",
    text: "Provisioned Unit",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
  {
    dataField: "UsedUnit",
    text: "Used Unit (MoM)",
    sort: true,
    headerFormatter: ListHeaderFormatter
  },
];

const selectRow = {
  mode: "radio",
  clickToSelect: true,
  style: { backgroundColor: "#f8f8f8" },
  hideSelectColumn: true
};

const columnTypeSelector = (param) => {
  switch (param) {
    case "1":
      return commonColumns.concat(traditionalColumns);
    case "2":
      return commonColumns.concat(subsrciptionColumns);
    default:
      return commonColumns;
  }
};

class ListTableDetail extends React.Component {
  
  render() {
    const { columnType, topicListLoading ,topicList } = this.props;
    return (
      <div className="" >
        <ToolkitProvider
          keyField="SerialId"
          // data={_.orderBy(totalPartnerList, ["Health", "MILThisYearTotalRevenueYTD",], ["desc", "desc"])}
          data={topicList}
          columns={columnTypeSelector(columnType)}
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
          search
        >
          {props => (
            <div>
              {/* {keepLoading && totalPartnerList.length === 0 ? null : (
                        <>
                          <Row className="mb-3 ml-1">
                            <Col lg="2" md="12" className="pt-3">
                              <Row>
                                <Col className="d-flex align text-center pl-0" style={{ alignItems: "center" }}>
                                  <div className="w-100">
                                    {
                                      keepLoading ? (
                                        commonComponent.DisabledExportCSVBtn()) : (
                                          <MyExportCSV  {...props.csvProps} />
                                        )
                                    }
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="10" md="12" className="pt-3">
                              <Row>
                                <Col className="pl-0">
                                  {
                                    keepLoading ? (commonComponent.DisabledSearchBar()) : (
                                      <SearchBar
                                        className="search-input-custom w-100"
                                        {...props.searchProps}
                                      />
                                    )
                                  }
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="pb-3">
                          </Row>
                        </>
                      )
                      } */}
              <div className="tablelist-wrapper">
                <BootstrapTable
                  ref={n => this.node = n}
                  {...props.baseProps}
                  bootstrap4
                  bordered={false}
                  pagination={paginationFactory({
                    sizePerPage: 10,
                    sizePerPageList: [10],
                    showTotal: true,
                    paginationTotalRenderer: customTotalFormatter,
                  })}
                  noDataIndication={() => topicListLoading ? <span>Loading ...</span>: <div className="mt-10" style={{ minHeight: "26vw" }}><span >No data</span></div>}
                  selectRow={selectRow}
                  filter={filterFactory()}
                  wrapperClasses="tablelist-inner"
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    topicList: state.topiclist.topicList,
    topicListLoading: state.topiclist.topicListLoading
  };
};
export default connect(mapStateToProps, null)(ListTableDetail);
