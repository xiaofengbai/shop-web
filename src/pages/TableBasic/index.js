/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Divider, Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

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
    },
    {
      title: '剩余数量',
      dataIndex: 'remainder',
      key: 'remainder',
    },
    {
      title: '价格',
      dataIndex: 'price',
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
          <a>编辑</a>
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

  componentDidMount() {
    this.props.dispatch({ type: 'list/getList', payload: { page: 1, pageSize: 5 } });
  }

  removeData = id => {
    this.props.dispatch({
      type: 'list/removeData',
      id,
      callback: () => {
        this.props.dispatch({ type: 'list/getList', payload: { page: 1, pageSize: 5 } });
      },
    });
  };

  onChange = config => {
    this.props.dispatch({
      type: 'list/getList',
      payload: { page: config.current, pageSize: config.pageSize },
    });
  };

  render() {
    const { data = [], total } = this.props;
    return (
      <div className={styles.container}>
        <Table
          columns={this.columns}
          dataSource={data}
          onChange={this.onChange}
          pagination={{
            total,
            pageSize: 5,
          }}
        />
      </div>
    );
  }
}
export default connect(({ list, loading }) => ({
  data: list.data,
  total: list.total,
  loading,
}))(Index);
