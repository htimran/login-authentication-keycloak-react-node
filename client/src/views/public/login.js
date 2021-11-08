import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import 'antd/dist/antd.css';
import '../../Utils/commonStyles.css';
import { loginUser } from '../../Utils/router';
import { CONSTANT_VARIABLE } from '../../config/keys';


const LoginForm = () => {
  const [form] = Form.useForm();
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  });
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  const handleEmail = e => {
    setLoginFormData({
      ...loginFormData,
      username: e.target.value,
    });
  };

  const handlePassword = e => {
    setLoginFormData({
      ...loginFormData,
      password: e.target.value,
    });
  };

  const handleLogin = () => {
    const isUserAuth = loginUser(CONSTANT_VARIABLE.LOGIN_USER_URL, loginFormData);
    setUserAuthenticated(!isUserAuth);
  }

  return (<div className="global-container">
    <div className="card login-form">
      <div className="card-body">
        <h3 class="card-title text-center">Log in to Ammo Content</h3>
        {isUserAuthenticated ? <h5>User not Found!</h5> : null}
        <div className="card-text">
          <Form
            form={form}
            layout="vertical"
            name="loginForm"
            className="form"
          >
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "username required!",
                },
              ]}
            >
              <Input placeholder="Enter User Name" onChange={handleEmail} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "password required!",
                },
              ]}
            >
              <Input type="password" placeholder="Enter Password" onChange={handlePassword} />
            </Form.Item>            
            <Button className="login-form-button" onClick={handleLogin}>
              Login
            </Button>
            <Link to="/sign-up" className="register-link">Register now!</Link>
          </Form>
        </div>
      </div>
    </div>
  </div>)
}

export default LoginForm;