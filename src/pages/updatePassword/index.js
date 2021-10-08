import './updatePassword.less';
import React, { Component } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Input, Checkbox, Form, Button, message } from 'antd';
import axios from "axios";
// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;

export default class UpdatePassword extends Component {

    state = {loading: false};

    constructor(props){
        super(props);
        console.log(props)
    }

    updatePassword = (value) => {
        const params = {
            password: value.password,
            linkId: this.props.match.params.id
        }
    this.setState({ loading: true });
    axios
        .post("/api/auth/updatepassword", params)
        .then((response) => {

        console.log(response.data);
        message.success('Password changed Successfully'); 
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
            <div className="update-root">
                <div className="logInForm">
                    <div className="loginContent">
                        <div className="loginLogo">
                            <img src="/assets/logo.png"/>
                        </div>

                        <div className="loginFormContent">
                            <Form
                                onFinish={this.updatePassword}
                            >
                                <div className="isoInputWrapper">
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter new password" }]}>
                                    <Input
                                        size="large"
                                        type="password"
                                        placeholder="Enter New Password"
                                    />
                                </Form.Item>
                                </div>

                                <div className="isoInputWrapper">
                                <Form.Item
                                    name="confitrm_password"
                                    rules={[{ required: true, message: "Confirm Password Please" }]}>
                                    <Input
                                        size="large"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Item>
                                </div>

                                <div className="loginGroup">
                                    <Button type="primary" htmlType="submit">
                                        Update Password
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
