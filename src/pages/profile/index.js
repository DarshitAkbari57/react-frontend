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
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

function Profile(props) {
  const [changePwdForm] = Form.useForm();
  const { user } = props.auth;
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState(false);
  const [agencyLogo, setagencyLogo] = useState("");
  const [agencyData, setagencyData] = useState([])
  const [avatar, seAvatar] = useState(false);
  const [isChangePwdVisible, setIsChangePwdVisible] = useState(false);
  const [phone, setphone] = useState("")

  const [mobileVerifyModal, setMobileVerifyModal] = useState(false);

  const showModal = () => {
    setMobileVerifyModal(true);
  };

  const handleOk = () => {
    setMobileVerifyModal(false);
  };

  const handleCancel = () => {
    setMobileVerifyModal(false);
  };

  const handleChangePwdFormOk = () => {
    changePwdForm.submit();
  };

  const handleChangePwdFormCancel = () => {
    setIsChangePwdVisible(false);
  };

  const savePersonalInformation = (values) => {
    console.log("Received values of savePersonalInformation: ", values);
    setLoading(true);

    if (avatar) {
      values = {
        ...values,
        avatar,
      };
    }
    axios
      .put("/api/auth/update", values)
      .then((response) => {
        console.log(response.data);
        message.success("Information saved successfully");
        setLoading(false);
        props.updateUser(values);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  const getCollageDetails = () => {
    axios
      .get("")
      .then((response) => {
        setCollege(response.data.data);
      })
      .catch((e) => {});
  };

  const getAgencyDetails = () => {
    axios
      .get("api/agency")
      .then((response) => {
        user.agencyId=response.data.data
        setagencyData(response.data.data);
        setagencyLogo(response.data.data.logo)
        console.log(response.data.data)
      })
      .catch((e) => {});
  };


  useEffect(() => {
    getAgencyDetails();
    getCollageDetails();
    setphone(user.phone)
  }, []);

  const sendVerificationEmail = () => {
    axios
      .post("/api/common/email",{email:user.email,type:"verification"})
      .then((response) => {
        console.log(response.data);
        message.success("verification email sent successfully.");
        // setLoading(false);
        // setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        // setLoading(false);
      });
  };

  const sendVerificationPhone = () => {
    axios
      .post("/api/common/sms",{phone:`91${phone}`})
      .then((response) => {
        console.log(response.data);
        message.success("verification SMS sent successfully.");
        setMobileVerifyModal(true);
        // setLoading(false);
        // setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        // setLoading(false);
      });
  };

  

  const changePassword = (values) => {
    setLoading(true);
    axios
      .post("/api/auth/changepassword", values)
      .then((response) => {
        console.log(response.data);
        message.success("Password changed successfully");
        setLoading(false);
        setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  const agencyUpdate = (values) => {
    setLoading(true);
    values = {...values, id:user.agencyId._id, logo:agencyLogo}
    console.log(values)
    axios
      .put('/api/agency/update',values)
      .then((response) => {
        console.log(response.data);
        message.success("Agency Details changed successfully");
        setLoading(false);
       // setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
    }

  const collegeUpdate = (values) => {
    setLoading(true);
    values = {...values, id:user.collegeId._id}
    axios
      .put('/api/college/update',values)
      .then((response) => {
        console.log(response.data);
        message.success("College Details changed successfully");
        setLoading(false);
        // setIsChangePwdVisible(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
    }


  const [otp, setOtp] = useState("");

  return (
    <div className="profile-container">
      <Modal
        title="Verify Mobile"
        visible={mobileVerifyModal}
        onOk={()=>{
          axios
          .post("/api/auth/smsverify",{otp})
          .then((response) => {
            console.log(response.data);
            message.success("mobile verify successfully.");
            setMobileVerifyModal(false);
          })
          .catch((error) => {
            console.log(error);
            message.error(error?.response?.data?.message);
            setLoading(false);
          });
        }}
        onCancel={()=>setMobileVerifyModal(false)}
      >

        <label>OTP</label>
        <Input type="number" onChange={(e)=>setOtp(e.target.value)}></Input>
      </Modal>
      <Card title="Personal Information">
        <Form
          name="personal_information"
          onFinish={savePersonalInformation}
          scrollToFirstError
          layout="vertical"
          initialValues={user}
        >
          <Row gutter={16}>
            <Col lg={5} md={6} xs={24}>
              <div className="align-center">
                <Upload
                  name="profile"
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
                      seAvatar(response.data.Location);
                      // setCoverImg(response.data[0].url);
                      // seAvatar(fileL);
                    }

                    if (status == "error") {
                      message.error(
                        response?.message || "Something went wrong."
                      );
                    }
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </div>
            </Col>

            <Col lg={19} md={18} xs={24}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name!",
                  },
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name!",
                  },
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                hasFeedback
                rules={[
                  {
                    type: "email",
                    message: "Please Enter valid Email!",
                  },
                  {
                    required: true,
                    message: "Please Enter Email!",
                  },
                ]}
                validateStatus={user.emailVerified ? "success" : "error"}
              >
                <Input
                  type="email"
                  disabled={loading}
                  suffix={user.emailVerified ? "" : <Button type="link" onClick={()=>sendVerificationEmail()}>Verify</Button>}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="phone"
                hasFeedback
                validateStatus={user.phoneVerified ? "success" : "error"}
              >
                <Input
                  disabled={loading}
                  suffix={
                    user.phoneVerified ? (
                      ""
                    ) : (
                      <Button type="link" onClick={()=>sendVerificationPhone()}>Verify</Button>
                    )
                  }
                  onChange={(event)=>setphone(event.target.value)}
                />
              </Form.Item>

              <Form.Item name="interest" label="interest">
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item name="city" label="city">
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item name="state" label="state">
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item name="street" label="street">
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item name="zip" label="zip">
                <Input type="number" disabled={loading} />
              </Form.Item>

              <Form.Item name="country" label="country">
                <Input disabled={loading} />
              </Form.Item>

              <Form.Item name="bio" label="bio">
                <Input.TextArea rows={4} disabled={loading} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      {["college"].includes(user.type) && (
        <Card className="mt-5" title="College Information">
          <Form
            onFinish={collegeUpdate}
            scrollToFirstError
            layout="vertical"
            initialValues={{...user.collegeId,...user.collegeId.address}}
          >
            <Form.Item
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter name!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter email!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="phone"
              rules={[
                {
                  required: true,
                  message: "Please Enter phone!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="city"
              label="city"
              rules={[
                {
                  required: true,
                  message: "Please Enter city!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="state"
              label="state"
              rules={[
                {
                  required: true,
                  message: "Please Enter state!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="street"
              label="street"
              rules={[
                {
                  required: true,
                  message: "Please Enter street!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="zip"
              label="zip"
              rules={[
                {
                  required: true,
                  message: "Please Enter zip!",
                },
              ]}
            >
              <Input type="number" disabled={loading} />
            </Form.Item>

            <Form.Item
              name="country"
              label="country"
              rules={[
                {
                  required: true,
                  message: "Please Enter country!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}{" "}
      {["agency"].includes(user.type) && (
        <Card className="mt-5" title="Agency Information">
          {console.log("age dta",agencyData)}
          <Form
            onFinish={agencyUpdate}
            scrollToFirstError
            layout="vertical"
            initialValues={{...user.agencyId, ...user.agencyId.address}}
          >
            <div className="align-center">
                <Upload
                  name="profile"
                  listType="picture-card"
                  maxCount={1}
                  className="profile-img"
                  fileList={agencyLogo=="" ? [] : [{url:agencyLogo}] }
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
                     console.log(file);

                    if (status === "done") {
                      // let fileL = expImages;
                      console.log(response.data);
                      // fileL.push(response.data[0].url);
                      console.log(response.data.Location);
                      setagencyLogo(response.data.Location);
                      // setCoverImg(response.data[0].url);
                      // seAvatar(fileL);
                    }

                    if(status === "removed"){
                      setagencyLogo("")
                    }
                    if (status == "error") {
                      message.error(
                        response?.message || "Something went wrong."
                      );
                    }
                  }}
                >
                  {agencyLogo=="" && <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
                </div>}
                </Upload>
              </div>


            <Form.Item

              name="name"
              label="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter name!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter email!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="phone"
              rules={[
                {
                  required: true,
                  message: "Please Enter phone!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="city"
              label="city"
              rules={[
                {
                  required: true,
                  message: "Please Enter city!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="state"
              label="state"
              rules={[
                {
                  required: true,
                  message: "Please Enter state!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="street"
              label="street"
              rules={[
                {
                  required: true,
                  message: "Please Enter street!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>

            <Form.Item
              name="zip"
              label="zip"
              rules={[
                {
                  required: true,
                  message: "Please Enter zip!",
                },
              ]}
            >
              <Input type="number" disabled={loading} />
            </Form.Item>

            <Form.Item
              name="country"
              label="country"
              rules={[
                {
                  required: true,
                  message: "Please Enter country!",
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      <Card className="setting mt-5" title="Account Settings">
        <div className="setting-item">
          <div>Change Password</div>
          <div>
            <Button onClick={() => setIsChangePwdVisible(true)}>Change</Button>
          </div>
        </div>
        <div className="setting-item">
          <div>Newsletter</div>
          <div>
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked
              disabled={loading}
              id="notification"
            />
          </div>
        </div>
      </Card>
      <Modal
        title="Change Password"
        visible={isChangePwdVisible}
        okText="Save"
        onCancel={handleChangePwdFormCancel}
        onOk={handleChangePwdFormOk}
      >
        <Form
          form={changePwdForm}
          name="change_password"
          onFinish={changePassword}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="old_password"
            label="Old Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Enter Old Password!",
              },
            ]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>

          <Form.Item
            name="new_password"
            label="New Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Enter New Password!",
              },
            ]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Enter Confirm Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>
        </Form>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
