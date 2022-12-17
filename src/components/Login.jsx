import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonField from "./base/ButtonField";
import InputField from "./base/InputField";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    passward: "",
  });

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setFormData((prevData) => { 
      return { ...prevData, [name]: value };
    });
  };

  const goOnAdmin = () => {
      
    navigate("/admin");
  };

  const goOnUser = () => {
    navigate("/products");
  };

  const handleClick = () => {
    if (formData.email === "admin@gmail.com" && formData.passward === "12345") {
      localStorage.setItem("admin", JSON.stringify("true"))

      goOnAdmin();
    } else if (
      formData.email === "user@gmail.com" &&
      formData.passward === "123456"
    ) {
      localStorage.setItem("user", JSON.stringify("true"))
      goOnUser();
    } else {
      alert("you are not admin nor user");
    }
  };

  return (
    <>
      <div className="container">
        <div className="text-center m-5 bg-warning p-2">
          <strong className="display-6 font-weight-bolder">Shopping App</strong>
        </div>
        <div className="col-lg-6 mx-lg-auto card shadow mt-5">
          <div className="card-body">
            <p className="fs-2 font-weight-bolder text-center">Login</p>
            <div className="form-group mb-2 mt-2">
              <label forhtml="email">Email address</label>
              <InputField
                type={email}
                value={email.email}
                name={"email"}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group mb-2 mt-4">
              <label forhtml="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleChange}
                value={formData.passward}
                name={"passward"}
              />
            </div>

            <div className="text-center mt-5">
              <ButtonField label={"Login"} handleClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
