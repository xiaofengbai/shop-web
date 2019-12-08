import React, { Component } from 'react';
import { Form, InputNumber, Input, DatePicker } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

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
        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('config.author', {
            rules: [
              {
                message: '请输入作者',
              },
            ],
            initialValue: get(data, 'config.author'),
          })(<Input placeholder="请输入名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="出版日期">
          {getFieldDecorator('config.publicationDate', {
            rules: [
              {
                required: false,
                message: '请选择出版日期',
              },
            ],
            initialValue: data && data.config && moment(get(data, 'config.publicationDate')),
          })(
            <DatePicker
              style={{
                width: '100%',
              }}
              placeholder="请选择出版日期"
            />,
          )}
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
