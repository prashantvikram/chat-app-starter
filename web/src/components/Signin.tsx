import * as React from "react";

import { Form, Icon, Input, Button } from "antd";

import AuthContext from "../auth-context";

interface IProps {
  form: any,
  callback: Function
}
interface IState {}

const FormItem = Form.Item;

function hasErrors(fieldsError: Error) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SigninForm extends React.Component<IProps, IState> {
  static contextType = AuthContext;
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
        this.props.callback(values);
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
        </FormItem>
      </Form>
    );
  }
}

const WrappedSigninForm = Form.create()(SigninForm);

export default WrappedSigninForm;