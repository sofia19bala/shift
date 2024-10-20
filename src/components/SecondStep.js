import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from 'axios';
import { useState } from 'react';

const SecondStep = (props) => {
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: user.phone,
      code: user.code
    }
  });

  const [showBtn, setShowBtn] = useState(false);
  const [counter, setCounter] = React.useState(6);
  React.useEffect(() => {
    // setTimeout(() => {
    //   setShowBtn(!showBtn);
    // }, 12000)
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if ( counter === 0) setShowBtn(!showBtn);
    return () => clearInterval(timer);
  }, [counter]);

  const onSubmit = (data) => {
    props.updateUser(data);
    axios
      .post("https://shift-backend.onrender.com/users/signin", data)
      .then((response) => {
        console.log(response.data.phone, response.data.code);
        //setShowOTP(true)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        {/* <Form.Group controlId="first_name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="user_email"
            placeholder="Enter your email address"
            autoComplete="off"
            {...register("user_email", {
              required: "Email is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Email is not valid."
              }
            })}
            className={`${errors.user_email ? "input-error" : ""}`}
          />
          {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )}
        </Form.Group> */}
        <Form.Group controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            autoComplete="off"
            {...register("phone", {
              required: "The phone number is required.",             
            })}
            className={`${errors.phone ? "input-error" : ""}`}
          />
          {errors.phone && (
            <p className="errorMsg">{errors.phone.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="code">
          <Form.Label>OTP code</Form.Label>
          <Form.Control
            type="otp"
            name="code"
            placeholder="Choose a code"
            autoComplete="off"
            {...register("code", {
              required: "code is required.",
              minLength: {
                value: 6,
                message: "The short otp. Needs 6 digits"
              },
              maxLength: {
                value: 6,
                message: "The long otp. Needs 6 digits"
              },
            })}
            className={`${errors.code ? "input-error" : ""}`}
          />
          {errors.code && (
            <p className="errorMsg">{errors.code.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Autoriza
        </Button>
        <div>
          New OTP code: 
          {counter ? counter : (showBtn && 
              <Button variant="primary" type="submit" name="btn-otp">
                Click here
              </Button>)}
        </div>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
