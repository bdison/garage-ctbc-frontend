import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { CookiesProvider } from "react-cookie";
import { history } from "./utility/googleAnalytics";
import store from "./redux/store/index";
import Routes from "./routes/Routes";

class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <Routes history={history} />
          <ReduxToastr
            timeOut={5000}
            newestOnTop={true}
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </Provider>
      </CookiesProvider>
    );
  }
}

export default App;
