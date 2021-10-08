import "./itinerary.less";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Button, message, Modal, Form, Input, Checkbox, Radio } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OperationModal from './OperationModal';
import { connect } from "react-redux";

import ItineraryCard from "../../components/ItineraryCard";
import axios from "axios";

const sortMenu = (
  <Menu>
    <Menu.Item key="1">Date</Menu.Item>
    <Menu.Item key="2">Price</Menu.Item>
    <Menu.Item key="3">Duration</Menu.Item>
  </Menu>
);

 function Itineray(props) {
  const {type} = props.user

  const [itinerayList, setItinerayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    getItinerayList();
    console.log("calle d effect");
  }, []);

  const getItinerayList = () => {
    setLoading(true);
    axios
      .get("/api/itinerary")
      .then((response) => {
        setLoading(false);
        setItinerayList(response.data.data);
      })
      .catch((error) => {
        message.error("Something went wrong.");
      });
  };

  const addItineray = (data) => {
    setAddLoading(true);
    console.log(data)
    axios
      .post("/api/itinerary/create", data)
      .then((response) => {
        // setLoading(false);
        // setItinerayList(response.data.data);
        getItinerayList();
        setIsModalVisible(false)
        setAddLoading(false)
      })
      .catch((error) => {
        setAddLoading(false)
        // message.error("something went wrong please try again.");
         // message.error('Adding failed, please try again!');
        message.error(error?.response?.data?.message || "Adding failed, please try again!");
      });
  };


  const handleCancel = () => {
    // setAddBtnblur();
    setIsModalVisible(false);
  };

  const deleteItinerary = (item) => {
    axios.delete("api/itinerary/delete",{data:{id:item._id}})
    .then((response) => {
      getItinerayList();
     // setLoading(false);
     // setData(response.data.data);
     
    })
    .catch((error) => {
      console.log(error)
      message.error("something went wrong please try again.");
    });
  }

  const handleDone = () => {
    // setAddBtnblur();
    // setDone(false);
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    // const id = current ? current.id : null;
    // console.log(values);
    // const hide = message.loading('Adding');

    // try {
    //   if (id == null) {
    //     await addRule(values);
    //   } else {
    //     await updateRule({ ...values, id });
    //   }
    //   hide();
    //   message.success('Added successfully');
    //   setAddBtnblur();
    //   // setDone(true);
    //   setIsModalVisible(false);
    //   setSelectedRows([]);
    //   actionRef.current?.reloadAndRest?.();
    // } catch (error) {
    //   hide();
      // // message.error('Adding failed, please try again!');
      // message.error(error.response.data.message);
    // }
  };

  return (
    <div className="ititneray-root">
     
     <OperationModal
        // done={done}
        current={null}
        addLoading={addLoading}
        visible={isModalVisible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={addItineray}
      />

      <div className="filter-container d-flex " style={{justifyContent:'space-between'}}>
        {/* <Link to="/itinerary/create" className="ant-btn">
          Create Itineray
        </Link> */}
       { ['agent','agency'].includes(type) && <Link to="/itinerary/create" className="ant-btn">Create Itineray</Link>}
        {/* <Dropdown overlay={sortMenu}>
          <Button>
            Sort By <DownOutlined />
          </Button>
        </Dropdown> */}

{/* <Radio.Group
                // value={this.state.top}
                // onChange={e => {
                //   this.setState({ top: e.target.value });
                // }}
              >
                <Radio.Button value="topLeft">Student</Radio.Button>
                <Radio.Button value="topCenter">Faculty</Radio.Button>
                <Radio.Button value="topRight">SS Co-ordinator</Radio.Button>
                <Radio.Button value="none">Late Student</Radio.Button>
              </Radio.Group> */}
      </div>

      <div style={{ marginTop: 20 }}>
        {itinerayList && itinerayList.map((item, key) => (
          <ItineraryCard key={key} type={type} item={item} history={props.history} deleteItemEvent={deleteItinerary} />
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Itineray);
