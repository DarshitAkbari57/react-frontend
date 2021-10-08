import "./login.less";
import React, { Component } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Input, Checkbox, Form, Button, message } from "antd";
import { Row, Col, Grid } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import qs from "query-string";

// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;

class Login extends Component {
  state = { loading: false };

  login = (value) => {
    console.log(value);
    this.setState({ loading: true });
    axios
      .post("/api/auth/login", value)
      .then((response) => {
        console.log(response.data);

        const { next = false } = qs.parse(this.props.location.search);
        console.log(next);

        if (response.data.data.user.type == undefined) {
          if (next) this.props.history.push("/onboarding?&next=" + next);
          else this.props.history.push("/onboarding");
        } else {
          this.props.login(response.data.data);
        }
        // this.props.login({ id: 1, name: "pratik", token: "asdfasgdfgdfgdfg" });
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;

    const { next = false } = qs.parse(this.props.location.search);
    // console.log(next)

    return (
      <div className="login-root">
        <div className="logInForm">
          <div className="loginContent">
            <div className="loginLogo">
              <img src="/assets/logo.png" />
            </div>

            <div className="loginFormContent">
              <Form
                initialValues={{ email: "admin@gmail.com", password: "1234" }}
                onFinish={this.login}
              >
                <div className="isoInputWrapper">
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter email" }]}
                  >
                    <Input
                      size="large"
                      type="email"
                      placeholder="Email"
                      autoComplete="true"
                    />
                  </Form.Item>
                </div>
                <div className="isoInputWrapper">
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter password" },
                    ]}
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </div>

                <div className="loginGroup">
                  <Checkbox>Remember me</Checkbox>
                  <Button type="primary" loading={loading} htmlType="submit">
                    Sign In
                  </Button>
                </div>
              </Form>

              <div className="seperatorLine" />

              <div className="otherLinkSection">
                {next ? (
                  <a href={"/signup?next=" + next}>New User?</a>
                ) : (
                  <a href={"/signup"}>New User?</a>
                )}
                <a href="/forget">Forget Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
