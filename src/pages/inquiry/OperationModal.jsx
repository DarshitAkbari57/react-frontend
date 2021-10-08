import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};


const OperationModal = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit, addLoading } = props;
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = () => {
    setLoading(true);
    axios
      .get("/api/agency/all")
      .then((response) => {
        setLoading(false);
        setAgentList(response.data.data);
      })
      .catch((error) => {
        message.error("something went wrong please try again.");
      });
  };

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({ ...current });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const modalFooter = {
    okText: 'Save',
    onOk: handleSubmit,
    onCancel,
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter itinerary name',
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter description',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="" />
        </Form.Item>

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

        <Form.Item
          name="duration"
          label="For How Long?"
          // labelCol={12}
          rules={[
            {
              required: true,
              message: "Please select one value from dropdown!",
            },
          ]}
        >
              <Select
                showSearch
                placeholder="No. of Days"
                optionFilterProp="duration"
              >
                <Option value="1-2">1-2</Option>
                <Option value="2-6">2-6</Option>
                <Option value="7-9">7-9</Option>
                <Option value="10">10 & above </Option>
              </Select>
        </Form.Item>

        <Form.Item 
          name="month"
          label="In Which Month?"
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
          name="students"
          rules={[
            {
              required: true,
              message: "Please select number of students",
            },
          ]}
          label="Number of Students"
        >
          <Select
            showSearch
            placeholder="No. of students"
            optionFilterProp="students"
          >
            <Option value="1-10">1-10</Option>
            <Option value="11-30">11-30</Option>
            <Option value="31-60">31-60</Option>
            <Option value="61-100">61-100</Option>
            <Option value="101">101 & above </Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="budget"
          label="Aprroximate Budget"
        >
          <Select
            showSearch
            style={{ width: 350 }}
            placeholder="Estimated Budget per Person"
            optionFilterProp="budget"
          >
            <Option value="200-1000">200-1000</Option>
            <Option value="1001-4000">1001-4000</Option>
            <Option value="4001-9000">4001-9000</Option>
            <Option value="9001-13000">9001-13000</Option>
            <Option value="13000">13000 & above </Option>
          </Select>
        </Form.Item>

      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `${current ? 'Edit' : 'Send'} Inquiry`}
      width={640}
      bodyStyle={{
        padding: '28px 0 0',
      }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
      okButtonProps={{ loading: addLoading }}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
