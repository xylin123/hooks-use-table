import { useReducer, useEffect } from 'react';
import axios from 'axios';

const DATA_CHANGE = 'DATA_CHANGE';
const STATE_CHANGE = 'STATE_CHANGE';

const DEFAULT_STATE = {
  loading: false,
  current: 1,
  pageSize: 10,
  total: 0,
  order: false,
  field: '',
  dataSource: [],
  params: {},
}

const reducer = (state, action) => {
  const { type, data: { dataSource, ...nextState } } = action;
  switch (type) {
    case STATE_CHANGE:
      return {...state, ...nextState};
    case DATA_CHANGE:
      return {...state, dataSource, ...nextState};
    default:
      return state;
  }
}

export default (url, initState = {}) => {
  const [{
    loading, // 加载态
    current, // 当前页
    pageSize, // 一页多少条
    total, // 总共多少条
    order, // 排序方向
    field, // 排序字段
    dataSource, // 数据
    params, // 额外搜索项
  }, dispatch] = useReducer(reducer, {
    ...DEFAULT_STATE,
    ...initState,
  });

  useEffect(() => {
    let cancel = false;
    dispatch({ type: STATE_CHANGE, data: { loading: true } });

    axios.post(
      url,
      { current, pageSize, order, field, ...params },
    ).then(({ data, status }) => {
      if (status === 200) return data;
    }).then(({ data = [], total }) => {
      !cancel && dispatch({ type: DATA_CHANGE, data: { dataSource: data, total }});
    }).finally(() => dispatch({ type: STATE_CHANGE, data: { loading: false } }));

    return () => cancel = true;
  }, [url, current, pageSize, order, field, params]);

  // 搜索事件
  function onSearch(nextParams) {
    // 点击搜索按钮 跳到第一页
    !loading && dispatch({ type: STATE_CHANGE, data: { params: nextParams, current: 1 } });
  }

  // 变更事件
  function onChange({ current, pageSize }, filters, { order = false, field = ''}) {
    !loading && dispatch({ type: STATE_CHANGE, data: { current, pageSize, order, field }});
  }

  return {
    onSearch,
    bind: {
      loading,
      dataSource,
      pagination: { current, pageSize, total },
      onChange,
    }
  };
}
