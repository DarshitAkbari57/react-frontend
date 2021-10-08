import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Typography,
  message,
  Badge,
  Image,
  Spin,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
  DownOutlined,
  NotificationFilled,
  BellOutlined,
  BellFilled,
  DashboardOutlined,
  MessageOutlined,
  IdcardOutlined,
  NodeIndexOutlined,
  FileDoneOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import Verify from "./verify-email";

import Dashboard from "./dashboard";
import Students from "./users";
import Itinerary from "./itinerary";
import Message from "./message";
import CreateItinerary from "./create-itinerary";
import DetailItinerary from "./detail-itinerary";
import OnBoarding from "./onboarding";
import Profile from "./profile";
import Inquiry from "./inquiry";
import TrackingItinerary from "./tracking-itinerary";
import ItineraryCompare from "./itineraryCompare";
import JoinItinerary from "./join";
import axios from "axios";
import { io } from "socket.io-client";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function NotificationComp(props) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    setLoading(true);

    axios
      .get("/api/notification")
      .then((response) => {
        setLoading(false);
        // console.log("/api/notification .....................");
        setNotification(response.data.data);
      })
      .catch((error) => {
        // message.error("something went wrong please try again.");
      });
  };

  return (
    <Dropdown
      overlay={
        <Menu style={{ width: 250 }}>
          {loading && (
            <div
              style={{
                width: 250,
                height: 200,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Spin style={{ margin: "auto" }} />
            </div>
          )}
          {notification.length > 0 ? (
            notification.map((d, index) => {
              return (
                <Menu.Item key={d.key} className="notification-menu">
                  <Link to={"/" + d.type}> {d.message}</Link>
                </Menu.Item>
              );
            })
          ) : (
            <div className="notification-not-found">
              <BellOutlined />
              <span style={{ fontSize: 15, marginTop: 10 }}>
                no update for you :)
              </span>
            </div>
          )}
        </Menu>
      }
      placement="bottomLeft"
      arrow
      trigger={["click"]}
      onVisibleChange={(e) => {
        console.log(e);
        if (e) {
          // setLoading(true)
          getNotification();
        } else {
          setNotification([]);
        }
      }}
    >
      <span style={{ fontSize: 18, marginRight: 5 }}>
        {props.newNotification ? (
          <Badge count={5} dot>
            <BellOutlined />
          </Badge>
        ) : (
          <Badge count={0} dot={false}>
            <BellOutlined />
          </Badge>
        )}
      </span>
    </Dropdown>
  );
}

function Routes(props) {
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { user } = props.auth;

  const socket = io(axios.defaults.baseURL + "/", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    axios
      .post("/api/auth/socketupdate", { socketId: socket.id })
      .then((response) => {})
      .catch((e) => {
        console.error(e);
      });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  socket.on("message", (msg) => {
    console.log("message comm from socket ......");
    console.log(JSON.parse(msg));
    msg = JSON.parse(msg);
    props.updateMessage(msg);
    // notification.open({
    //   message: msg.senderId.first_name + " "+ msg.senderId.last_name,
    //   description:msg.message,
    //   icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    //   placement: 'bottomRight',
    //   onClick: ()=>{
    //     // this.props.
    //     console.log("click notification ....")
    //   }
    // });
  });

  socket.on("notification", (msg) => {
    console.log("mess" + msg);
    setNewNotification(true)
    // props.newNotification(true);
  });


  const menu = [
    {
      to: "/dashboard",
      label: "Dashboard",
      key: "dashboard",
      icon: <DashboardOutlined />,
      permission: ["college", "agency", "admin"],
    },
    {
      to: "/inquiry",
      label: "Inquiry",
      key: "inquiry",
      icon: <FileDoneOutlined />,
      permission: ["college", "agent", "admin", "agency"],
    },
    {
      to: "/itinerary",
      label: "Itinerary",
      key: "itinerary",
      icon: <NodeIndexOutlined />,
      permission: [
        "college",
        "coordinator",
        "student",
        "agent",
        "admin",
        "agency",
      ],
    },
    {
      to: "/users",
      label: "Users",
      key: "users",
      icon: <IdcardOutlined />,
      permission: ["college", "agency", "admin", "agency", "coordinator"],
    },
    {
      to: "/message",
      label: "Message",
      key: "message",
      icon: <MessageOutlined />,
      permission: [
        "college",
        "student",
        "agent",
        "admin",
        "agency",
        "coordinator",
      ],
    },
  ];


  useEffect(()=>{
    console.log("get next after init")
    console.log(props.next)

     if(props.next) window.location = props.next
  },[])

  // console.log(user);
  // console.log(props);

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        // trigger={null}
        collapsedWidth="0"
        collapsed={sideCollapsed}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
          // setSideCollapsed(true);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="profile-details-bx">
          <Avatar
            size={64}
            src={user.avatar}
            // src={<Image src={user.avatar} />}
          />
          <Text strong className="user-name">
            {user.first_name + " " + user.last_name}
          </Text>
          <Text className="role" style={{ textTransform: "capitalize" }}>
            {user.type}
          </Text>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          {menu.map((o, key) => {
            if (o.permission.includes(user.type))
              return (
                <Menu.Item key={o.to} icon={o.icon}>
                  <Link to={o.to}> {o.label}</Link>
                </Menu.Item>
              );
            else return null;
          })}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: sideCollapsed ? 0 : 200 }}>
        <Header
          // style={{
          //   position: "fixed",
          //   zIndex: 1,
          //   width: "100%",
          //   display: "flex",
          // }}
          className="top-fix-header"
          // className="site-layout-sub-header-background"
          style={{ left: sideCollapsed ? 0 : 200 }}
        >
          <Button
            type="text"
            className="menu-btn"
            onClick={() => {
              setSideCollapsed(!sideCollapsed);
            }}
            icon={<UnorderedListOutlined />}
            size={"middle"}
          />

          <img
            src="/assets/logo.png"
            style={{ height: 32, margin: "auto 10px" }}
          />

          {/* <div className="logo" style={{ width: 50 }} /> */}
          {/* <Menu theme="light" mode="horizontal" >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
          <div className="right-menu">
            <NotificationComp newNotification={newNotification} />

            <Dropdown
              overlay={
                <Menu style={{ width: 150 }}>
                  <Menu.Item key="/profile">
                    <Link to={"/profile"}> Profile</Link>
                  </Menu.Item>
                  {/* <Menu.Item key="1">
                    <a href="#">Account Settings</a>
                  </Menu.Item> */}
                  <Menu.Divider />
                  <Menu.Item key="/logout" onClick={props.logout}>
                    Logout
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
              arrow
              trigger={["click"]}
            >
              <Avatar
                style={{
                  backgroundColor: "#ccc",
                }}
                // icon={<UserOutlined />}
                // src={<Image src={user.avatar} />}
                src={user.avatar}
              />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "82px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/users" component={Students} />
              <Route exact path="/itinerary" component={Itinerary} />
              <Route exact path="/inquiry" component={Inquiry} />
              <Route exact path="/message" component={Message} />
              <Route
                exact
                path="/userverify/:userId/:token"
                component={Verify}
              />
              {/* <Route exact path="/onboarding" component={OnBoarding} /> */}

              <Route
                exact
                path="/itinerary/compare/:id"
                component={ItineraryCompare}
              />
              <Route
                exact
                path="/itinerary/detail/:id"
                component={DetailItinerary}
              />
              <Route
                exact
                path="/itinerary/join/:id"
                component={JoinItinerary}
              />
              <Route
                exact
                path="/itinerary/tracking/:id"
                component={TrackingItinerary}
              />
              <Route
                exact
                path="/itinerary/:type/:id?"
                component={CreateItinerary}
              />
              <Redirect
                to={
                  ["agency", "college"].includes(user.type)
                    ? "/dashboard"
                    : "/itinerary"
                }
              />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state,
    notify: state.notify || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    },
    updateMessage: (message) =>{
      dispatch({
        type: "MESSAGE",
        payload: message,
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
