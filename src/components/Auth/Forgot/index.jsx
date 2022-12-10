import { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import OtpInput from 'react-otp-input';

import { sendEmailApi, confirmOptApi } from 'src/libs/apis/auth';

export default function Forgot({ visible, onCancel, setShowLogin }) {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (values) => {
    setEmail(values.email);
    sendEmailApi(values)
      .then(() => {
        setShowOtp(true);
      })
      .catch((err) => {
        setMessage('Email does not exist');
      });
  };

  const handleChangeOtp = (e) => {
    setOtp(e);
  };

  const handleConfirmOtp = () => {
    console.log('otp', otp);
    confirmOptApi({
      email: email,
      otpCode: otp,
    })
      .then(() => {
        console.log('oke');
      })
      .catch(() => {
        console.log('no');
      });
  };

  return (
    <Modal
      visible={visible}
      width={582}
      footer={null}
      centered
      onCancel={onCancel}
    >
      <div className="login">
        <p>forgot password!</p>
        <h6>
          {showOtp
            ? 'OTP has been sent to your email'
            : 'Input your email, we will send you an instruction to reset your password.'}
        </h6>
        <br />
        {showOtp ? (
          <>
            <div className="wrap-otp">
              <OtpInput
                className="otp-inp"
                value={otp}
                onChange={handleChangeOtp}
                numInputs={4}
                separator={<span>-</span>}
                isInputNum={true}
              />
            </div>
            <div className="center">
              <button onClick={handleConfirmOtp}>SUBMIT</button>
            </div>
          </>
        ) : (
          <>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input email' }]}
              >
                <Input type="email" placeholder="Email..." />
              </Form.Item>
              {message && <span className="err-email">{message}</span>}
              <Form.Item>
                <div className="center">
                  <button>SUBMIT</button>
                </div>
              </Form.Item>
            </Form>
          </>
        )}
        <div className="login__other__redirect">
          BACK TO{' '}
          <b
            className="pointer"
            onClick={() => {
              onCancel();
              setShowLogin(true);
            }}
          >
            LOGIN HERE
          </b>
        </div>
      </div>
    </Modal>
  );
}
