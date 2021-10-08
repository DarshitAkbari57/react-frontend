import "./App.less";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Spin } from "antd";
import { Provider, connect } from "react-redux";
import AuthRoutes from "./pages/auth.routes";
import Routes from "./pages/routes";
import axios from "axios";
import { io } from "socket.io-client";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import qs from 'query-string';

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "http://ec2-3-16-42-232.us-east-2.compute.amazonaws.com:5000";

const App = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let auth = JSON.parse((await localStorage.getItem("auth")) || null);
    auth && props.login(auth);

    setLoading(false);
  }, []);

  let { next=false } = qs.parse(window.location.href)
  console.log(window.location.href)
  console.log(next)
  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  } else {
    return (
      <Router>
        {props.auth && props?.auth?.user?.type ? <AuthRoutes next={next} /> : <Routes />}
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state,
    notify: state?.notify || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    },
    // newNotification: (data) => {
    //   dispatch({
    //     type: "NOTIFY",
    //     payload: data,
    //   });
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
