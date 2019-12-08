/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Divider, Table, Popconfirm, Modal, Button, Form, Card, Row, Col, Input } from 'antd';
import { connect } from 'dva';
import { isEmpty, get } from 'lodash';
import moment from 'moment';
import EditForm from './ShopForm';
import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class Index extends PureComponent {
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属',
      dataIndex: 'belongsTo',
      key: 'belongsTo',
    },
    {
      title: '总数',
      dataIndex: 'total',
      key: 'total',
      sorter: true,
    },
    {
      title: '剩余数量',
      dataIndex: 'remainder',
      sorter: true,
      key: 'remainder',
    },
    {
      title: '价格',
      dataIndex: 'price',
      sorter: true,
      key: 'price',
    },
    {
      title: '创建时间',
      dataIndex: '_createTime',
      key: '_createTime',
      render: data => moment(data).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'edit',
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              this.editForm(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除吗"
            onConfirm={() => {
              this.removeData(record._id);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  state = {
    formState: 0, // 0 hiden 1 add show 2 edit show
    row: {},
  };

  // eslint-disable-next-line react/sort-comp
  editForm = row => {
    this.setState({ row, formState: 2 });
  };

  resetForm = () => {
    try {
      this.formNode.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  subForm = () => {
    const { dispatch } = this.props;
    const id = get(this.formNode, 'props.data._id');
    this.formNode.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (id) {
          dispatch({
            type: 'shopList/updateShop',
            payload: { id, ...values },
            callback: () => {
              this.resetForm();
              this.setState({
                formState: 0,
              });
            },
          });
        } else {
          dispatch({
            type: 'shopList/createShop',
            payload: { id, ...values },
            callback: () => {
              this.resetForm();
              this.setState({
                formState: 0,
              });
            },
          });
        }
      }
    });
  };

  componentDidMount() {
    this.getList();
  }

  getList = (parames = {}) => {
    this.props.dispatch({
      type: 'shopList/getList',
      payload: parames,
    });
  };

  removeData = id => {
    this.props.dispatch({
      type: 'shopList/removeData',
      id,
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    const parames = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (isEmpty(sorter)) {
      this.getList(parames);
    } else {
      this.getList({
        ...parames,
        sortBy: sorter.field,
        order: sorter.order === 'descend' ? 'desc' : 'asc',
      });
    }
  };

  paginationChange = (current, pageSize) => {
    if (!pageSize) return false;
    this.props.dispatch({
      type: 'shopList/getList',
      payload: { page: current, pageSize },
    });
  };

  paginationSizeChange = (current, size) => {
    this.getList({
      page: 1,
      pageSize: size,
    });
  };

  render() {
    const { data = [], total, page, pageSize } = this.props;
    const { formState, row } = this.state;
    return (
      <PageHeaderWrapper title="商品列表">
        <Card bordered={false}>
          <Row>
            {/* <Col span={8}>
              <FormItem {...formItemLayout} label="讲座名称"></FormItem>
            </Col>
            <Col span={4} offset={1}>
              <Button type="primary" htmlType="submit" onClick={this.onQuery}>
                查询
              </Button>
            </Col> */}
            <Col span={4} offset={1}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  this.resetForm();
                  this.setState({
                    formState: 1,
                    row: {},
                  });
                }}
              >
                新建
              </Button>
            </Col>
          </Row>
          <div className={styles.container}>
            <Table
              columns={this.columns}
              dataSource={data}
              onChange={this.onTableChange}
              pagination={{
                current: page,
                pageSize,
                total,
                showQuickJumper: false,
                showSizeChanger: true,
                showTotal: (atotal, range) =>
                  `当前显示：第${range[0]}-${range[1]}条, 总共${atotal}条`,
                onShowSizeChange: (current, size) => this.paginationSizeChange(current, size),
              }}
            />
          </div>
        </Card>

        <Modal
          visible={formState > 0}
          title={formState === 1 ? '创建' : formState === 2 ? '编辑' : ''}
          onCancel={() => {
            this.resetForm();
            this.setState({
              formState: 0,
            });
          }}
          onOk={this.subForm}
        >
          <EditForm ref={node => (this.formNode = node)} data={row} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ shopList, loading }) => ({
  ...shopList,
  loading,
}))(Index);
