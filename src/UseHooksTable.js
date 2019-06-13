import React, { Fragment } from 'react';
import { Table } from 'antd';
import SearchForm from './SearchForm';
import useTable from './useTable';

const url = 'https://www.easy-mock.com/mock/5cf8ead34758621a19eef994/getData';
function UseHooksTable () {
  const { onSearch, bind } = useTable(url);
  const columns = [
    { title: '编号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '主页', dataIndex: 'url' },
    { title: '城市', dataIndex: 'city' },
  ];
  return (
    <Fragment>
      <SearchForm onSearch={onSearch}/>
      <Table
        rowKey={'id'}
        columns={columns}
        {...bind}
      />
    </Fragment>
  );
}

export default UseHooksTable;
