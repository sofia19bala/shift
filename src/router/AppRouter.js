import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";

const AppRouter = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  console.log(user);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<FirstStep user={user} updateUser={updateUser} />}
          />
          <Route
            path="/second"
            element={<SecondStep user={user} updateUser={updateUser} />}
          />
          <Route render={() => <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
