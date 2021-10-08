import "./home.less";
import React, { Component } from "react";
import { Row, Col, Grid, Layout } from "antd";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { Content } = Layout;

export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Header></Header>
        <Content className="home-root">
          <div className="container">
            <h1 class="top-heading">
              A SaaS platform for edu-tour management
            </h1>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}
