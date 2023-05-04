import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useLocation, useNavigate } from "react-router-dom";
import background from '../data/background.jpeg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setVisible(!isVisible);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // // DISPACTH LOGIN
    dispatch(login(email, password));
  };
  return (
    <>
      {/* <!-- form wrapper --> */}
      <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>
      <div className="container ">
     <div className="pt-[15%]">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden bg-white ">
          <center>
            {" "}
            <h2 className="text-2xl uppercase font-medium mb-1">LOGIN</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Login if you are a existing user
            </p>
          </center>
          <br></br>

          {error && <Message severity="error" text={error} />}
          {loading && (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
            
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  className="input-box w-full"
                  placeholder="example@mail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  type={isVisible ? "password" : "text"}
                  className="input-box w-full"
                  placeholder="type password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="pt-3">
                  <input type="checkbox" onChange={toggle} />
                  <span className="pl-2">Show Password</span>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
            {/* <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  for="agreement"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-primary">
                Forgot Password?
              </a>
            </div> */}
            <div className="mt-4">
              <button className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      
      </div>
      </div>
      {/* <!-- form wrapper end --> */}
    </>
  );
};

export default Login;
