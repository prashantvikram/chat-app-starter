import * as React from "react";

import { Form, Icon, Input, Button } from "antd";

import AuthContext from "../auth-context";

interface IProps {
  form: any,
}
interface IState {}

const FormItem = Form.Item;

function hasErrors(fieldsError: Error) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignupForm extends React.Component<IProps, IState> {
  static contextType = AuthContext;
  constructor(props: IProps){
    super(props);

    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.getUsername();
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
          this.context.toggleAuth();
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
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignupForm = Form.create()(SignupForm);

export default WrappedSignupForm;