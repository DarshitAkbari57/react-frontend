

import './dynamic-fields.less';
import React from 'react';
import { Upload, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';


const DynamicFields = ({ items }) => {
  return (
    <>
    {(items && items.length) ? 
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <div className="dynamic-fields-wrapper">
                {items.map((item, index) => (
                  <>
                    {index === 0 ? 
                      <MinusCircleOutlined onClick={() => remove(field.name)} className="remove-btn" />
                      : null}
                    <Form.Item
                      {...field}
                      label={item.label || item.name}
                      name={[field.name, item.name || item.label]}
                      fieldKey={[field.fieldKey, item.name || item.label]}
                      rules={item.rules}
                    >
                      {item.type === "image" ?
                        <Upload 
                          name="cover_image" 
                          {...(item.props ? item.props : {})}>
                        <Button icon={<UploadOutlined />}>{item.label}</Button>
                      </Upload>
                      : <Input type={item.type || "text"} {...(item.props ? item.props : {})} />
                      }
                    </Form.Item>
                  </>
                ))}
              </div>
            ))}
            <Form.Item className="add-more-btn">
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add More</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      : "No Items To Display"}
    </>
  )
}

export default DynamicFields;