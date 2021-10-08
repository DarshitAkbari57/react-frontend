import './Footer.less';
import React, { Component } from 'react';
import { Layout, Row, Col, } from 'antd';
import {
    FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined 
} from '@ant-design/icons';

const {  Footer,  } = Layout;

export default class FooterComp extends Component {
    render() {
        return (
            <Footer>
                <div className='container'>
                    <Row>
                        <Col xs={{ span: 24, }} lg={{ span: 6,  }} md={{span: 6}}>
                            <img width="200" style={{padding: 20}} src="assets/logo.png" alt="img"></img>
                            {/* <img src='assets/white_logo.png' width="200" alt='logo' style={{padding: 20}} /> */}
                            <p className="brand-goal">Create experiences with your favourite stars.</p>
                            <div className="social-icons">
                                <FacebookOutlined /> <InstagramOutlined /> <TwitterOutlined />
                            </div>
                        </Col>
                        <Col xs={{ span: 24,  }} lg={{ span: 6,  }} md={{span: 6}}>
                            <h3>Pages</h3>
                            <ul>
                                <li>Home</li>
                                <li>About</li>
                            </ul>
                        </Col>
                        <Col xs={{ span: 24,  }} lg={{ span: 6,  }} md={{span: 6}}>
                            <h3>#</h3>
                            <ul>
                                <li>Login</li>
                                <li>Register</li>
                            </ul>
                        </Col>
                        <Col xs={{ span: 24,  }} lg={{ span: 6,  }} md={{span: 6}}>
                            <h3>#</h3>
                            <ul>
                                <li>Terms</li>
                                <li>Privacy</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

            </Footer>
        )
    }
}
