import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import DefaultPage from "./pages/default";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
