import "./profile.less";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Row,
  Col,
  message,
  Switch,
  Space,
  Radio,
  Table,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Heading from "../../components/Heading";

function Join(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [status, setStatus] = useState(false);
  const [paymentType, setpaymentType] = useState(null);
  const [paymentDetails, setpaymentDetails] = useState([])
  const [price, setprice] = useState(null);
  const { id } = props.match.params;
  const { user } = props.auth;

  const getItinerary = () => {
    setLoading(true);
    console.log("id is here", id);
    axios
      .get(`/api/itinerary/${id}`)
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

  const getItineraryDetails = () => {
    setLoading(true);
    console.log("id is here", id);
    axios
      .get(`/api/itinerarydetails/${id}`)
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
       // let data = response.data.data.filter(d => d.userId._id==user._id)
        //console.log(data)
        //data.length!==0 ? setStatus(false) : setStatus(true);
        setprice(response.data.data ? response.data.data.emiValue : null );
        setpaymentDetails(response.data.data ? response.data.data.details : [])
        setpaymentType(response.data.data ? response.data.data.payment : null);
        setLoading(false);
        // setItinerayList(response.data.data);
      })
      .catch((error) => {
        console.log(error)
        message.error(
          error?.response?.data?.message || "Something went wrong."
        );
        // message.error();
      });
  };

  useEffect(() => {
    getItinerary();
    getItineraryDetails();
    console.log(status)
  }, []);


  const choosePaymentType = (values) => {
    setLoading(true);
    const updateBody = {
      ...values,
      id:id
    }
    console.log(updateBody)
    axios.post("api/itinerarydetails/join",updateBody)
      .then(response => {
        setpaymentType(values.type);
        setprice(response.data.data.emiValue)
        setpaymentDetails(response.data.data.details)
        setLoading(false);
      })
      .catch((error) => {
        message.error(
          error?.response?.data?.message || "Something went wrong."
        );
        setLoading(false)
        // message.error();
      });
  }

  const joinItinerary = async (values) => {

    console.log(values)
    console.log(price)
    const options = {
      key: "rzp_test_gYYloUQPBFTyHT",
      amount: price * 100, //  = INR 1
      name: "Sailsmith",
      description: "some description",
      image: "/assets/logo_solo.png",
      // order_id: "order_9A33XWu170gUtm",
      handler:  async (response) => {
        console.log(response);

        try{

          // let response = await axios.get("/api")
    
          let res = await axios.post('/api/itinerarydetails/pay', {id, payment: "success", paymentId : response.razorpay_payment_id,type:values.type });
          console.log(res)
          setpaymentDetails(res.data.data.details)
          // props
          message.success("Join Itinerary Successfully.");
    
        }catch(e){
          console.log(e)
          return;
        }

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        ...user,
      },
      notes: {
        address: "some address",
      },
      theme: {
        color: "#1890ff",
        hide_topbar: false,
      },
    };

    var rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log(response);
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp.open();
  };

  const leaveItinerary = () => {
    setLoading(true);
    console.log("id is here", id);
    axios
      .post(`/api/itinerarydetails/leave`,{id})
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
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

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  const columns = [
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "33%",
    },
    {
      title: "Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: "33%",
    },
    {
      title: "ID",
      dataIndex: "paymentId",
      key: "paymentId",
      width:"33%"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width:"33%"
    },

  ]

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }

  return (
    <div className="join-container">
      <div style={{margin: 'auto'}}>
        <Heading value={data.name} style={{ marginBottom: 15 }} />

        <p>
         {data.description}
        </p>

        <div
          style={{ margin: "auto", width: "max-content", textAlign: "left", marginBottom: 20 }}
        >
         <span><b> Price: </b></span> {data.price} INR
           
        </div>
        {/* { status ? <Button type="primary" shape="round" onClick={joinItinerary}>
          Join Now
        </Button>:
        <Button type="primary" shape="round" onClick={leaveItinerary}>
        Leave Now
      </Button>} */}
      {/* { status ? <Button type="primary" shape="round" onClick={joinItinerary}>
          Join Now
        </Button>:
        <></>} */}
       {!paymentType && <Form onFinish={choosePaymentType}>
            <Form.Item label="Entry Type" name="type">
              <Radio.Group
              >
                <Radio.Button value="full">Pay Now</Radio.Button>
                <Radio.Button value="emi">Pay Using EMI</Radio.Button>        
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" shape="round">Join</Button>
            </Form>}
            <div>
            {paymentType && `You have chhose ${paymentType} method for payment`}
            </div>
            <div>
            
            {paymentType=="full" && paymentDetails.length<1&& <Button type="primary" onClick={joinItinerary} shape="round">Pay</Button>}
            {paymentType=="emi" && paymentDetails.length<6&& <Button type="primary" onClick={joinItinerary} shape="round">Pay</Button>}
            </div>

            <div style={{ marginTop: 20 }}>
              <Table dataSource={paymentDetails} pagination={true} columns={columns} />
            </div>
      </div>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
