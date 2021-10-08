import React, { useEffect, useState } from 'react';
import { Modal, Result, Button, Form, Input, Select, message } from 'antd';
// import styles from '../style.less';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

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

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        // firstName: current.first_name,
        // lastName: current.last_name,
        // role: current.role_name,
        // org_id: current
        // createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values) => {
    if (onSubmit) {
      // if (props.user.role.name !== 'ROLE_SYSTEM_ADMIN') {
      //   values = { ...values, org_id: props.user.orgs.id };
      // }
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
          <Input placeholder="" />
        </Form.Item>
       
       
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `task${current ? 'edit' : 'Add to'}`}
      // className={styles.standardListForm}
      width={640}
      bodyStyle={{
        padding: '28px 0 0',
      }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
      okButtonProps={{loading: addLoading}}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
