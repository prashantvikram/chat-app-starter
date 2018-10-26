import * as React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button } from "antd";
import { MemoryHistory } from 'history';

interface IProps {
  form: any,
  history: MemoryHistory
}
interface IState { }

const FormItem = Form.Item;

function hasErrors(fieldsError: Error) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class SigninForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch("/user/signin", {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        })
          .then(res => res.json())
          .then(json => {
            // tslint:disable-next-line:no-console
            console.log(json);
            this.props.history.push('/');
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error);
          })
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <FormItem
          validateStatus={userNameError ? "error" : "success"}
          help={userNameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input suffix={<Icon type="user" theme="outlined" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? "error" : "success"}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input suffix={<Icon type="lock" theme="outlined" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{
              width: "100%"
            }}
          >
            Sign In
          </Button>
          <Link to='/signup'>New User? Sign up!</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSigninForm = Form.create()(SigninForm);

export default WrappedSigninForm;