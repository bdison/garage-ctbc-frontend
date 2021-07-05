import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  portal as protalRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import PortalLayout from "../layouts/Portal";
import Page404 from "../pages/error/Page404";
import ScrollToTop from "../components/ScrollToTop";


const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(AuthLayout, landingRoutes)}
        {childRoutes(PortalLayout, protalRoutes)}
        {childRoutes(DashboardLayout, dashboardRoutes)}
        <Route
          render={(props) => (
            <AuthLayout>
              <Page404  {...props} />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
