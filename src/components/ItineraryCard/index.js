import "./itinerary-card.less";
import "../../assets/less/common.less";
import React from "react";
import { Row, Col, Space, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  FullscreenOutlined,
  MoreOutlined
} from '@ant-design/icons'

const ItineraryCard = ({ item, type, key, deleteItemEvent }) => {

  return (
    <Row className="itinerary-card-container">
      <Col lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 24 }}>
        <img
          className="itinerary-card-img"
          src={
            item.coverPhoto ||
            "https://bestanimations.com/media/nature/1343039321nature-waterfall-animated-gif-6.gif"
          }
          alt={item.title}
        />
      </Col>
      <Col
        lg={{ span: 14 }}
        md={{ span: 14 }}
        sm={{ span: 24 }}
        className="itinerary-card-detail-wrapper"
      >
        <div className="id">{item.tourId}</div>
        <p className="title">{item.name}</p>
        <p className="text-muted">{item.intro}</p>
        <p>{item.description}</p>
      </Col>
      <Col
        lg={{ span: 6 }}
        md={{ span: 6 }}
        sm={{ span: 24 }}
        className="itinerary-card-info-wrapper"
      >
        <div style={{textTransform: 'capitalize'}}>
          <div>
            <strong>Destination: </strong> {item.place.map(o=>o.name).join(', ')}
          </div>
          <div>
            <strong>Duration: </strong> {item.duration}
          </div>
          <div>
            <strong>Month Of Travel: </strong> {item.month}
          </div>
          <div >
            <strong>Status: </strong>  { item.collegeId ?  "approved by "+ item.collegeId.name : item.status}
          </div>
          <div>
            <strong>Quotation : </strong> {item.price} INR
          </div>
        </div>
        <div className="more-info-btn">
          <Space size="middle">
            {["college", "agent","agency"].includes(type) && (
              <>
                <Link
                  to={"/itinerary/detail/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                 More Info
                </Link>
                {/* { type=="" && <Link to="/itinerary/compare/:id" className="ant-btn ant-btn-primary ant-btn-round">Compare</Link>} */}
                <Link
                  to={"/itinerary/tracking/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                   Live Tracking
                </Link>
              </>
            )}

            {["agent","agency"].includes(type) && (
              <>
                <Link
                  to={"/itinerary/edit/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                 <EditOutlined/>
                </Link>
              </>
            )}

            {["agent","agency"].includes(type) && (
              <>
                <Link
                  onClick={()=>deleteItemEvent(item)}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                 <DeleteOutlined/>
                </Link>
              </>
            )}


            {["student"].includes(type) && (
              <>
                <Link
                  to={"/itinerary/detail/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                  More Info
                </Link>

                <Link
                  to={"/itinerary/join/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                  Join
                </Link>
                {/* { type=="" && <Link to="/itinerary/compare/:id" className="ant-btn ant-btn-primary ant-btn-round">Compare</Link>} */}
              </>
            )} {["coordinator","department"].includes(type) && (
              <>
                <Link
                  to={"/itinerary/detail/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                  More Info
                </Link>

                <Link
                  to={"/itinerary/tracking/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                  Live Tracking
                </Link>

                <Link
                  to={"/itinerary/join/" + item._id}
                  className="ant-btn ant-btn-primary ant-btn-sm ant-btn-round"
                >
                  Join
                </Link>
                {/* { type=="" && <Link to="/itinerary/compare/:id" className="ant-btn ant-btn-primary ant-btn-round">Compare</Link>} */}
              </>
            )}
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default ItineraryCard;
