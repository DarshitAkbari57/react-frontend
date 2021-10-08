import "./inquiry.less";
import React, { useState, useEffect } from "react";
import { Button, message, Table, Space, Select, Form, Modal, Input } from "antd";
import OperationModal from "./OperationModal";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Heading from '../../components/Heading'
import {
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
} from '@ant-design/icons'

const { Option } = Select;

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

function Inquiry(props) {
  const { type } = props.user;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [itinerayList, setItinerayList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [sendTour, setSendTour] = useState(false);
  const [sendTourLoading, setSendTourLoading] = useState(false);

  useEffect(() => {
    getItinerayList();
    console.log("calle d effect");
  }, []);

  const getItinerayList = () => {
    setLoading(true);
    axios
      .get("/api/itinerary")
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data)
        setItinerayList(response.data.data);
      })
      .catch((error) => {
        message.error("something went wrong please try again.");
      });
  };


  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = () => {
    setLoading(true);
    axios
      .get("/api/inquiry")
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
        console.log("data is here",response.data.data);
      })
      .catch((error) => {
        message.error("something went wrong please try again.");
      });
  };

  const deleteInquiry = (value) =>{
    setLoading(true);
    console.log({id:value})
    axios.delete("api/inquiry/delete",{data:{id:value}})
    .then((response) => {
      setLoading(false);
     // setData(response.data.data);
     const newData = data.filter((d)=>d._id!==response.data.data._id);
     setData(newData)
    })
    .catch((error) => {
      console.log(error)
      message.error("something went wrong please try again.");
    });
  }

  const deleteInquiryFromAgent = (id) =>{
    setLoading(true);
    console.log({id:id});
    axios.put('/api/inquiry/decline',{id:id}).then((response) =>{
      setLoading(false);
      console.log(1111)
     const newData = data.filter((d)=>d._id!==response.data.data._id);
      setData(newData)
    })
    .catch((error) => {
      console.log(error)
      message.error("something went wrong please try again.");
    });
  }
  

  let columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    }, {
      title: "Month",
      dataIndex: "month",
      key: "description",
    },
    {
      title: "Agency",
      key: "agents",
      dataIndex: "agents",
      render: (agents) => (
        <>
          {agents.map((agent, index) => {
            return (
              <div>
                <span role="img" aria-label="">
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "6px",
                      borderRadius: 10
                    }}
                    src={agent.userId.avatar}
                    alt=""
                  />
                </span>
                {`${agent.userId.first_name} ${agent.userId.last_name}`}
              </div>
            );
          })}
        </>
      ),
    }, {
      title: "From",
      key: "userId",
      dataIndex: "userId",
      render: (userId) => (
        <div>
          <span role="img" aria-label="">
            <img
              style={{
                width: "20px",
                height: "20px",
                marginRight: "6px",
                borderRadius: 10
              }}
              src={userId.avatar}
              alt=""
            />
          </span>
          {`${userId.first_name} ${userId.last_name}`}
        </div>
      ),
    },
    {
      title: "Status",
      key: "is_completed",
      dataIndex: "is_completed",
      render: (is_completed) => (
        <>
          {is_completed ? "completed": "pending"}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Edit</a> */}
          {type == "college" &&  <Button onClick={() => deleteInquiry(record._id)}>Delete</Button>}
          {type == "college" && (
            <Link to={"/itinerary/compare/" + record._id}>Show</Link>
          )}
          {!record.is_completed && ["agent", 'agency'].includes(type) && (
            <a onClick={() => setSendTour(record._id)}><EditOutlined/></a>
          )}
          {record.is_completed && ["agent", 'agency'].includes(type) && (
            <a onClick={() => setSendTour(record._id)}> <EditOutlined/></a>
          )}
          {!record.is_complted &&  ["agent", 'agency'].includes(type) && <a onClick={()=>deleteInquiryFromAgent(record._id)}><DeleteOutlined/></a>}
          {!record.is_complted &&  ["agent", 'agency'].includes(type) && <Link to={"/message?to="+record.userId._id}><MessageOutlined/></Link>}
        </Space>
      ),
    },
  ];

  if(type=="college"){
    columns = columns.filter(o=>o.key!="userId")
  }else{
    columns = columns.filter(o=>o.key!="agents")

  }

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
            getAgentList();
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

  const sendTourSubmit = (value) => {
    console.log(value)

    setSendTourLoading(true)

    axios.put('/api/inquiry/submit', {...value,id: sendTour }).then(response=>{
      setSendTourLoading(false)
      setSendTour(false);
      form.resetFields();
    }).catch(e=>{

    })


  };

  const [form] = Form.useForm();

  return (
    <div>
      <OperationModal
        current={null}
        addLoading={addLoading}
        visible={isModalVisible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={addInquiry}
      />

      <Modal
        title={'Send Itinerary'}
        width={640}
        bodyStyle={{
          padding: "28px 0 0",
        }}
        destroyOnClose
        visible={sendTour}
        {...{
          okText: "Send",
          onOk: () => {
            if (!form) return;
            form.submit();
          },
          onCancel: ()=>{
            setSendTour(false)
          },
        }}
        okButtonProps={{ loading: sendTourLoading }}
      >
        <Form {...formLayout} form={form} onFinish={sendTourSubmit}>
          <Form.Item
            name="itineraryId"
            label="Itinerary"
            rules={[
              {
                required: true,
                message: "Please enter itinerary ",
              },
            ]}
          >
            <Select >
              {
                itinerayList.map((o,key)=>{
                  return <Option value={o._id}> {o.name}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>


      <div className="t-center" style={{paddingBottom: 15}}>
              <Heading value="Inquiry" style={{marginBottom: 15}} />
              <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's.</p>
      </div>

      <div className="filter-container">
        {["college"].includes(type) && (
          <Button onClick={showModal}>Create Inquiry</Button>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <Table dataSource={data} pagination={false} columns={columns} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Inquiry);
