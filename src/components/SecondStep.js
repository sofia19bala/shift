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
        alert('Autorization!')
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
          console.error("server responded");
          alert('Uncorrect phone number or OTP code')
        } else if (error.request) {
          console.error("network error");
        } else {
          console.error(error);
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
            type="number"
            name="code"
            placeholder="Enter a code OTP"
            autoComplete="off"
            {...register("code", {
              required: "OTP code is required.",
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

        <Button variant="primary" type="submit" className="btn">
          Autorizations
        </Button>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
