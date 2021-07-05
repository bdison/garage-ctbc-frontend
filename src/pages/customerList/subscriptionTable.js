
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Row, Col, Table } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { MinusCircle, PlusCircle } from "react-feather";

class SubscriptionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { mspBizList } = this.props;
        const { SearchBar } = Search;

        const columns = [
            {
                dataField: "CustomerName",
                text: "Customer Name",
                sort: true,
                formatter: (cell, row) => (
                    <div className="text-left">
                        {row.CustomerName}
                    </div>
                )
            },
            {
                dataField: "ProductList",
                text: "Product Count",
                sort: true,
                formatter: (cell, row) => (
                    <div className="text-left">
                        <span>{row.ProductList.length + " " + (row.ProductList.length > 1 ? "Products" : "Product")} </span>
                    </div>
                ),
                csvExport: false
            },
            {
                dataField: "SuggestedActions",
                text: "Suggested Actions",
                formatter: (cell, row) => (
                    <div className="text-left">
                        <FontAwesomeIcon data-tip={"Seat Increase"} data-for={"SeatIncreaseTip"} icon={faArrowUp} fixedWidth style={{ color: row.SeatIncreaseSignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"SeatIncreaseTip"} />
                        <FontAwesomeIcon data-tip={"Seat Decrease"} data-for={"SeatDecreaseTip"} icon={faArrowDown} fixedWidth style={{ color: row.SeatDecreaseSignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"SeatDecreaseTip"} />
                    </div>
                ),
                csvExport: false
            }
        ];

        const MyExportCSV = props => {
            const handleClick = () => {
                props.onExport();
            };
            return (
                <Row>
                    <Col xl="1">
                        <div>
                            <button data-tip={"Download"} data-for={"downloadTip"} className="w-100 btn btn-secondary download-csv" onClick={handleClick}>
                                <FontAwesomeIcon icon={faCloudDownloadAlt} fixedWidth />
                            </button>
                            <ReactTooltip id={"downloadTip"} />
                        </div>
                    </Col>
                    <Col xl="11">
                        <SearchBar id="MspSearchBar" {...props.searchProps} />
                    </Col>
                </Row>
            );
        };

        const expandRow = {
            renderer: row => (
                <div style={{ backgroundColor: "#f6f8fa" }}>
                    {
                        row.ProductList.length > 0 ?
                            <Table style={{ marginLeft: "22px" }}>
                                <thead>
                                    <tr>
                                        <td>Product Name</td>
                                        <td>Product Type</td>
                                        <td>Provisioned Unit</td>
                                        <td>Used Unit</td>
                                        <td>MoM Used Unit</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.ProductList.map((item) => (
                                        <tr key={item.Name}>
                                            <td>{item.Name}</td>
                                            <td>{item.Type}</td>
                                            <td>{item.ProvisionedUnit}</td>
                                            <td>{item.UsedUnit}</td>
                                            <td>{parseFloat(item.UsedUnitMoM * 100)+"%"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            :
                            null
                    }
                </div>
            ),
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({ isAnyExpands }) =>
                isAnyExpands ?
                    <MinusCircle width={16} height={16} />
                    :
                    <PlusCircle width={16} height={16} />
            ,
            expandColumnRenderer: ({ expanded }) =>
                expanded ?
                    <MinusCircle width={16} height={16} />
                    :
                    <PlusCircle width={16} height={16} />

        };

        const selectRow = {
            mode: "radio",
            clickToSelect: true,
            style: { backgroundColor: "#dee2e6" },
            hideSelectColumn: true
        };

        return (
            <Row>
                <Col>
                    <ToolkitProvider
                        keyField="CustomerName"
                        data={mspBizList}
                        columns={columns}
                        exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                        search
                    >
                        {
                            props => (
                                <div>
                                    <MyExportCSV  {...props} />
                                    <Row className="mt-3 mb-3">
                                        <Col>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bootstrap4
                                                bordered={false}
                                                expandRow={expandRow}
                                                selectRow={selectRow}
                                                pagination={paginationFactory({
                                                    sizePerPage: 10,
                                                    sizePerPageList: [10],
                                                    showTotal: true
                                                })}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mspBizList: state.customerlist.mspBizList
    };
};

export default connect(mapStateToProps, null)(SubscriptionTable);



