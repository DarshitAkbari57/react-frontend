import "./message.less";
import React, { Component, useEffect, useState } from "react";
import {
  Row,
  Col,
  Grid,
  Layout,
  Input,
  Avatar,
  Typography,
  Badge,
  Button,
  message,
  Spin,
} from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import qs from "query-string";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
  AudioOutlined,
  DeleteFilled,
  CheckOutlined,
  // MessageOutlined
} from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowDownOutlined,
  UserOutlined,
  UpCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Provider, connect } from "react-redux";

const { Search } = Input;
const { Text } = Typography;

const Message = (props) => {
  const { user } = props;

  const [messageInput, setMessageInput] = useState("");
  const [searchRoom,setSearchRoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(false);
  let [roomList, setRoomList] = useState(false);
  let [messages, setMessages] = useState([]);
  const {} = props.match.params;

  // let oldMessage=null;
  // console.log(!loading && props.message!=oldMessage)
  // if(!loading && props.message!=oldMessage){
  //   console.log(props.message);

  // if(activeRoom && activeRoom.roomId == props.message.roomId){

  // }else{
  //   let roomIndex = roomList.findIndex(o=>o._id==props.message.roomId)
  //   if(roomIndex){
  //     roomList[roomIndex] = {...roomList[roomIndex], unreadCount: 1}
  //     setRoomList(roomList)
  //   }
  // }

  //   oldMessage=props.message;
  // }

  useEffect(() => {
    // setDescription(initialDesc)
    console.log("props update ...", activeRoom);
    if (activeRoom && activeRoom._id == props.message.roomId) {
      messages.push(props.message);
      setMessages(messages);
    } else if (roomList) {
      let roomIndex = roomList.findIndex((o) => o._id == props.message.roomId);
      if (roomIndex) {
        roomList[roomIndex] = {
          ...roomList[roomIndex],
          unreadCount: (roomList[roomIndex]?.unreadCount || 0) + 1,
        };
        setRoomList(roomList);
      }
    }
  }, [props.message]);

  const getRoom = () => {
    axios
      .get("/api/room")
      .then((response) => {
        let data = response.data.data;
        data.map((d)=>{
          d.unreadCount = user._id==d.user1._id ? d.unreadCount1 : d.unreadCount2
        })
        console.log(data)
        setRoomList(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        message.error(e?.response?.data?.message || "Something went wrong!");
      });
  };

  useEffect(() => {
    let { to = false } = qs.parse(props.location.search);
    if (to) {
      // create room
      axios
        .post("/api/room/create", { userId: to })
        .then((response) => {
          getRoom();
          setActiveRoom(response.data.data);
        })
        .catch((e) => {
          message.error(e?.response?.data?.message || "Something went wrong!");
        });
    } else {
      getRoom();
    }
  }, []);

  useEffect(() => {
    try {
      let ele = document.getElementById("MessageRoom");
      ele.scrollTo(0, ele.scrollHeight);
    } catch (e) {}
  }, [messages]);

  useEffect(() => {
    if (activeRoom && roomList) {
      console.log("active room changes .........");
      let roomIndex = roomList.findIndex((o) => o._id == activeRoom._id);
      // if (roomIndex) {
      //   roomList[roomIndex] = { ...roomList[roomIndex], unreadCount: 0 };
      //   setRoomList(roomList);
      // }
      axios
        .get(`/api/message/${activeRoom?._id}/0/100`)
        .then((response) => {
          console.log(response.data.data);
          // setRoomList()
          setMessages(response.data.data);
        })
        .catch((e) => {
          message.error(e?.response?.data?.message || "Something went wrong!");
        });
    }
  }, [activeRoom]);

  // const onSearch = (value) => console.log(value);

  const sendMessage = (value) => {
    let receiverUser =
      activeRoom.user1._id == user._id ? activeRoom.user2 : activeRoom.user1;
    setMessageInput("");
    axios
      .post("/api/message/send", {
        roomId: activeRoom._id,
        message: value,
        receiverId: receiverUser._id,
      })
      .then((response) => {
        console.log(response.data.data);
        messages.push(response.data.data);
        setMessages([...messages]);
      });
    // axios.get(`/api/message/${activeRoom?._id}/${activeRoom?.totalMessages}/100`).then(response=>{
    //   // console.log(response.data.data)
    //   setMessages(response.data.data)
    // }).catch(e=>{
    //   message.error(e?.response?.data?.message || "Something went wrong!");
    // })
  };

  const deleteActiveRoom = () => {
    console.log(activeRoom);
    axios
      .post("/api/room/delete", { id: activeRoom._id })
      .then((response) => {
        setRoomList([]);
        getRoom();
        setActiveRoom(false);
      })
      .catch((e) => {
        message.error(e?.response?.data?.message || "Something went wrong!");
      });
  };

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }

  return (
    <div className="message-root" style={{ height: 800 }}>
      <Row>
        <Col span={6} className="chat-list-col">
          <Input
            placeholder="Search .."
            size="large"
            className="input-search"
            onChange={(e)=>setSearchRoom(e.target.value)}
          />
          <div className="active-chat-list">
            {roomList &&
              roomList.map((o, index) => {
                let receiverUser = o.user1._id == user._id ? o.user2 : o.user1;
                console.log(searchRoom)
                // console.log(searchRoom?.includes(receiverUser.first_name+ " "+receiverUser.first_name+ " "+receiverUser.type))
                // console.log(receiverUser.first_name+ " "+receiverUser.first_name+ " "+receiverUser.type)
                if( searchRoom!=false && searchRoom!="" && !(receiverUser?.first_name+ " "+receiverUser?.first_name+ " "+receiverUser?.type).toLowerCase().includes(searchRoom) ){
                  return;
                }

                return (
                  <div
                    className={
                      "item " + (activeRoom?._id == o._id ? "active" : "")
                    }
                    key={index}
                    onClick={() => setActiveRoom(o)}
                  >
                    {/* <Badge status={[1,3].includes(o) ? 'success' : 'default'} /> */}
                    <div className="avtar-div">
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        // icon={<UserOutlined />}
                        src={receiverUser?.avatar}
                      />
                    </div>
                    <div className="name">
                      <Text strong >
                        <span style={{display: 'flex', justifyContent: 'space-between'}}>{receiverUser?.first_name} {receiverUser?.last_name} <span style={{color: '#ccc'}}>{receiverUser?.type}</span></span>
                      </Text>
                      <div className="d-flex j-space">
                        <Text type="secondary">{o.lastMessage} </Text>
                        {( o.unreadCount!=0) && (
                          <span className="count">{o.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
        <Col span={18} style={{ display: "flex", flexDirection: "column" }}>
          {!activeRoom ? (
            <div style={{ margin: "auto", fontSize: 50, textAlign: "center" }}>
              <MessageOutlined />
              <p style={{ fontSize: 18 }}>Let's chat with client :)</p>
            </div>
          ) : (
            <>
              <div className="top-user-details">
                <div>
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                  <span style={{ marginLeft: 6 }}>
                    {" "}
                    {activeRoom.user1?._id == user?._id
                      ? activeRoom.user2?.first_name +
                        " " +
                        activeRoom.user2?.last_name
                      : activeRoom.user1?.first_name +
                        " " +
                        activeRoom.user1?.last_name}{" "}
                  </span>
                </div>
                <div>
                  <Button
                    type="link"
                    shape="circle"
                    onClick={deleteActiveRoom}
                    icon={<DeleteFilled />}
                  />
                </div>
                {/* <Button  type="primary" shape="circle" icon={<PlusOutlined />} /> */}
              </div>
              <div className="message-room" id="MessageRoom">
                <div className="message-container">
                  {messages &&
                    messages.map((o, key) => {
                      return (
                        <div
                          key={key}
                          className={
                            o.senderId._id != user._id ? "item" : "item send"
                          }
                        >
                          <div>{o.message}</div>
                          <div style={{ fontSize: 10, color: "#8c8b8b" }}>
                            2:22 pm <CheckOutlined />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="message-input-root">
                <Search
                  placeholder="input message"
                  enterButton="Send"
                  size="large"
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  suffix={
                    <AudioOutlined
                      style={{
                        fontSize: 16,
                        color: "#1890ff",
                      }}
                    />
                  }
                  onSearch={sendMessage}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    message: state.message,
    // notify: state?.notify || false
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

export default connect(mapStateToProps, mapDispatchToProps)(Message);
