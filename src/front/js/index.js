//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import * as CryptoCharts from "cryptocharts";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
