import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    }
  });

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
        <h1>Вход</h1>
        <p class='text-intro'>Введите номер телефона для входа в личный кабинет</p>
        <Form.Group controlId="phone">
          <Form.Control
            type="number"
            name="phone"
            placeholder="Телефон"
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
          
        <Button variant="primary" type="submit" className="btn">
          Продолжить
        </Button>
      </motion.div>
    </Form>
  );
};

export default FirstStep;
