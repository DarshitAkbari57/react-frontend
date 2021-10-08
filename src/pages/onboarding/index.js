import "./onboarding.less";
import React, { useState, Component } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Checkbox,
  Form,
  Button,
  DatePicker,
  Space,
  Switch,
  Upload,
  Select,
  Radio,
} from "antd";
import { InboxOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Grid } from "antd";
// import {Login as LoginDemo} from 'ant-design-pro/lib/Login';
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginDemo;
import { Steps, message } from "antd";
import { connect } from "react-redux";

import { Tooltip, Cascader, AutoComplete } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Step } = Steps;
const { Dragger } = Upload;
const { Option } = Select;

const stepsForAgent = [
  {
    title: "Personal Details",
    content: "First-content",
  },
  {
    title: "Agency Details",
    content: "Second-content",
  },
  {
    title: "Agency Verification",
    content: "Last-content",
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function OnBoarding(props) {
  const [type, setType] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(stepsForAgent);
  const [saveLoading, setSaveLoading] = useState(false);
  const [collageList, setCollageList] = useState([]);
  const [agencyList, setagencyList] = useState([]);
  const [logo, setlogo] = useState("")

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
    //setSaveLoading(true);

    if(type=="college"){

      values ={
        ...values,
        college: {
          name: values.college_name,
          email: values.college_email || null,
          // phone: values.college_phone || null
        }
      }

      delete values['collage_name']
      delete values['collage_email']
    }
    delete values['prefix']
    console.log(values)
    // return;

    if(type=="agency"){

      values ={
        ...values,
        agency: {
          name: values.agency_name,
          email: values.agency_email || null,
          logo: logo
          // phone: values.college_phone || null
        }
      }
      
      delete values['agency_name']
      delete values['agency_email']
    }


    axios
      .put("/api/auth/update", values)
      .then((response) => {
        console.log(response.data);
        // props.history.push("/onboarding");
        if(response.data.data.verified){
          props.updateUser(response.data.data);
        }else{
          props.history.push("/thank-you");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong please try again.");
      });
  };

  const handleCollageSearch = (value) =>{
    console.log(value)
    if (value) {
      // fetch(value, data => this.setState({ data }));
      axios
      .get("/api/college/list")
      .then((response) => {
        console.log(response.data);
        // props.history.push("/onboarding");
        // props.updateUser(response.data.data);
        setCollageList(response.data.data);

      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong please try again.");
      });
    } else {
      setCollageList([]);
    }
  }

  const handleAgencyList = (value) =>{
    console.log(value)
    if (value) {
      // fetch(value, data => this.setState({ data }));
      axios
      .get("/api/agency/list")
      .then((response) => {
        console.log(response.data);
        // props.history.push("/onboarding");
        // props.updateUser(response.data.data);
        setagencyList(response.data.data);

      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong please try again.");
      });
    } else {
      setagencyList([]);
    }
  }

  return (
    <div className="onboarding-root">
      <div className="alert bg-success mb-5 py-4" style={{ marginTop: 15 }}>
        <div className="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-check-circle"
            style={{ marginRight: 10 }}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div className="px-3">
            <h5 className="alert-heading">Thank you for signing up!</h5>
            <p style={{ color: "#fff", fontSize: 15 }}>
              We are setting up your account in the background. Meanwhile, let
              us know what kind of account you would like to create.
            </p>
          </div>
        </div>
      </div>

      <Form
        // {...formItemLayout}
        form={form}
        name="register"
        onFinish={onSubmit}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
        layout="vertical"
      >
        <Row gutter={15}>
          <Col lg={8}>
            <Form.Item
              name="type"
              label="Type"
              // labelCol={12}
              rules={[
                {
                  required: true,
                  message: "Please select type!",
                },
              ]}
            >
              <Select
                allowClear
                onChange={(value) => {
                  console.log(value);
                  setType(value);
                }}
              >
                <Option value="agent">Agent</Option>
                <Option value="student">Student</Option>
                <Option value="college">College / Institute</Option>
                <Option value="department">Department head</Option>
                <Option value="coordinator">Student Coordinator</Option>
                <Option value="agency">Agency</Option>
              </Select>
            </Form.Item>
          </Col>
            
          
         
          {/* <Col lg={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              // rules={[
              //   { required: true, message: "Please input your phone number!" },
              // ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}

          { type==="agent" && (
            <>
           <Col lg={24}>
                <Form.Item
                  name="agencyId"
                  label="Select Agency"
                  rules={[
                    {
                      required: true,
                      message: "Please input your college name!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    // value={this.state.value}
                    // placeholder={this.props.placeholder}
                    // style={this.props.style}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleAgencyList}
                    // onChange={handleChange}
                    notFoundContent={null}
                  >
                    {agencyList.map(d => <Option key={d._id}>{d.name}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              

            <Col lg={24}>
              <Form.Item
                    name="bio"
                    label="Bio"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your bio!",
                      },
                    ]}
                  >
                  <TextArea
                    showCount 
                    maxLength={100}
                    placeholder="Please enter brief details about yourself."
                  />
              </Form.Item>
              </Col>
            </>
          )

          }

          {['student',"coordinator",'department'].includes(type) && (
            <>
              <Col lg={24}>
                <Form.Item
                  name="collegeId"
                  label="Select Collage"
                  rules={[
                    {
                      required: true,
                      message: "Please input your college name!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    // value={this.state.value}
                    // placeholder={this.props.placeholder}
                    // style={this.props.style}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleCollageSearch}
                    // onChange={handleChange}
                    notFoundContent={null}
                  >
                    {collageList.map(d => <Option key={d._id}>{d.name}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              
              <Col lg={24}>
              <Form.Item
                    name="bio"
                    label="Bio"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your bio!",
                      },
                    ]}
                  >
                  <TextArea
                    showCount 
                    maxLength={100}
                    placeholder="Please enter brief details about yourself."
                  />
              </Form.Item>
              </Col>
            </>
          )}

          {
            type =='college' && (
              <>
                <Col lg={24}>
                  <Form.Item
                    name="college_name"
                    label="College Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input college name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item
                    name="college_email"
                    label="College Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input college email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

              <Col lg={24}>
              <Form.Item
                    name="bio"
                    label="Bio"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your bio!",
                      },
                    ]}
                  >
                  <TextArea
                    showCount 
                    maxLength={100}
                    placeholder="Please enter brief details about yourself."
                  />
              </Form.Item>
              </Col>

              </>
            )
          }

          {
            type =='agency' && (
              <>
                <Col lg={24}>
                  <Form.Item
                    name="agency_name"
                    label="Agency Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input Agency name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item
                    name="agency_email"
                    label="Agency Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input agency email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                <Upload
                  name="logo"
                  listType="picture-card"
                  maxCount={1}
                  className="profile-img"
                  action={axios.defaults.baseURL + "/api/common/upload"}
                  name={"image"}
                  // fileList={(user && user.avatar) ? [{
                  //   id: 1,
                  //   name: "avatar",
                  //   status: 'done',
                  //   url: user.avatar
                  // }] : []}
                  // beforeUpload={(file) => {
                  //   console.log(file)
                  //   return false;
                  // }}
                  onChange={({ file, fileList }) => {
                    const { status, response } = file;
                    // console.log(files);
                    
                    if (status === "done") {
                      // let fileL = expImages;
                      console.log(response.data);
                      // fileL.push(response.data[0].url);
                      console.log(response.data.Location);
                      //seAvatar(response.data.Location);
                      // setCoverImg(response.data[0].url);
                      // seAvatar(fileL);
                      setlogo(response.data.Location);
                    }
                    if(status === "removed"){
                      setlogo("")
                    }

                    if (status == "error") {
                      message.error(
                        response?.message || "Something went wrong."
                      );
                    }
                  }}
                >
                {logo=="" && <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
                </div>}
                </Upload>
                </Col>

              </>
            )
          }
        </Row>
       
        {/* <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
 */}

        {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          { type: 'array', required: true, message: 'Please select your habitual residence!' },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

        {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}

      <Col lg={24}>

      <Form.Item
        name="address"
        label="Address"
        rules={[{required:true,message:"Address is required"}]}
      >
        <Input 
          placeholder="Address"
        />
      </Form.Item>


      <Input.Group>
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item
            name="city"
            label="City"
            rules={[{required:true,message:"City Name is required"}]}
          >
            <Input 
              placeholder="City"
            />
          </Form.Item>

        </Col>

        <Col span={8}>
          <Form.Item
            name="state"
            label="State"
            rules={[{required:true,message:"State Name is required"}]}
          >
            <Input 
              placeholder="State"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="zip"
            label="Postcode"
            rules={[{required:true,message:"Post Code is required"}]}
          >
            <Input 
              placeholder="Postal Code"
              type="number"
            />
          </Form.Item>
        </Col>
      </Row>
      </Input.Group>
      </Col>
        <Form.Item >
          <Button loading={saveLoading} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
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
    updateUser: (data) => {
      dispatch({
        type: "UPDATE_USER",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
