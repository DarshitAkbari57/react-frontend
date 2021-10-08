import './tracking-itinerary.less';
import '../../assets/less/common.less';
import React,  { useState, useEffect }  from 'react'
import {
  Row,
  Col,
  Button,
  Space,
  Tag,
  Card,
  Radio,
  Form,
  Table, Spin, message,
  Modal,
  Input
} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { LineChartOutlined, SecurityScanTwoTone, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';

const {TextArea} = Input


const TrackingItinerary = (props)=> {

  const {user} = props;
  const [data,setData] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = props.match.params;
  const [student, setStudent] = useState([]);
  const [totalStudent, settotalStudent] = useState(0)
  const [shareItineraryModal, setShareItineraryModal] = useState(false);
  const [shareEmail, setshareEmail] = useState("")
  const inviteUrl = `https://localhost:3000/itinerary/join/${id}`
  const [userTypes, setuserTypes] = useState("")

  const showModal = () => {
    console.log(inviteUrl)
    setShareItineraryModal(true);
  };

  const columns = [
    {
      title: '',
      key: 'userId',
      render: (text, record) => (
        <img style={{width: 30, borderRadius: 30}} src={record.userId?.avatar} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'userId',
      render: (text, record) =>{ return record.userId?.first_name + " "+ record.userId?.last_name} ,
      // width:"30%"
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'userId',
      render: (text, record) =>{ return record.userId?.email} ,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'userId',
        render: (text, record) =>{ return record.userId?.phone} ,
        // render :(text, record)=>{
        //   return text[0].phone
        // }
    }, 
    {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment',
        // render: (text, record) =>{ return record.userId?.phone} ,
        // render :(text, record)=>{
        //   return text[0].phone
        // }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Edit</a> */}
          {/* { type=='principal' &&  <a>Delete</a>}
          { type=='principal' && <Link to={"/itinerary/compare/"+record._id}>Show</Link>}
          { type=='agent' && <Link to={'/itinerary/create'}>Send Itineray</Link>}
          { type=='agent' && <a>Decline</a>} */}
          <Link to={"/message?to="+record.userId._id}><MessageOutlined /></Link>
          <Button onClick={()=>sendPaymentEmail(record.userId.email)}>Payment Reminder</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getItineraryDetails();
    getTrackingDetail();
    console.log(totalStudent)
  }, []);

  const getItineraryDetails = () => {
    setLoading(true);
    console.log("id is here",id)
    axios
      .get(`/api/itinerary/${id}`)
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
        setData(response.data.data)
        setLoading(false)
       // setItinerayList(response.data.data);
      })
      .catch((error) => {
        message.error(error?.response?.data?.message || "Something went wrong.");
        // message.error();
      });
  };

  const getTrackingDetail = () =>{

    axios.get(`/api/itinerarydetails/all/${id}`).then(response=>{
      console.log("itinerarydetails")
      console.log(response.data)
      setStudent(response.data.data)
      settotalStudent(response.data.data.length)
    }).catch(error=>{
      console.log(error)
      message.error(error?.response?.data?.message || "Something went wrong.");
    })

  }

  const sendPaymentEmail = (email) =>{
    const body = {
      type:"payment-reminder",
      email:email,
      amount:"500 rs",
      lastDate:"03-04-2021",
      itineraryId:id
    }

    axios
      .post("/api/common/email",body)
      .then((response) => {
        console.log(response.data);
        message.success("Reminder Mail sent successfully");
        // setLoading(false);
        // setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        // setLoading(false);
      });
  }


  if(loading){
    return <div className='loading-root'><Spin /></div>
  }



    return (
      <div className="tracking-itinerary-container">
        <Modal
        title="Share Itinerary"
        visible={shareItineraryModal}
        onOk={()=>{
          const email = shareEmail.split(',');
          const body={
            type:"itinerary-invite",
            email:email,
            itineraryId:id,
            url:inviteUrl
          }
          console.log(body)
          axios
          .post("/api/common/email",body)
          .then((response) => {
            console.log(response.data);
            message.success("Invite Mail sent successfully");
            // setLoading(false);
            // setIsChangePwdVisible(false);
          })
          .catch((error) => {
            console.log(error);
            message.error(error?.response?.data?.message);
            // setLoading(false);
          });
          
        }}
        onCancel={()=>setShareItineraryModal(false)}
      >
        <Form>
        <Form.Item>
        <label>Link</label>
        <Input disabled 
          style={{backgroundColor:"white",color:"black"}}
          value={inviteUrl} >
        </Input>
        </Form.Item>

        
        <div>
        <Form.Item name="email">
        <label> Email </label>
        <TextArea
          onChange={(e)=>setshareEmail(e.target.value)}
          placeholder="Seperate email addresses by coma"
          rows={4}
        ></TextArea>
        </Form.Item>
        </div>
        </Form>
      </Modal>

        <div className="top-info-container" style={{backgroundImage: `url(${data.coverPhoto})`}}>
          <Row>
            <Col
              lg={{ span: 12 }}
              sm={{ span: 24 }} className="top-info-left pr-2">
              <div className="d-flex">
                <Tag color="default">ID:  {data.tourId}</Tag>
                <Tag color="default">Tour Confirmed</Tag>
              </div>
              <hr style={{ color: "#fff" }} />
              <h1 className="title">{data.name}</h1>
              <p className="text-muted">{data.description}</p>
              {/* <div className="d-flex">
                <Button type="primary" size="large" shape="round">Get Itinerary</Button>
                <Button type="primary" size="large" shape="round">Live Tracking</Button>
                <Button type="primary" size="large" shape="round">Send Invite Link</Button>
              </div> */}
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 12 }} className="top-info-right">
              <Row gutter={16}>
                <Col span={12}>
                  <Card bordered={false} style={{ backgroundColor: "#448bff" }}>
                    <h2 style={{fontSize: 18}}><b>Money Collected</b></h2>
                    <p>
                      <Space>
                        {"₹"}
                        {data.price*totalStudent}
                      </Space>
                    </p>
                    <p>Collection as per {data.price} / Student</p>
                    <Button shape="round">Go To Student CRM</Button>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false} style={{ backgroundColor: "#31c971" }}>
                    <h2 style={{fontSize: 18}}><b>Students confirmed</b></h2>
                    <p>
                      <Space>
                        <LineChartOutlined />
                        {totalStudent}
                      </Space>
                    </p>
                    <p>Use invite link to increase the count.</p>
                    <Button shape="round" onClick={()=>showModal()}>Send invite link</Button>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="table-container">
          <Form>
            <Form.Item label="Entry Type">
              <Radio.Group
                value={userTypes}
                onChange={e => {
                //  setuserTypes(e.target.value);
                  console.log("val",e.target.value);
                  axios.get(`/api/itinerarydetails/${id}/${e.target.value}`).then(response=>{
                    console.log("itinerarydetails")
                    console.log(response.data)
                    setStudent(response.data.data)
                  }).catch(error=>{
                    console.log(error)
                    message.error(error?.response?.data?.message || "Something went wrong.");
                  })
                //  this.setState({ top: e.target.value });
                }}
              >
                <Radio.Button value="student">Student</Radio.Button>
                <Radio.Button value="coordinator">Coordinator</Radio.Button>
                <Radio.Button value="department_head">Department head</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {/* <Form.Item label="Installment Type">
              <Radio.Group
                // value={this.state.bottom}
                // onChange={e => {
                //   this.setState({ bottom: e.target.value });
                // }}
              >
                <Radio.Button value="bottomLeft">Payment Completed</Radio.Button>
                <Radio.Button value="bottomCenter">Padding</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
          </Form>
          <Table rowSelection={false} columns={columns} dataSource={student} />
        </div>
      </div>
    )
  }


  export default TrackingItinerary;