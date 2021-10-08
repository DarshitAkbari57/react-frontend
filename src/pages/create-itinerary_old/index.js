import './create-itinerary.less';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  Steps,
  message,
  DatePicker,
  Upload
} from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import DynamicFields from '../../components/DynamicFields';

const { Option } = Select;
const { Step } = Steps;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    lg: {
      span: 4,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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
      offset: 4,
    },
  },
};

const Details = ({ data, setData }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="details"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please Enter Title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: true,
            message: 'Please Enter Intro!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please Enter Description!',
          },
        ]}
      >
        <Input.TextArea rows="5" />
      </Form.Item>

      <Form.Item
        name="duration"
        label={
          <span>
            Duration&nbsp;
            <Tooltip title="The tour is of How many days and nights. example: 7N/8D">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please Enter Duration!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="destination"
        label="Destination"
        rules={[
          {
            required: true,
            message: 'Please Enter Destination!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="month_of_travel"
        label="Month Of Travel"
        rules={[
          {
            required: true,
            message: 'Please Enter Month Of Travel!',
          },
        ]}
      >
         <DatePicker picker="month" />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: true,
            message: 'Please Select Status!',
          },
        ]}
      >
        <Select>
          <Option value="Under Review">Under Review</Option>
          <Option value="Reviewed">Reviewed</Option>
          <Option value="Canceld">Canceld</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="quotation"
        label="Quotation"
        rules={[
          {
            required: true,
            message: 'Please Enter Quotation!',
          },
        ]}
      >
        <Input type="number" min="0" prefix="₹" />
      </Form.Item>

      <Form.Item
        name="cover_image"
        label="Cover Image"
      >
        <Upload 
          name="cover_image" 
          listType="picture" 
          maxCount={1}
          beforeUpload={() => { return false; }}>
          <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
        </Upload>
      </Form.Item>
      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

const Places = ({ data, setData }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const dynamicFields = [
    {
      label: "Title",
      name: "title",
      rules: [
        {
          required: true,
          message: 'Please Enter Title!',
        },
      ]
    },
    {
      label: "Intro",
      name: "intro",
      rules: [
        {
          required: true,
          message: 'Please Enter Intro!',
        },
      ]
    },
    {
      label: "Description",
      name: "description",
      rules: [
        {
          required: true,
          message: 'Please Enter Description!',
        },
      ]
    },
    {
      label: "Images",
      name: "images",
      type: "image",
      rules: [
        {
          required: true,
          message: 'Please Enter Description!',
        },
      ],
      props: {
        listType: "picture",
        beforeUpload: () => { return false; }
      }
    },
    {
      label: "Youtube Link",
      name: "youtube_link",
      type: "url",
    },
  ]
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="details"
      onFinish={onFinish}
      scrollToFirstError
    >
      <DynamicFields items={dynamicFields} />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

const CreateItinerary = () => {
  const [details, setDetails] = React.useState({});
  const [places, setPlaces] = React.useState({});
  const [dayWise, setDayWise] = React.useState({});
  const [exclusivity, setExclusivity] = React.useState({});
  const [hotel, setHotel] = React.useState({});
  const [transport, setTransport] = React.useState({});
  const [TnC, setTnC] = React.useState({});
  const [faq, setFaq] = React.useState({});
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onStepChange = (selected_step) => {
    setCurrent(selected_step);
  };

  const steps = [
    {
      title: 'Details',
      content: <Details data={details} setData={setDetails} />,
    },
    {
      title: 'Places',
      content: <Places data={places} setData={setPlaces} />,
    },
    {
      title: 'Day Wise',
      content: 'Day Wise-content',
    },
    {
      title: 'Exclusivity',
      content: 'Exclusivity-content',
    },
    {
      title: 'Other Details',
      content: 'Hotel-content',
    },
  ];  
  
  return (
    <div className="create-itinerary-container">
      <Steps 
        size="small"
        onChange={onStepChange}
        current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {steps[current].content}
        </div>
        <div className="steps-action">
          <Button 
            disabled={current === 0}
            style={{ margin: '0 8px' }} 
            onClick={() => prev()}>
            Previous
          </Button>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
        </div>
    </div>
  );
};


export default  CreateItinerary