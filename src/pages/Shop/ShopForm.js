import React, { Component } from 'react';
import { Form, InputNumber, Input } from 'antd';
import { get } from 'lodash';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

@Form.create()
class ShopForm extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      data,
    } = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
            initialValue: data && data.name,
          })(<Input placeholder="请输入名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属">
          {getFieldDecorator('belongsTo', {
            rules: [
              {
                required: false,
                message: '请输入所属',
              },
            ],
            initialValue: data && data.belongsTo,
          })(<Input placeholder="请输入所属" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="价格">
          {getFieldDecorator('price', {
            rules: [
              {
                required: false,
                message: '请输入价格',
              },
            ],
            initialValue: data && data.price,
          })(<InputNumber placeholder="请输入价格" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="总数">
          {getFieldDecorator('total', {
            rules: [
              {
                required: false,
                message: '请输入总数',
              },
            ],
            initialValue: data && data.total,
          })(<InputNumber placeholder="请输入总数" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="余数">
          {getFieldDecorator('remainder', {
            rules: [
              {
                required: false,
                message: '请输入余数',
              },
            ],
            initialValue: data && data.remainder,
          })(<InputNumber placeholder="请输入余数" />)}
        </FormItem>
      </Form>
    );
  }
}
export default ShopForm;
