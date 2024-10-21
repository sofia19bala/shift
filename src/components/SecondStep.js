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
  const [counter, setCounter] = React.useState(60);
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
          alert('Некорректный номер OTP кода')
        } else if (error.request) {
          console.error("network error");
        } else {
          console.error(error);
        }
      });
  };

  const handlePhoneSubmit = () => {
    const phoneNumber = document.getElementsByName('phone')[0].value;
    console.log("Phone number submitted:", phoneNumber);
    const data = {'phone': phoneNumber}
    axios
      .post("https://shift-backend.onrender.com/auth/otp", data)
      .then((response) => {
        console.log(response.data.phone);
        alert('Новый OTP код отправлен')
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
  }
  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <h1>Вход</h1>
        <p class='text-intro'>Введите проверочный код для входа в личный кабинет</p>
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

        <Form.Group controlId="code">
          <Form.Control
            type="number"
            name="code"
            placeholder="Проверочный код"
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
          Войти
        </Button>
        <div>
          {counter ? <p class='text-new-otp'>Запросить код повторно можно через {counter} секунд </p>: (showBtn && 
              <Button  variant="btn-link" type="button" className="btn" onClick={handlePhoneSubmit}>
                Запросить код еще раз
              </Button>)}
        </div>

      </motion.div>
    </Form>
  );
};

export default SecondStep;
