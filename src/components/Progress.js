import React from "react";
import { Link, useLocation } from "react-router-dom";

const Progress = () => {
  const { pathname } = useLocation();
  const isFirstStep = pathname === "/";
  const isSecondStep = pathname === "/second";

  return (
    <React.Fragment>
      <div className="steps">
        <div className={`${isFirstStep ? "step active" : "step"}`}>
          {/* <div>1</div> */}
          <div>{isSecondStep ? <Link to="/">Back</Link> : "Enter phone"}</div>
        </div>
        {/* <div className={`${isSecondStep ? "step active" : "step"}`}>
          <div>2</div>
          <div>Step 2</div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Progress;
