import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { validateEmail, validatePassword } from '../../Utils/utils';
import { CONSTANT_VARIABLE } from '../../config/keys';

import 'antd/dist/antd.css';
import '../../Utils/commonStyles.css';
import { createUser } from '../../Utils/router';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [isUserExist, setUserExist] = useState(false);

  const handleFirstName = e => {
    setFormData({
      ...formData,
      firstName: e.target.value,
    });
  };
  const handleLastName = e => {
    setFormData({
      ...formData,
      lastName: e.target.value,
    });
  };
  const handleEmail = e => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };
  const handlepassword1 = e => {
    setFormData({
      ...formData,
      password1: e.target.value,
    });
  };
  const handlepassword2 = e => {
    setFormData({
      ...formData,
      password2: e.target.value,
    });
  };

  const handleSignUp = () => {
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password1,
    }
    const userCreateResult = createUser(CONSTANT_VARIABLE.CREATE_USER_URL, userData);
    setUserExist(!userCreateResult);
  }

  return (<div className="global-container">
    <div className="card login-form">
      <div className="card-body">
        <h3 class="card-title text-center">Sign Up to Ammo Content</h3>
        {isUserExist ? <h5 className="alert"> User Already Exists!</h5> : null}
        <div className="card-text">
          <Form
            form={form}
            layout="vertical"
            name="signUpForm"
            className="form"
          >
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "First Name required!",
                },
              ]}
            >
              <Input placeholder="Enter First Name" onChange={handleFirstName} />
            </Form.Item>
            <Form.Item
              name="lasstname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Last Name required!",
                },
              ]}
            >
              <Input placeholder="Enter Last Name" onChange={handleLastName} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "E-mail required!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!validateEmail(value)) {
                      return Promise.reject("Email not valid!");
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="Enter E-mail" onChange={handleEmail} />
            </Form.Item>
            <Form.Item
              name="password1"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "password required!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const passwordCheck = validatePassword(formData.password1, formData.password2);
                    if (!passwordCheck.isCorrect) {
                      return Promise.reject(passwordCheck.msg);
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Enter Password" onChange={handlepassword1} />
            </Form.Item>
            <Form.Item
              name="password2"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "password required!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const passwordCheck = validatePassword(formData.password1, formData.password2);
                    if (!passwordCheck.isCorrect) {
                      return Promise.reject(passwordCheck.msg);
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Enter Password" onChange={handlepassword2} />
            </Form.Item>

            <Button className="login-form-button" onClick={() => {
              form.validateFields()
                .then(values => {
                  // form.resetFields();
                  handleSignUp(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                })
            }}>
              Sign Up
            </Button>
            <Link to="/sign-in">Sign In!</Link>
          </Form>
        </div>
      </div>
    </div>
  </div>)
}

export default RegisterForm;