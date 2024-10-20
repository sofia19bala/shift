import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const FirstStep = (props) => {
  const navigate = useNavigate();
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: user.phone,
      // last_name: user.last_name
    }
  });
  const [showBtn, setShowBtn] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowBtn(!showBtn);
  //   }, 2000)
  // },)[]

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


  // const [counter, setCounter] = React.useState(60);

  // // Third Attempts
  // React.useEffect(() => {
  //   const timer =
  //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  const onSubmit = (data) => {
    props.updateUser(data);
    navigate("/second");
    console.log(data);
    axios
      .post("https://shift-backend.onrender.com/auth/otp", data)
      .then((response) => {
        console.log(response.data.phone);
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
        <Form.Group controlId="phone">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            autoComplete="off"
            {...register("phone", {
              required: "First name is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: "First name should contain only characters."
              },
              
            })}
            className={`${errors.phone ? "input-error" : ""}`}
          />
          {errors.phone && (
            <p className="errorMsg">{errors.phone.message}</p>
          )}
        </Form.Group>
{/* 
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            autoComplete="off"
            {...register("last_name", {
              required: "Last name is required.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Last name should contain only characters."
              },
              Length: {
                value: 6,
                message: " 6 characters."
              }
              
            })}
            className={`${errors.last_name ? "input-error" : ""}`}
          />
          {errors.last_name && (
            <p className="errorMsg">{errors.last_name.message}</p>
          )}
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Verification Code
        </Button>
        {/* <div>
          New OTP code: 
          {counter ? counter : (showBtn && 
              <Button variant="primary" type="submit" name="btn-otp">
                Click here
              </Button>)}
        </div> */}
      </motion.div>
    </Form>
  );
};

export default FirstStep;
