import React from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import InformationTip from "../../components/InformationTip";
import "./dashboard.css";

class SPIFFBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <Card className="mb-1">
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0"> SPIFF Matrix </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <Table className="spiff-table">
                                <thead>
                                    <tr style={{ backgroundColor: "#c6e4fc"}}>
                                        <td className="spiff_item_width"><b>Spiff Programs</b></td>
                                        <td className="spiff_context_width"><b>Bronze / Silver</b></td>
                                        <td className="spiff_context_width"><b>Gold / Platinum</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="spiff_title">Sales Spiffs</span> 
                                            <InformationTip tipName="SalesSpiffs" tipContent={"5% of closed deal size<br/> *New product sales (aka new business) only."} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_title">$2,500</span>
                                        </td>
                                        <td>
                                            <span className="spiff_title">$5,000</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">User Protection</span>
                                            <InformationTip tipName="UserProtection" tipContent={"Endpoint SaaS, Email Security, XDR, Managed XDR"} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">5%</span>
                                            <br />
                                            <span className="spiff_subcontext">Max. payout $2,500</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">5%</span>
                                            <br />
                                            <span className="spiff_subcontext">Max. payout $5K. Deal registration required.</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">Hybrid Cloud Security</span>
                                            <InformationTip tipName="HybridCloudSecurity" tipContent={"Deep Security, Cloud One"} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">5%</span>
                                            <br />
                                            <span className="spiff_subcontext">Max. payout $2,500</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">5%</span>
                                            <br />
                                            <span className="spiff_subcontext">Max. payout $5K. Deal registration required.</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">Network Security</span>
                                            <InformationTip tipName="NetworkSecurity" tipContent={"Deep Discovery, TippingPoint"} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">-</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">5%</span>
                                            <br />
                                            <span className="spiff_subcontext">Max. payout $5K. Deal registration required.</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">Customer Meeting</span>
                                            <InformationTip tipName="CustomerMeeting" tipContent={"*250+ employee accounts. Net logos only. <br />Terms & Conditions may be different for each partner type."} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">$250</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">$250</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">Training SPIFF</span>
                                            <InformationTip tipName="TrainingSPIFF" tipContent={"*User Protection, Hybrid Cloud Security, Network Security <br /> *Maximum payout for 3 trainings per rep"} tipPlace={"right"} />
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">At Trend Micro CAM’s discretion</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">$100</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="spiff_title">Payment Method</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">Reloadable VISA card</span>
                                        </td>
                                        <td>
                                            <span className="spiff_subtitle">Reloadable VISA card</span>
                                            <br />
                                            <span className="spiff_subcontext">Exception: SoftwareOne gets paid via company paycheck</span>
                                        </td>
                                    </tr>

                                    <tr style={{ backgroundColor: "#f6f8fa" }}>
                                        <td colSpan="3">
                                            <span className="spiff_title">How does a partner rep claims the spiffs?</span>
                                            <br />
                                            <span className="spiff_note">
                                                <b>Step 1:</b>
                                                <ul>
                                                    <li>Sign in the TM rewards portal <a href="https://www.trendmicrochampions.com/" target="_blank" rel="noopener noreferrer">https://www.trendmicrochampions.com/</a></li>
                                                </ul>
                                            </span>
                                            <span className="spiff_note">
                                                <b>Step 2:</b>
                                                <ul>
                                                    <li>Sales Spiffs: A partner rep will need to claim his/her sale for spiffs in the portal</li>
                                                    <li>Customer Meeting & Training Spiffs: The spiffs will be loaded automatically once the Trend Micro channel account manager submit and confirm the payout.</li>
                                                </ul>
                                            </span>


                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default SPIFFBoard;