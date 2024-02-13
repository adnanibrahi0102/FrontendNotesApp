import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import AddNote from "./pages/AddNote";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.userData && state.auth.userData.token
  );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/Allnotes" element={<Notes />} />
          <Route path="/create-note" element={<AddNote />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
