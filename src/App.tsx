import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
