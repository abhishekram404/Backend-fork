import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginForm from "./Pages/LoginForm";
import { useUserLoginMutation } from "./Features/Auth/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const data = useUserLoginMutation();
  console.log(data);
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ToastContainer autoClose={1000} position="top-right" />
      <LoginForm />
    </div>
  );
}

export default App;
