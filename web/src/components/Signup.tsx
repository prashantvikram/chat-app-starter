import * as React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button } from "antd";
import { MemoryHistory } from 'history';

interface IProps {
  form: any,
  history: MemoryHistory
}
interface IState {}

const FormItem = Form.Item;

function hasErrors(fieldsError: Error) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class SignupForm extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.getUsername = this.getUsername.bind(this);
  }
  componentWillMount() {
    this.getUsername();
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  getUsername() {
    fetch("/user/generate_new", {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.props.form.setFieldsValue({ 'username': json.username })
      })
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch("/user/signup", {
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json; charset=utf-8" },
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
            <Input 
              addonAfter={<Icon type="reload" theme="outlined" onClick={this.getUsername} />} 
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? "error" : "success"}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input 
            suffix={<Icon type="lock" theme="outlined" />} 
              type="password"
              placeholder="Password"
            />
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
            Sign Up
          </Button>
          <Link to='/signin'>Already Registered? Sign In</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignupForm = Form.create()(SignupForm);

export default WrappedSignupForm;