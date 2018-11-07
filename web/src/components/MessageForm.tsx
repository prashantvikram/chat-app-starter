import * as React from "react";

import { Button, Form, Input } from 'antd';
const { TextArea } = Input;

interface IProps {
  form: any,
  callback: Function
}

const FormItem = Form.Item;

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MessageForm extends React.Component<IProps, {}>{
  
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        this.props.callback(values.message);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const MessageError = isFieldTouched('message') && getFieldError('message');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={MessageError ? 'error' : 'success'}
          help={MessageError || ''}
        >
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'blank message' }],
          })(
            <TextArea placeholder="whaa..." autosize={{ minRows: 2, maxRows: 4 }} />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            icon="right"
          />          
        </FormItem>
      </Form>
        
      
    )
  }
}

const WrappedMessageForm = Form.create()(MessageForm);
export default WrappedMessageForm