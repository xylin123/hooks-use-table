import React, { Component, Fragment } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import SearchForm from './SearchForm';

const url = 'https://www.easy-mock.com/mock/5cf8ead34758621a19eef994/getData';
class UseClassTable extends Component {
  state = {
    loading: false,
    current: 1,
    pageSize: 10,
    total: 0,
    order: 0,
    field: '',
    params: {
      name: '',
    },
    dataSource: [],
  }
  cancel = false;
  columns = [
    { title: '编号', dataIndex: 'id', sorter: true },
    { title: '姓名', dataIndex: 'name', sorter: true },
    { title: '年龄', dataIndex: 'age', sorter: true },
    { title: '邮箱', dataIndex: 'email', sorter: true },
    { title: '主页', dataIndex: 'url', sorter: true },
    { title: '城市', dataIndex: 'city', sorter: true },
  ];
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    this.cancel = true;
  }
  // 搜索事件
  handleSearch = (nextParams) => {
    // 点击搜索按钮 跳到第一页
    !this.state.loading && this.setState({ params: nextParams, current: 1 }, this.getData);
  }
  // 变更事件
  handleTableChange = ({ current, pageSize }, filters, { order = false, field = ''}) => {
    !this.state.loading && this.setState({ current, pageSize, order, field }, this.getData);
  }
  getData() {
    const { current, pageSize, order, field, params } = this.state;
    this.setState({ loading: true }, () => {
      axios.post(
        url,
        { current, pageSize, order, field, ...params },
      ).then(({ data, status }) => {
        if (status === 200) return data;
      }).then(({ data = [], total }) => {
        !this.cancel && this.setState({ dataSource: data, total });
      }).finally(() => this.setState({ loading: false }));
    });
  }
  render() {
    const {
      loading, // 加载态
      current, // 当前页
      pageSize, // 一页多少条
      total, // 总共多少条
      dataSource, // 数据
    } = this.state;
    return (
      <Fragment>
        <SearchForm onSearch={this.handleSearch}/>
        <Table
          rowKey={'id'}
          loading={loading}
          columns={this.columns}
          pagination={{ current, pageSize, total }}
          dataSource={dataSource}
          onChange={this.handleTableChange}
        />
      </Fragment>
    )
  }
}

export default UseClassTable;
