import './forgetPassword.less';
import React, { Component } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Input, Checkbox, Form, Button, message } from 'antd';
import axios from "axios";
// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;

export default class ForgetPassword extends Component {

    state = {loading: false};

    forgetPassword = (value) => {
        console.log(value)
    this.setState({ loading: true });
    axios
        .post("/api/auth/forget", value)
        .then((response) => {

        console.log(response.data);
        message.success('Mail sent successfully. Please check your inbox.'); 
        //this.props.login(response.data.data);

        // this.props.login({ id: 1, name: "pratik", token: "asdfasgdfgdfgdfg" });
        })
        .catch((error) => {
        console.log(error)
        message.error(error?.response?.data?.message);
        this.setState({ loading: false });
        });
    };

    render() {
        return (
            <div className="forget-root">
                <div className="logInForm">
                    <div className="loginContent">
                        <div className="loginLogo">
                            <img src="/assets/logo.png"/>
                        </div>

                        <div className="loginFormContent">
                            <Form
                                onFinish={this.forgetPassword}
                            >
                                <div className="isoInputWrapper">
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: "Please enter email" }]}>
                                    <Input
                                        size="large"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="true"
                                    />
                                </Form.Item>
                                </div>

                                <div className="loginGroup">
                                    <Button type="primary" htmlType="submit">
                                        Send Email
                                    </Button>
                                </div>
                            </Form>

                            <div class="seperatorLine"/>

                            <div className="otherLinkSection">
                                <a href="/signup">Sign Up</a>
                                <a href="/login">Sign In</a>
                            </div>

                        </div>
                    </div>                   
                </div>
            </div>
        )
    }
}
