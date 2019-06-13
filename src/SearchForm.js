import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

function SearchForm (props) {
  const {
    form: { getFieldDecorator },
    onSearch
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        { getFieldDecorator('name')(<Input />) }
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">查询</Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(SearchForm);
