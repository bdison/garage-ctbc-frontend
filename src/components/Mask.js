import React, { Component } from "react";
import { Box } from "react-feather";

export class Mask extends Component {
    render() {
        const { title, content } = this.props;
        return (
            <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: "99" }} >
                <div className="d-flex align-items-center text-center"
                    style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "calc(0.2rem - 1px)", margin: "0 30px 0 0", border: "1.5px solid #bcbcbc" }}>
                    <div style={{ width: "100%" }}>
                        <div className="d-flex flex-column"
                            style={{ color: "white" }}>
                            <div style={{ padding: "10px 0" }} >
                                <Box className="align-middle" size={120} style={{ color: "#eaeaea" }} />
                            </div>
                            <div style={{ padding: "10px 0", userSelect: "none" }}>
                                <h1 style={{ color: "#eaeaea" }}>{title}</h1>
                                <h3 style={{ color: "#eaeaea" }}> {content}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mask;