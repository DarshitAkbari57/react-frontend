import "./itinerary_compare.less";
import React, { Component, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Grid,
  Layout,
  Button,
  Checkbox,
  Divider,
  Image,
  message,
  Spin,
  Space,
  Modal, Form, Input, Select, 
} from "antd";
import { connect } from "react-redux";
import axios from "axios";
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

function ItineraryCompare(props) {
  const { type } = props.user;
  const { id } = props.match.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agentList, setAgentList] = useState([]);
  const [sendTour, setSendTour] = useState(false);
  const [sendTourLoading, setSendTourLoading] = useState(false);
  const [itinerayList, setItinerayList] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getInquiryDetails();
    getAgentList();
    // console.log("data is here",data)
    // console.log("calle d effect");
  }, []);

  const getInquiryDetails = () => {
    setLoading(true);
    console.log("id is here", id);
    axios
      .get(`/api/inquiry/${id}`)
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
        // setItinerayList(response.data.data);
      })
      .catch((error) => {
        message.error(
          error?.response?.data?.message || "Something went wrong."
        );
        // message.error();
      });
  };

  const approveItinerary = (inq) => {
    console.log(data);
    setLoading(true);
    axios
      .put("/api/inquiry/approve", {
        id: data._id,
        itineraryId: inq.itineraryId._id,
      })
      .then((response) => {
        getInquiryDetails();
      })
      .catch((e) => {
        message.error(e?.response?.data?.message || "Something went wrong.");
      });
  };

  const getAgentList = () => {
    // setLoading(true);
    axios
      .get("/api/agency/all")
      .then((response) => {
        // setLoading(false);
        setAgentList(response.data.data);
      })
      .catch((error) => {
        message.error("something went wrong please try again.");
      });
  };

  const sendTourSubmit = (val) => {
    console.log(val)

    setSendTourLoading(true)

    axios.post("/api/inquiry/invite", {
      id: data._id,
      agents: val.agents,
    }).then(response=>{
      setSendTourLoading(false)
      setSendTour(false);
      getInquiryDetails();
      form.resetFields();
    }).catch(e=>{

    })


  };

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }

  return (
    <>
    <Modal
        title={'Invite Agency'}
        width={640}
        // bodyStyle={{
        //   padding: "28px 0 0",
        // }}
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
          name="agents"
          label="Agency"
        >
          <Select
            mode="multiple"
            placeholder="select agent"
            optionLabelProp="label"
          >
            {agentList && agentList.map((agent) => (
              <Option key={agent._id} value={agent._id} label={`${agent.name}`}>
                <div >
                  <span role="img" aria-label="">
                    <img 
                      style={{ width: '20px', height: '20px', marginRight: '10px' }}
                      src={agent.avatar}
                      alt=""
                    />
                  </span>
                  {`${agent.name}`}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        </Form>

      </Modal>
    <div className="itinerary-compare-root">
      <div>
        <div className="background-img-div">
          <div className="background-img-content">
            <div className="background-btns">
              <div className="background-upper-btns">ID: {data.tourId}</div>
              <div className="background-upper-btns">Tour Confirmed</div>
            </div>
            <h2>{data.name}</h2>
            <p>
             {data.description}
            </p>

            <div className="background-img-btns">
              <Space>
                <Button type="primary" size="large" shape="round" onClick={()=>setSendTour(true)}>
                   Invite Agency
                </Button>
              </Space>
            </div>
          </div>
        </div>

        {/* <div className="destination-main">
          <div>Destination</div>
          <div className="destination-btn">All places</div>
          <div>Sort By</div>
          <div className="destination-btn">Price</div>
          <div className="destination-btn">Duration</div>
          <div className="destination-btn">No.of sightseeing</div>
          <div className="destination-btn">No.of meals</div>
        </div> */}

        <div className="compare-root">
          <table>
            <tr>
              <td className="head"></td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  if (!o.itineraryId) {
                    return <div></div>;
                  } else {
                    return (
                      <td key={index}>
                        <div
                          className="top-img-action"
                          style={{
                            backgroundImage:
                              "url('" + o?.itineraryId?.coverPhoto + "')",
                          }}
                        >
                          <Space>
                            {o.status != "approved" && (
                              <>
                                {/* <Button shape="round">Reject</Button> */}
                                <Button
                                  type="primary"
                                  shape="round"
                                  onClick={() => approveItinerary(o)}
                                >
                                  Approve
                                </Button>
                              </>
                            )}
                          </Space>
                        </div>
                      </td>
                    );
                  }
                })}
            </tr>

            <tr>
              <td className="head">Status</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return <td key={index}>{o.status}</td>;
                })}
            </tr>

            <tr>
              <td className="head">Agent Name</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return (
                    <td key={index}>
                      {o.userId.first_name + " " + o.userId.last_name}
                    </td>
                  );
                })}
            </tr>

            <tr>
              <td className="head">Itinerary Name</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return <td key={index}>{o?.itineraryId?.name}</td>;
                })}
            </tr>

            <tr>
              <td className="head">Quotation par student</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return <td key={index}>{o?.itineraryId?.price}</td>;
                })}
            </tr>

            <tr>
              <td className="head">Places</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return <td key={index}></td>;
                })}
            </tr>

            <tr>
              <td className="head">No. of Days</td>
              {data.agents
                // .filter((o) => o.itineraryId)
                .map((o, index) => {
                  return <td key={index}></td>;
                })}
            </tr>
          </table>
        </div>
      </div>
    </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCompare);
