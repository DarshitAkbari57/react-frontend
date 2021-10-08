import "./create-itinerary.less";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  Steps,
  message,
  DatePicker,
  Upload,
  Space,
  Spin,
  Row,
  Col,
} from "antd";
import {
  QuestionCircleOutlined,
  UploadOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DynamicFields from "../../components/DynamicFields";
import Heading from "../../components/Heading";
import axios from "axios";

const { Dragger } = Upload;
const { Option } = Select;
const { Step } = Steps;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const CreateItinerary = (props) => {
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(false);
  const [data, setData] = useState({});
  const { id, type } = props.match.params;
  let [place, setPlaces] = useState([{}]);
  let [exclusive, setExclusive] = useState([{}]);
  let [accomodation, setaccomodation] = useState([{}]);
  let [transport, setTransport] = useState([{}]);
  let [terms, setTerms] = useState([{}]);
  let [faq, setFaq] = useState([{}]);
  let [days, setDays] = useState([{}]);

  const [form] = Form.useForm();

  useEffect(() => {
    type !== "create" && getItineraryDetails();
  }, []);

  const getItineraryDetails = () => {
    setLoading(true);
    console.log("id is here", id);
    axios
      .get(`/api/itinerary/${id}`)
      .then((response) => {
        // setLoading(false);
        console.log(response.data.data);
        setData(response.data.data);
        setPlaces(response.data.data.place ? response.data.data.place : [{}]);
        setExclusive(
          response.data.data.exclusive ? response.data.data.exclusive : [{}]
        );
        setaccomodation(
          response.data.data.accomodation
            ? response.data.data.accomodation
            : [{}]
        );
        setDays(response.data.data.days ? response.data.data.days : [{}]);
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

  const onFromSubmit = (values) => {
    setAddLoading(true);
    console.log(values, exclusive);
    values = {
      ...values,
      coverPhoto: coverPhoto,
      place,
      exclusive,
      accomodation,
      days,
      id,
      tAndc: terms,
       qa: faq,
       transport,
    };

    switch (type) {
      case "create": {
        axios
          .post("/api/itinerary/create", values)
          .then((response) => {
            props.history.goBack();
            setAddLoading(false);
          })
          .catch((error) => {
            setAddLoading(false);
            message.error(
              error?.response?.data?.message ||
                "Adding failed, please try again!"
            );
          });
        break;
      }

      case "edit": {
        axios
          .put("/api/itinerary/update", values)
          .then((response) => {
            props.history.goBack();
            setAddLoading(false);
          })
          .catch((error) => {
            setAddLoading(false);
            message.error(
              error?.response?.data?.message ||
                "Adding failed, please try again!"
            );
          });
        break;
      }
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const uploadCoverProps = {
    name: "image",
    // multiple: false,
    action: axios.defaults.baseURL + "/api/common/upload",
    onChange({ file, fileList }) {
      // const { status } = info.file;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
      const { status, response } = file;
      // console.log(files);

      if (status === "done") {
        // let fileL = expImages;
        console.log(response.data);
        // fileL.push(response.data[0].url);
        console.log(response.data.Location);
        setCoverPhoto(response.data.Location);
        // setCoverImg(response.data[0].url);
        // seAvatar(fileL);
      }

      if (status == "error") {
        message.error(response?.message || "Something went wrong.");
      }
    },
  };

  if (loading) {
    return (
      <div className="loading-root">
        <Spin />
      </div>
    );
  }

  return (
    <div className="create-itinerary-container">
      <Heading value={`${type} Itinerary`} style={{ marginBottom: 20, textTransform: 'capitalize' }} />
      <Form
        {...layout}
        form={form}
        initialValues={data}
        name="control-hooks"
        onFinish={onFromSubmit}
      >
        <Form.Item wrapperCol={24}>
          <Dragger {...uploadCoverProps} maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item name="tourId" label="Tracking ID"  rules={[{ required: true }]}>
          <Input placeholder="like IT_MARCH12" />
        </Form.Item><Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="month"
          label="Month"
          wrapperCol={12}
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Month of Travel"
            optionFilterProp="month"
          >
            <Option value="january">January</Option>
            <Option value="february">February</Option>
            <Option value="march">March</Option>
            <Option value="april">April</Option>
            <Option value="may">May</Option>
            <Option value="june">June</Option>
            <Option value="july">July</Option>
            <Option value="august">August</Option>
            <Option value="september">September</Option>
            <Option value="october">October</Option>
            <Option value="november">November</Option>
            <Option value="december">December</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="duration"
          wrapperCol={12}
          label="Duration (in days)"
          rules={[{ required: true }]}
        >
          <Input placeholder="like 15" type={"number"} />
        </Form.Item>
        <Form.Item
          name="price"
          wrapperCol={12}
          label="Price"
          rules={[{ required: true }]}
        >
          <Input type={"number"} placeholder="in INR" />
        </Form.Item>

        <div className="place-root">
          <Heading value={"Place"} />
          {place.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div>
                  <Upload
                    name="profile"
                    listType="picture-card"
                    maxCount={1}
                    className="place-img"
                    action={axios.defaults.baseURL + "/api/common/upload"}
                    name={"image"}
                    onChange={({ file, fileList }) => {
                      // const { status, response } = file;

                      // if (status === "done") {
                      //   seAvatar(response.data.Location)
                      // }

                      // if (status == "error") {
                      //   message.error(
                      //     response?.message || "Something went wrong."
                      //   );
                      // }
                      const { status, response } = file;

                      if (status === "done") {
                        // let fileL = expImages;
                        console.log(response.data);
                        // fileL.push(response.data[0].url);
                        console.log(response.data.Location);
                        place[index] = {
                          ...place[index],
                          image: response.data.Location,
                        };
                        setPlaces([...place]);
                        console.log(place);
                        // setCoverImg(response.data[0].url);
                        // seAvatar(fileL);
                      }
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                  <Button
                    onClick={() => {
                      place = place.filter((o, ind) => ind != index);
                      if (place.length === 0) {
                        place = [{}];
                      }
                      setPlaces([...place]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.name}
                      onChange={(e) => {
                        place[index] = {
                          description: place[index].description,
                          name: e.target.value,
                        };
                        setPlaces([...place]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.description}
                      onChange={(e) => {
                        place[index] = {
                          ...place[index],
                          description: e.target.value,
                        };
                        setPlaces([...place]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                place.push({});
                setPlaces([...place]);
              }}
            >
              + Add Place
            </Button>
          </div>
        </div>

        <div className="place-root">
          <Heading value={"Exclusivity"} />
          {exclusive.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div>
                  <Upload
                    name="profile"
                    listType="picture-card"
                    maxCount={1}
                    className="place-img"
                    action={axios.defaults.baseURL + "/api/common/upload"}
                    name={"image"}
                    onChange={({ file, fileList }) => {
                      // const { status, response } = file;

                      // if (status === "done") {
                      //   seAvatar(response.data.Location)
                      // }

                      // if (status == "error") {
                      //   message.error(
                      //     response?.message || "Something went wrong."
                      //   );
                      // }
                      const { status, response } = file;

                      if (status === "done") {
                        // let fileL = expImages;
                        console.log(response.data);
                        // fileL.push(response.data[0].url);
                        console.log(response.data.Location);
                        exclusive[index] = {
                          ...exclusive[index],
                          image: response.data.Location,
                        };
                        setExclusive(exclusive);
                        // setCoverImg(response.data[0].url);
                        // seAvatar(fileL);
                      }
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                  <Button
                    onClick={() => {
                      exclusive = exclusive.filter((o, ind) => ind != index);
                      if (exclusive.length == 0) {
                        exclusive = [{}];
                      }
                      setExclusive([...exclusive]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.name}
                      onChange={(e) => {
                        exclusive[index] = {
                          ...exclusive[index],
                          name: e.target.value,
                        };
                        setExclusive([...exclusive]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.description}
                      onChange={(e) => {
                        // console.log(e)
                        exclusive[index] = {
                          ...exclusive[index],
                          description: e.target.value,
                        };
                        setExclusive([...exclusive]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                exclusive.push({});
                setExclusive([...exclusive]);
              }}
            >
              + Add Exclusivity
            </Button>
          </div>
        </div>

        <div className="place-root">
          <Heading value={"Accomodation"} />
          {accomodation.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div>
                  <Upload
                    name="profile"
                    listType="picture-card"
                    maxCount={1}
                    className="place-img"
                    action={axios.defaults.baseURL + "/api/common/upload"}
                    name={"image"}
                    onChange={({ file, fileList }) => {
                      // const { status, response } = file;

                      // if (status === "done") {
                      //   seAvatar(response.data.Location)
                      // }

                      // if (status == "error") {
                      //   message.error(
                      //     response?.message || "Something went wrong."
                      //   );
                      // }
                      const { status, response } = file;

                      if (status === "done") {
                        // let fileL = expImages;
                        console.log(response.data);
                        // fileL.push(response.data[0].url);
                        console.log(response.data.Location);
                        accomodation[index] = {
                          ...accomodation[index],
                          image: response.data.Location,
                        };
                        setaccomodation(accomodation);
                        // setCoverImg(response.data[0].url);
                        // seAvatar(fileL);
                      }
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                  <Button
                    onClick={() => {
                      accomodation = accomodation.filter(
                        (o, ind) => ind != index
                      );
                      if (accomodation.length === 0) {
                        accomodation = [{}];
                      }
                      setaccomodation([...accomodation]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.name}
                      onChange={(e) => {
                        accomodation[index] = {
                          ...accomodation[index],
                          name: e.target.value,
                        };
                        setaccomodation([...accomodation]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.description}
                      onChange={(e) => {
                        // console.log(e)
                        accomodation[index] = {
                          ...accomodation[index],
                          description: e.target.value,
                        };
                        setaccomodation([...accomodation]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                accomodation.push({});
                setaccomodation([...accomodation]);
              }}
            >
              + Add accomodation
            </Button>
          </div>
        </div>

        <div className="place-root">
          <Heading value={"Transport"} />
          {transport.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div>
                  <Upload
                    name="profile"
                    listType="picture-card"
                    maxCount={1}
                    className="place-img"
                    action={axios.defaults.baseURL + "/api/common/upload"}
                    name={"image"}
                    onChange={({ file, fileList }) => {
                      // const { status, response } = file;

                      // if (status === "done") {
                      //   seAvatar(response.data.Location)
                      // }

                      // if (status == "error") {
                      //   message.error(
                      //     response?.message || "Something went wrong."
                      //   );
                      // }
                      const { status, response } = file;

                      if (status === "done") {
                        // let fileL = expImages;
                        console.log(response.data);
                        // fileL.push(response.data[0].url);
                        console.log(response.data.Location);
                        transport[index] = {
                          ...transport[index],
                          image: response.data.Location,
                        };
                        setTransport(transport);
                        // setCoverImg(response.data[0].url);
                        // seAvatar(fileL);
                      }
                    }}
                  >
                    {o.image == undefined && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                  <Button
                    onClick={() => {
                      transport = transport.filter(
                        (o, ind) => ind != index
                      );
                      setTransport([...transport]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.name}
                      onChange={(e) => {
                        transport[index] = { ...o, name: e.target.value };
                        setTransport([...transport]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.description}
                      onChange={(e) => {
                        // console.log(e)
                        transport[index] = {
                          ...o,
                          description: e.target.value,
                        };
                        setTransport([...transport]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                transport.push({});
                setTransport([...transport]);
              }}
            >
              + Add Transport
            </Button>
          </div>
        </div>

        <div className="place-root">
          {days.map((o, index) => {
            return (
              <>
              <Heading value={"Days "+ (index+1)} />

              <div className="item" key={index}>
                <div>
                  <Upload
                    name="profile"
                    listType="picture-card"
                    maxCount={1}
                    className="place-img"
                    action={axios.defaults.baseURL + "/api/common/upload"}
                    name={"image"}
                    onChange={({ file, fileList }) => {
                      const { status, response } = file;
                      if (status === "done") {
                        // console.log(response.data)
                        // console.log(response.data.Location)
                        days[index] = {
                          ...days[index],
                          image: response.data.Location,
                        };
                        setDays([...days]);
                      }
                    }}
                  >
                    {o.image == undefined && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}

                    {o.image != undefined && (
                      <div>
                        <div style={{ marginTop: 8 }}>
                          <img
                            src={o.image}
                            style={{ width: "100px", height: "100px" }}
                          ></img>
                        </div>
                      </div>
                    )}
                  </Upload>
                  <Button
                    onClick={() => {
                      days = accomodation.filter((o, ind) => ind != index);
                      if (days.length === 0) {
                        days = [{}];
                      }
                      setDays([...days]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.name}
                      onChange={(e) => {
                        days[index] = { ...days[index], name: e.target.value };
                        setDays([...days]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.description}
                      onChange={(e) => {
                        // console.log(e)
                        days[index] = {
                          ...days[index],
                          description: e.target.value,
                        };
                        setDays([...days]);
                      }}
                    />
                  </Form.Item>
                  <Row gutter={10}>
                    <Col lg={8} md={8} xs={24}>
                      <Form.Item label="Journey" wrapperCol={24} labelCol={24}>
                        <Input
                          value={o.journey}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              journey: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={8} xs={24}>
                      <Form.Item label="Note" wrapperCol={24} labelCol={24}>
                        <Input
                          value={o.note}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              note: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={8} md={8} xs={24}>
                      <Form.Item
                        label="Highlight"
                        wrapperCol={24}
                        labelCol={24}
                      >
                        <Input
                          value={o.highlight}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              highlight: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={8} xs={24}>
                      <Form.Item label="Stay" wrapperCol={24} labelCol={24}>
                        <Input
                          value={o.stay}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              stay: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={8} xs={24}>
                      <Form.Item label="Meals" wrapperCol={24} labelCol={24}>
                        <Input
                          value={o.meals}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              meals: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={8} xs={24}>
                      <Form.Item
                        label="Sightseeing"
                        wrapperCol={24}
                        labelCol={24}
                      >
                        <Input
                          value={o.sightseeing}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              sightseeing: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={24} md={24} xs={24}>
                      <Form.Item
                        label="What More"
                        wrapperCol={24}
                        labelCol={24}
                      >
                        <Input
                          value={o.whatmore}
                          onChange={(e) => {
                            days[index] = {
                              ...days[index],
                              whatmore: e.target.value,
                            };
                            setDays([...days]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  
                  </Row>
                </div>
              </div>
            </>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                days.push({});
                setDays([...days]);
              }}
            >
              + Add Days
            </Button>
          </div>
        </div>


        <div className="place-root">
          <Heading value={"Terms & Condition"} />
          {terms.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Name" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.term}
                      onChange={(e) => {
                        terms[index] = { ...o, term: e.target.value };
                        setTerms([...terms]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.conditions}
                      onChange={(e) => {
                        // console.log(e)
                        terms[index] = {
                          ...o,
                          conditions: e.target.value,
                        };
                        setTerms([...terms]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                terms.push({});
                setTerms([...terms]);
              }}
            >
              + Add Terms & Condition
            </Button>
          </div>
        </div>

  <div className="place-root">
          <Heading value={"FAQ"} />
          {faq.map((o, index) => {
            return (
              <div className="item" key={index}>
                <div style={{ width: "-webkit-fill-available" }}>
                  <Form.Item label="Question" wrapperCol={24} labelCol={24}>
                    <Input
                      value={o.q}
                      onChange={(e) => {
                        faq[index] = { ...o, q: e.target.value };
                        setFaq([...faq]);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Answer" wrapperCol={24} labelCol={24}>
                    <Input.TextArea
                      value={o.a}
                      onChange={(e) => {
                        // console.log(e)
                        faq[index] = {
                          ...o,
                          a: e.target.value,
                        };
                        setFaq([...faq]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                faq.push({});
                setFaq([...faq]);
              }}
            >
              + Add FAQ
            </Button>
          </div>
        </div>

        <hr style={{ margin: "15px 0" }} />

        <Form.Item wrapperCol={24} style={{ textAlign: "center" }}>
          <Space>
            <Button type="primary" htmlType="submit">
              {type == "create" ? "Save" : "Update"}
            </Button>
            <Button htmlType="button" onClick={props.history.goBack}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateItinerary;
