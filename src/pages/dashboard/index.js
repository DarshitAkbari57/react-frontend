import "./home.less";
import React, { Component, useState, useEffect } from "react";
import { Row, Col, Grid, Layout, Card, Divider, Table, Progress, message } from "antd";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
import { connect } from "react-redux"

const { Meta } = Card;


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const createDummyData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const categories = [
    {
      category: months.map((month) => {
        return {
          label: month,
        };
      }),
    },
  ];
  const data = [
    {
      dataset: [
        {
          seriesname: "success",
          data: months.map(() => {
            return {
              value: Math.floor(Math.random() * 200) + 15,
            };
          }),
        },
        {
          seriesname: "failure",
          data: months.map(() => {
            return {
              value: Math.floor(Math.random() * 200) + 15,
            };
          }),
        },
      ],
    },
  ];
  return { categories, data };
};

const createDummyTableData = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      time: new Date().toLocaleTimeString(),
      name: "name " + i,
      time_taken: i + 1 + "seconnds",
      status: "completed",
    });
  }
  return data;
};

function Dashboard(props) {
   {
    const barChartData = createDummyData();
    const barChartConfigs = {
      type: "msstackedcolumn2d",
      width: "700",
      height: "500",
      dataFormat: "json",
      dataSource: {
        chart: {
          xAxisName: "Current Year",
          yAxisName: "Execution Count",
          theme: "fusion",
          paletteColors: "#1bb194, #ea5d5e",
        },
        categories: barChartData.categories,
        dataset: barChartData.data,
      },
    };
    const executionChartConfigs = {
      type: "doughnut2d",
      width: "700",
      height: "350",
      dataFormat: "json",
      dataSource: {
        chart: {
          xAxisName: "Country",
          yAxisName: "Reserves (MMbbl)",
          theme: "fusion",
          doughnutRadius: 90,
          paletteColors: "#1bb194, #ea5d5e",
        },
        data: [
          {
            label: "success",
            value: 355,
          },
          {
            label: "failure",
            value: 101,
          },
        ],
      },
    };

    const columns = [
      {
        title: "Date",
        dataIndex: "created_at",
      },
      {
        title: "Activity",
        dataIndex: "message",
      },
      {
        title: "Performed By",
        dataIndex: "user"
      }
      // {  
      //   title: "Time Taken",
      //   dataIndex: "time_taken",
      // },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      // },
    ];

    const [totalUsers, settotalUsers] = useState(0);
    const [totalItinerary, settotalItinerary] = useState(0);
    const [totalInquiry, settotalInquiry] = useState(0);
    const [recentAction, setrecentAction] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getDashBoardData();
      
      console.log(recentAction)
    }, []);

    const getDashBoardData = () =>{
      setLoading(true);
      axios
      .get("/api/users/dashboard")
      .then((response) => {
        setLoading(false);
        settotalUsers(response.data.data.userCount);
        settotalItinerary(response.data.data.itineraryCount);
        settotalInquiry(response.data.data.inquiryCount);
        
        setrecentAction(response.data.data.recentAction)
      })
      .catch((error) => {
        message.error("Something went wrong.");
      });
  };

    return (
      <div className="dashboard">
        <Row gutter={16} style={{marginBottom:"15px"}}>
          <Col lg={8} md={12} className="count-card-col">
            <Card hoverable className="count-card">
              <div className="left-img">
                <PieChartOutlined size={30} />
              </div>
              <div className="right-data">
                <div className="count">{totalUsers}</div>
                <div className="title">Total Users</div>
              </div>
            </Card>
          </Col>
          <Col lg={8} md={12} className="count-card-col">
            <Card hoverable className="count-card">
              <div className="left-img">
                <PieChartOutlined />
              </div>
              <div className="right-data">
                <div className="count">{totalItinerary}</div>
                <div className="title">Total Itinerary</div>
              </div>
            </Card>
          </Col>
          <Col lg={8} md={12} className="count-card-col">
            <Card hoverable className="count-card">
              <div className="left-img">
                <PieChartOutlined />
              </div>
              <div className="right-data">
                <div className="count">{totalInquiry}</div>
                <div className="title">Total Inquiry</div>
              </div>
            </Card>
          </Col>
          {/* <Col lg={6} md={12} className="count-card-col">
            <Card hoverable className="count-card">
              <div className="left-img">
                <PieChartOutlined />
              </div>
              <div className="right-data">
                <div className="count">5</div>
                <div className="title">Draft</div>
              </div>
            </Card>
          </Col> */}
        </Row>
        <div>
        <Card hoverable title="Recent Action">
              <Table columns={columns} pagination={true} dataSource={recentAction} />
        </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);