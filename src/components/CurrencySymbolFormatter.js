import React, { Component } from "react";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { currencySymbolGenerator } from "../utility/common.js";

export class CurrencySymbolFormatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencySymbol: "$"
    };
  }
  actions = {
    handleCurrencySymbol: (region) => {
      return currencySymbolGenerator(region);
    }
  }
  componentDidMount() {
    const { tokenCheckisLoaded, dataSourceRegion } = this.props;
    const { handleCurrencySymbol } = this.actions;
    if (true) {
      let symbol = handleCurrencySymbol(dataSourceRegion);
      this.setState({
        currencySymbol: symbol
      });
    }
  }


  render() {
    const { value } = this.props;
    if (!value && value !== 0) return "--";
    return (
      <CurrencyFormat value={parseInt(value)} thousandSeparator={true} displayType={"text"} prefix={this.state.currencySymbol} renderText={renderValue =>
        <>{renderValue}</>
      } />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tokenCheckisLoaded: state.auth.isLoaded,
    dataSourceRegion: state.datasource.dataSourceRegion
  };
};

export default connect(mapStateToProps, null)(CurrencySymbolFormatter);
