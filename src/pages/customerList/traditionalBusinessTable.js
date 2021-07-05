
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faRocket, faCloud, faHourglass, faUndo } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";


class TraditionalBusinessTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { tmBizList } = this.props;
        const { SearchBar } = Search;

        const columns = [
            {
                dataField: "CustomerName",
                text: "Customer Name",
                sort: true,
            },
            {
                dataField: "ExpirationDate",
                text: "Expiration Date",
                sort: true,
            },
            {
                dataField: "LastOrderDate",
                text: "Last Order Date",
                sort: true,
            },
            {
                dataField: "SuggestedActions",
                text: "Suggested Actions",
                formatter: (cell, row) => (
                    <div>
                        <FontAwesomeIcon data-tip={"Upgrade Oppty"} data-for={"UpgradeOpptyTip"} icon={faRocket} fixedWidth style={{ color: row.UpgradeOpptySignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"UpgradeOpptyTip"} />
                        <FontAwesomeIcon data-tip={"SaaS Potential"} data-for={"SaaSPotentialTip"} icon={faCloud} fixedWidth style={{ color: row.SaaSPotentialSignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"SaaSPotentialTip"} />
                        <FontAwesomeIcon data-tip={"Expiring Order"} data-for={"ExpiringOrderTip"} icon={faHourglass} fixedWidth style={{ color: row.ExpiringOrderSignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"ExpiringOrderTip"} />
                        <FontAwesomeIcon data-tip={"Lost Order"} data-for={"LostOrderTip"} icon={faUndo} fixedWidth style={{ color: row.LostOrderSignal === 1 ? "#4A8CC7" : "#A9A9A9", marginRight: "5px" }} />
                        <ReactTooltip id={"LostOrderTip"} />
                    </div>
                ),
                csvExport: false
            },
            {
                dataField: "UpgradeOpptySignal",
                text: "Upgrade Oppty",
                hidden: true
            },
            {
                dataField: "SaaSPotentialSignal",
                text: "SaaS Potential",
                hidden: true
            },
            {
                dataField: "ExpiringOrderSignal",
                text: "Expiring Order",
                hidden: true
            },
            {
                dataField: "LostOrderSignal",
                text: "Lost Order",
                hidden: true
            }
        ];

        

        const selectRow = {
            mode: "radio",
            clickToSelect: true,
            style: { backgroundColor: "#dee2e6" },
            hideSelectColumn: true
        };

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
                        <SearchBar id="TMSearchBar" {...props.searchProps} />
                    </Col>
                </Row>
            );
        };

        return (
            <Row>
                <Col>
                    <ToolkitProvider
                        keyField="CustomerName"
                        data={tmBizList}
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
        tmBizList: state.customerlist.tmBizList
    };
};

export default connect(mapStateToProps, null)(TraditionalBusinessTable);



