/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Divider, Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
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
    return (
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
            showTotal: (atotal, range) => `当前显示：第${range[0]}-${range[1]}条, 总共${atotal}条`,
            // onChange: (currentPage, currentPageSize) =>
            //   this.paginationChange(currentPage, currentPageSize),
            onShowSizeChange: (current, size) => this.paginationSizeChange(current, size),
          }}
        />
      </div>
    );
  }
}
export default connect(({ shopList, loading }) => ({
  ...shopList,
  loading,
}))(Index);
