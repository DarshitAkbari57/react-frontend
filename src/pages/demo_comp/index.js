import "./login.less";
import React, { Component } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Input, Checkbox, Form, Button, message } from "antd";
import { Row, Col, Grid } from "antd";
import { connect } from "react-redux";
import axios from "axios";
// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;

const  InviteItinerary= (props) => {
  const [loading, setLoading] = useState(true);

    const { itineraryId } = props.match.params;

    if (loading) {
      return (
        <div className="loading-root">
          <Spin />
        </div>
      );
    }
    
    return (
      <div>

      </div>
    );
  
}

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

export default connect(mapStateToProps, mapDispatchToProps)(InviteItinerary);
