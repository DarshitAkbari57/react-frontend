import './detailItinerary.less';
import '../../assets/less/common.less';
import React, { Component, useState, useEffect } from 'react'
import data from '../../dummyData/detailed-itinerary.json'
import { 
  Row, 
  Col, 
  Button, 
  Steps, 
  Carousel, 
  Tabs, 
  Collapse, 
  Space , message, Spin
} from 'antd';
import {
  PhoneOutlined,
  MoreOutlined,
  StarOutlined,
  UserOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  CompassOutlined,
  FileProtectOutlined,
  MessageOutlined
} from '@ant-design/icons';
import axios from 'axios';
const { Step } = Steps;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const DetailItinerary = (props) =>{


  const [itinerary,setItinerary] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = props.match.params;

  useEffect(() => {
    getItineraryDetails();
  }, []);

  const getItineraryDetails = () => {
    setLoading(true);
    console.log("id is here",id)
    axios
      .get(`/api/itinerary/${id}`)
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
        setItinerary(response.data.data)
        setLoading(false)
       // setItinerayList(response.data.data);
      })
      .catch((error) => {
        message.error(error?.response?.data?.message || "Something went wrong.");
        // message.error();
      });
  };
  
  
  if(loading){
    return <div className='loading-root'><Spin /></div>
  }

    return (
      <div className="detail-itinerary-container">
        <div className="detail-itinerary-info-container">
          <Row>
            <Col
              lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left">
              <Row>
                <Col lg={{ span: 24 }}
                  sm={{ span: 12 }} >
                  <Row className="mb-1">
                    <Col span={24}><span className="title">Operator</span></Col>
                    <Row className="pt-1">
                      <Col
                        lg={{ span: 4 }}
                        sm={{ span: 24 }}>
                        <img
                          className="operator-img"
                          src={itinerary.agencyId.logo}
                          alt={itinerary.agencyId.name}
                        />
                      </Col>
                      <Col
                        sm={{ span: 24 }}
                        lg={{ span: 20 }} className="pl-1">
                        <span>{itinerary.agencyId.name}</span>
                        {/* <div className="text-fade text-sm">
                          <IconText icon={StarOutlined} text={data.operator.ratting} /> | <IconText icon={UserOutlined
                          } text={data.operator.friends} />
                        </div> */}
                      </Col>
                    </Row>
                  </Row>
                </Col>
                <Col lg={24} className="mb-3" style={{marginTop: 5}}>
                  <Button onClick={()=>{
                    props.history.push("/message?to="+itinerary.agencyId.userId)
                  }} icon={<MessageOutlined />}>Ask Question</Button>
                </Col>
                <Col lg={{ span: 24 }}
                  sm={{ span: 12 }} >
                  <Row className="mb-3">
                    <Col span={24}><span className="title">Quotation</span></Col>
                    <Col span={24} className="pt-1">
                      <span>₹{itinerary.price} Inc. GST</span>
                      <div className="text-fade text-sm">Per Student</div>
                      {/* <Button shape="round">Negotiate Quote</Button> */}
                    </Col>
                  </Row>
                </Col>
                {/* <Col lg={{ span: 24 }}
                  sm={{ span: 12 }} >
                  <Row className="mb-3">
                    <Col span={24}><span className="title">Customise</span></Col>
                    <Col lg={{ span: 4 }}
                      sm={{ span: 24 }} className="pt-1">
                      <img
                        className="operator-img"
                        src={data.customise.img}
                        alt={data.customise.name}
                      />
                    </Col>
                    <Col sm={{ span: 24 }}
                      lg={{ span: 20 }} className="pl-1">
                      <span>{data.customise.name}</span>
                      <div className="text-fade text-sm">{data.customise.position}</div>
                    </Col>
                    <Col span={24} className="customise-btn-wrapper pt-1">
                      <Button shape="round">Connect</Button>
                      <Button className="dark-icon" shape="circle" icon={<PhoneOutlined />} size="middle"></Button>
                      <Button className="dark-icon" shape="circle" icon={<MoreOutlined />} size="middle"></Button>
                    </Col>
                  </Row>
                </Col> */}
              </Row>
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 20 }} className="info-right">
              <Row className="mb-3">
                <Col lg={{ span: 8 }}
                  sm={{ span: 24 }} className="pl-2">
                  <p className="itinerary-title">{itinerary.name}</p>
                  <p className="text-muted">{itinerary.description}</p>
                  {/* <div className="co-ordinators-wrapper">
                    <span className="text-muted" style={{fontWeight: 'bold', }}>co-ordinators</span>
                    <div className="co-ordinators-user-wrapper">
                      <Space>
                      <img
                        className="user-img"
                        src="/assets/img/a8.jpg"
                        alt=""
                      />
                      <img
                        className="user-img"
                        src="/assets/img/a8.jpg"
                        alt=""
                      />
                      <img
                        className="user-img"
                        src="/assets/img/a8.jpg"
                        alt=""
                      />
                      </Space>
                    </div> */}
                  {/* </div> */}
                </Col>
                <Col lg={{ span: 16 }}
                  sm={{ span: 24 }} className="pl-2">
                  <Row>
                    <Col span={24} className="detail-img-wrapper">
                      <img
                        className="detail-img"
                        src={itinerary.coverPhoto}
                        alt=""
                      />
                    </Col>
                    {/* <Col span={12} className="detail-img-wrapper">
                      <img
                        className="detail-img"
                        src="/assets/img/b15.jpg"
                        alt=""
                      />
                    </Col>
                    <Col span={12} className="detail-img-wrapper">
                      <img
                        className="detail-img"
                        src="/assets/img/b17.jpg"
                        alt=""
                      />
                    </Col> */}
                  </Row>
                </Col>
              </Row>
              <Row className="mb-3" style={{textTransform: 'capitalize'}}>
                <Col lg={{ span: 8 }}
                  sm={{ span: 24 }} className="pl-2">
                  {/* <p className="text-muted">{data.intro}</p> */}
                </Col>
                <Col lg={{ span: 4 }}
                  sm={{ span: 12 }} className="align-center">
                  <strong><IconText icon={InfoCircleOutlined} text="Days" /></strong>
                  <p className="text-muted">{itinerary.duration}</p>
                </Col>
                <Col lg={{ span: 4 }}
                  sm={{ span: 12 }} className="align-center">
                  <strong><IconText icon={CalendarOutlined} text="Destination" /></strong>
                  <p className="text-muted">{itinerary.place.map(o=>o.name).join(', ')}</p>
                </Col>
                <Col lg={{ span: 4 }}
                  sm={{ span: 12 }} className="align-center">
                  <strong><IconText icon={CompassOutlined} text="Month of Travel" /></strong>
                  <p className="text-muted">{itinerary.month}</p>
                </Col>
                <Col lg={{ span: 4 }}
                  sm={{ span: 12 }} className="align-center">
                  <strong><IconText icon={FileProtectOutlined} text="Status" /></strong>
                  <p className="text-muted">{data.status}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="itinerary-info-container">
          <Row>
            <Col lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left sticky-info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Itinerary</span></Col>
                <Col span={24}>
                  <span>Route in-short</span>
                  <div className="pt-1">
                    <Steps progressDot size="small" current={1} direction="vertical">
                      {itinerary.days.map((o, key) => (
                        <Step title={o.name} key={key} description={o.description} />
                      ))}
                    </Steps>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={{ span: 20 }}
              sm={{ span: 24 }} className="info-right">
              <div className="container use-case-section">
                <div>
                  {
                   itinerary.days.map((day_wise, index) => (
                      <>
                        <Row>
                          <Col
                            className={`ptb-1 pl-4 border ${(index % 2 === 0) ? (index === 0) ? "border-left" : "border-left border-top support-margin border-radius-t-l" : ''}`}
                            sm={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                          >
                            <div className="use-case-section-details">
                              <h3>{day_wise.name}</h3>
                              <h5>{day_wise.date}</h5>
                              <p>{day_wise.description}</p>
                            </div>
                          </Col>
                          <Col
                            className={`ptb-1 pl-4 border ${(index % 2 === 1) ? "border-right border-top support-margin border-radius-t-r" : ''}`}
                            sm={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                          >
                            <div className="img-div">
                              <img src={day_wise.image} alt="" width="100%" />
                            </div>
                          </Col>
                          <Button
                            className={`day-btn ${(index % 2 === 0) ? 'day-btn-left' : 'day-btn-right'}`}
                            type="primary"
                            shape="round"
                            size="large"
                          >Day {index + 1}</Button>
                        </Row>
                        <Row>
                          <Col
                            className={`ptb-1 pl-4 border ${(index === data.day_wise.length - 1) ? "border-bottom" : ''} ${(index % 2 === 0) ? "border-bottom border-left border-radius-b-l" : ''}`}
                            sm={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                          >
                            <div className="img-div">
                              <img src={day_wise.image} alt="" width="100%" />
                            </div>
                          </Col>
                          <Col
                            className={`ptb-1 pl-4 border ${(index === data.day_wise.length - 1) ? "border-bottom" : ''} ${(index % 2 === 1) ? "border-right border-bottom support-margin border-radius-b-r" : ''}`}
                            sm={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                          >
                            <Row className="points" style={{textTransform: 'capitalize'}}>
                              {day_wise.journey ?
                                <Col span={12}>
                                  <strong>Journey</strong>
                                  <p className="text-muted">{day_wise.journey}</p>
                                </Col>
                                : null}
                              {day_wise.stay ?
                                <Col span={12}>
                                  <strong>Stay</strong>
                                  <p className="text-muted">{day_wise.stay}</p>
                                </Col>
                                : null}
                              {day_wise.highlight ?
                                <Col span={12}>
                                  <strong>Highlight</strong>
                                  <p className="text-muted">{day_wise.highlight}</p>
                                </Col>
                                : null}
                              {day_wise.meals ?
                                <Col span={12}>
                                  <strong>Meals</strong>
                                  <p className="text-muted">{day_wise.meals}</p>
                                </Col>
                                : null}
                              {day_wise.more ?
                                <Col span={12}>
                                  <strong>What's More</strong>
                                  <p className="text-muted">{day_wise.more}</p>
                                </Col>
                                : null}
                              {day_wise.sightseeing ?
                                <Col span={12}>
                                  <strong>Sightseeing</strong>
                                  <p className="text-muted">{day_wise.sightseeing}</p>
                                </Col>
                                : null}
                              {day_wise.note ?
                                <Col span={12}>
                                  <strong>Note</strong>
                                  <p className="text-muted">{day_wise.note}</p>
                                </Col>
                                : null}
                            </Row>
                          </Col>
                        </Row>
                      </>
                    ))
                  }
                </div>
              </div>

            </Col>
          </Row>
        </div>

        <div className="place-container">
          <Row>
            <Col lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Places</span></Col>
                <Col span={24}><span>Check out what all places you'd visit.</span></Col>
              </Row>
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 20 }} className="info-right">
              <div className="carousel-container">
                <Carousel autoplay>
                  {itinerary.place && itinerary.place.map((place,key) => (
                    <div className="carousel-item-container" key={key}>
                      <div className="carousel-image">
                        <img
                          src={place.image}
                          alt={place.name}
                        />
                      </div>
                      <div className="carousel-detail">
                        <h3 className="title">{place.name}</h3>
                        <p className="description">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Exclusivity</span></Col>
                <Col span={24}><span>{data.exclusivity.intro}</span></Col>
              </Row>
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 20 }} className="info-right">
              <Row>
                <Col lg={{ span: 8 }}
                  sm={{ span: 24 }} className="pl-2">
                  <h2>{data.exclusivity.title}</h2>
                  <p className="text-muted">{data.exclusivity.description}</p>
                </Col>
                <Col lg={{ span: 16 }}
                  sm={{ span: 24 }} className="pl-2">
                  <Row>
                    {itinerary.exclusive.map(row => (
                      <Col lg={{ span: 8 }}
                        sm={{ span: 24 }} className="detail-img-wrapper">
                        <img
                          className="detail-img"
                          src={row.image}
                          alt={row.name}
                        />
                        <span className="detail-img-title">{row.name}</span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Accommodation</span></Col>
                <Col span={24}><span>{data.hotel.intro}</span></Col>
              </Row>
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 20 }} className="info-right">
              <Row>
                <Col lg={{ span: 8 }}
                  sm={{ span: 24 }} className="pl-2">
                  <h2>{data.hotel.title}</h2>
                  <p className="text-muted">{data.hotel.description}</p>
                </Col>
                <Col lg={{ span: 16 }}
                  sm={{ span: 24 }} className="pl-2">
                  <Row>
                    {itinerary.accomodation.map(row => (
                      <Col lg={{ span: 8 }}
                        sm={{ span: 24 }} className="detail-img-wrapper">
                        <img
                          className="detail-img"
                          src={row.image}
                          alt={row.name}
                        />
                        <span className="detail-img-title">{row.description}</span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col lg={{ span: 4 }}
              sm={{ span: 24 }} className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Transport</span></Col>
                <Col span={24}><span>{data.transport.intro}</span></Col>
              </Row>
            </Col>
            <Col sm={{ span: 24 }}
              lg={{ span: 20 }} className="info-right">
              <Row>
                <Col lg={{ span: 8 }}
                  sm={{ span: 24 }} className="pl-2">
                  <h2>{data.transport.title}</h2>
                  <p className="text-muted">{data.transport.description}</p>
                </Col>
                <Col lg={{ span: 16 }}
                  sm={{ span: 24 }} className="pl-2">
                  <Row>
                    {itinerary.transport.map(row => (
                      <Col lg={{ span: 8 }}
                        sm={{ span: 24 }} className="detail-img-wrapper">
                        <img
                          className="detail-img"
                          src={row.image}
                          alt={row.name}
                        />
                        <span className="detail-img-title">{row.name}</span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col
              lg={{ span: 4 }}
              sm={{ span: 24 }}
              className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">Terms & Condition</span></Col>
                <Col span={24}><span>{data.terms_and_condition.intro}</span></Col>
              </Row>
            </Col>
            <Col

              sm={{ span: 24 }}
              lg={{ span: 20 }}
              className="info-right">
              <Row>
                <Col
                  lg={{ span: 8 }}
                  sm={{ span: 24 }}
                  className="pl-2">
                  <h2>{data.terms_and_condition.title}</h2>
                  <p className="text-muted">{data.terms_and_condition.description}</p>
                </Col>
                <Col
                  lg={{ span: 16 }}
                  sm={{ span: 24 }}
                  className="pl-2">
                  <Tabs tabPosition="left">
                    {itinerary.tAndc.map((row, index) => (
                      <TabPane tab={row.term} key={index}>{row.conditions}</TabPane>
                    ))}
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col
              lg={{ span: 4 }}
              sm={{ span: 24 }}
              className="info-left">
              <Row className="mb-3">
                <Col span={24}><span className="title">FAQ</span></Col>
                <Col span={24}><span>{data.faq.intro}</span></Col>
              </Row>
            </Col>
            <Col
              sm={{ span: 24 }}
              lg={{ span: 20 }}
              className="info-right">
              <Row>
                <Col
                  lg={{ span: 8 }}
                  sm={{ span: 24 }}
                  className="pl-2">
                  <h2>{data.faq.title}</h2>
                  <p className="text-muted">{data.faq.description}</p>
                </Col>
                <Col
                  lg={{ span: 16 }}
                  sm={{ span: 24 }}
                  className="pl-2">
                  <Collapse bordered={false} defaultActiveKey={['0']}>
                    {itinerary.qa.map((row, index) => (
                      <Panel header={row.q} key={index} className="custom-panel-style">
                        <p>{row.a}</p>
                      </Panel>
                    ))}
                  </Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

      </div>
    )
  }

export default DetailItinerary;
