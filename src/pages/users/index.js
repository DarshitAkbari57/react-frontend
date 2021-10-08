import "./home.less";
import React, { useState, useEffect } from "react";
import { Button, message, Table, Space, Spin } from "antd";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Heading from "../../components/Heading";
import {
  MessageOutlined
} from '@ant-design/icons'

function Student(props) {
  const { type } = props.user;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getUserList();
    console.log(data)
  }, []);

  const getUserList = () => {
    setLoading(true);

    axios
      .get("api/auth/users")
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        message.error("something went wrong please try again.");
      });
  };

  const approveUser = (id)=>{
    axios
    .put("/api/auth/approve",{id})
    .then((response) => {
      setLoading(true);
      getUserList();
      // setData(response.data.data);
      // console.log(response.data.data);
    })
    .catch((error) => {
      message.error("something went wrong please try again.");
    });
  }

  const deleteUser = (id)=>{
    axios
    .delete(`/api/auth/deleteuser/${id}`)
    .then((response) => {
      setLoading(true);
      getUserList();
      // setData(response.data.data);
      // console.log(response.data.data);
    })
    .catch((error) => {
      message.error("something went wrong please try again.");
    });
  }

  const columns = [
    {
      title: "",
      key: "avatar",
      render: (text, record) => <img src={text.avatar} style={{height:"25px",width:"25px"}}/>,
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "name",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Edit</a> */}
          {/* { type=='principal' &&  <a>Delete</a>}
          { type=='principal' && <Link to={"/itinerary/compare/"+record._id}>Show</Link>}
           
          { type=='agent' && <a>Decline</a>} */}
          <Link to={"/message?to="+record._id}><MessageOutlined /></Link>
          {record.verified==false ? <Button onClick={()=>approveUser(record._id)}>Approve</Button> : <div>Approved</div>}
          {type == "agency" || type == "college" && <Button onClick={()=>deleteUser(record._id)}>Delete</Button>}
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const addInquiry = (data) => {
    setAddLoading(true);
    console.log(data);
    axios
      .post("/api/inquiry/create", data)
      .then((response) => {
        console.log(response);
        axios
          .post("/api/inquiry/invite", {
            id: response.data.data._id,
            agents: data.agents,
          })
          .then((response) => {
            console.log(response);
            setIsModalVisible(false);
            setAddLoading(false);
            getUserList();
          })
          .catch((error) => {
            setAddLoading(false);
            message.error(
              error?.response?.data?.message ||
                "Adding failed, please try again!"
            );
          });
      })
      .catch((error) => {
        setAddLoading(false);
        message.error(
          error?.response?.data?.message || "Adding failed, please try again!"
        );
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDone = () => {
    setIsModalVisible(false);
  };
  // console.log("data",data,columns)

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }
  return (
    <div>
      <div className="t-center" style={{ paddingBottom: 15 }}>
        <Heading value="Users" style={{ marginBottom: 15 }} />
        <p>
          What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing
          and typesetting industry Lorem Ipsum has been the industry's.
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table dataSource={data} pagination={true} columns={columns} />
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Student);
