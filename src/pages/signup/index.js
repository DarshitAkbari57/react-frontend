import "./signup.less";
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
import qs from "query-string";

const SignUp = (props) => {
  const [state, setstate] = useState({ loading: false });

  const signup = (value) => {
    console.log(value);

    setstate({ loading: true });
    axios
      .post("/api/auth/register", value)
      .then((response) => {
        console.log(response.data);
        props.login(response.data.data);

        const { next = false } = qs.parse(props.location.search);
        console.log(next);

        if (next) props.history.push("/onboarding?&next=" + next);
          else props.history.push("/onboarding");
        // this.props.login({ id: 1, name: "pratik", token: "asdfasgdfgdfgdfg" });
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setstate({ loading: false });
      });
  };

  return (
    <div className="signup-root">
      <div className="signUpForm">
        <div className="signUpContent">
          <div className="socialMediaLogos">
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<FacebookFilled />}
              className="facebook"
            />
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<GoogleCircleFilled />}
              className="google"
            />
          </div>
          <div className="signUpLogo">
            <img src="/assets/logo.png" />
          </div>
          <div className="signUpFormContent">
            <Form onFinish={signup} 
              initialValues={{email:'abc2@gmail.com',password: '1234',first_name: 'Join', last_name: 'Doue'}}
            
            >
              <Input.Group size="large">
                <Row gutter={10}>
                  <Col span={12}>
                    <div className="isoInputWrapper">
                      <Form.Item
                        name="first_name"
                        rules={[
                          { required: true, message: "First Name is required" },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div className="isoInputWrapper">
                      <Form.Item
                        name="last_name"
                        rules={[
                          { required: true, message: "Last Name is required" },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Input.Group>

              <div className="isoInputWrapper">
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>

              <div className="isoInputWrapper">
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "password is required" }]}
                >
                  <Input placeholder="Password" />
                </Form.Item>
              </div>

              <div className="isoInputWrapper">
                <Form.Item
                  rules={[
                    { required: true, message: "Confirm Password is required" },
                  ]}
                >
                  <Input placeholder="Confirm Password" />
                </Form.Item>
              </div>

              {/* <div className="isoInputWrapper">
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Mobile number is required",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Phone Number" />
                </Form.Item>
              </div> */}
              {/* <Input.Group size="large">
                <Row gutter={10}>
                  <Col span={12}>
                    <div className="isoInputWrapper">
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Mobile number is required",
                          },
                        ]}
                      >
                        <Input type="number" placeholder="Phone Number" />
                      </Form.Item>
                    </div>
                  </Col>

                  <Col span={12}>
                    <Button type="primary" size="large">Send OTP</Button>
                  </Col>
                </Row>
              </Input.Group> */}
{/* 
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item> */}

              <div className="signUpGroup">
                <Checkbox>
                  By Clicking Here, I agree to Terms Of Service
                </Checkbox>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </div>
            </Form>

            <div class="seperatorLine" />

            <div className="otherLinkSection">
              <a href="/login">Already User?</a>
              <a href="/forget">Forget Password</a>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
