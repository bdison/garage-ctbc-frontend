import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: 404,
      status: "Page not found",
      detail: null
    };
  }

  componentDidMount = () => {
    document.title = "Error";
    if (this.props.location.state) {
      const { code, status, detail } = this.props.location.state;
      this.setState({
        statusCode: code,
        status: status,
        detail: detail
      });
    }

  }

  render() {
    const { statusCode, status, detail } = this.state;
    return (
      <div className="text-center">
        <h1 className="display-1 font-weight-bold">{statusCode}</h1>
        <p className="h2">{status}</p>
        <p className="h4" style={{ color: "#666666" }}>{detail}</p>
        <Link to="/">
          <Button color="primary" className="mt-4" size="lg">
            Return to dashboard
      </Button>
        </Link>
      </div>
    );
  }
}

export default ErrorPage;
