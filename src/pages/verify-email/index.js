import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  Steps,
  message,
  DatePicker,
  Upload,
  Space,
  Spin,
} from "antd";
import axios from "axios";

const Verify = (props) => {
  const [loading, setLoading] = useState(true);

  const { userId, token } = props.match.params;

  useEffect(() => {
    axios
      .post(`api/auth/userverify/${userId}/${token}`)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        // setstate({ loading: false });
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }

  return (
    <div className="thank-you-root">
      <div className="model">
        <img src="/assets/logo.png" />
        <p>
          Email verify successfully. Thank you :)
        </p>
      </div>
    </div>
  );
};

export default Verify;