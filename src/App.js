import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Summary from "./components/Summary";
import Navbar from "./components/Navbar";
import { AppProvider, useGlobalContext } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/addBill" element={<Form />}></Route>
          <Route path="/editBill/:id" element={<Form />}></Route>
          <Route path="/invoice/:id" element={<Summary />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
