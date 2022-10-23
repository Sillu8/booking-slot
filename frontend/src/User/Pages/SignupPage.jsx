import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice"


function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/signup", values);
      dispatch(hideLoading())
      if (response.data.status === 'success') {
        toast.success("Successfully created.");
        toast('Redirecting to login page')
        navigate("/")
      } else {
        toast.error("Unknown error");
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input placeholder="Phone" type="text" />
          </Form.Item>
          <Button className="primary-button my-2" htmlType="submit">
            SIGN UP
          </Button>
          <Link to="/" className="anchor mt-2">
            Already have an account?
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage


