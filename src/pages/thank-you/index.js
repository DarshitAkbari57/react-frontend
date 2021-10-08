import "./thank.less";
import React, { Component, useState } from "react";
// import { browserHistory } from 'react-router'
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Input, Checkbox, Form, Button, message } from "antd";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Row, Col, Grid } from "antd";
// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;
import axios from "axios";
import { connect } from "react-redux";

const ThankYou = (props) => {
 

  return (
    <div className="thank-you-root">
        <div className="model">
          <img src="/assets/logo.png" />
            <p>thank you for signup. your request has been submitted to your admin. please wait until he will review and accept your request.</p>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
