import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Food from "./components/Food";
import Singlefood from "./components/Singlefood";
import { AuthState } from "./components/Context/AuthContextProvider";
import PageNotFound from "./components/PageNotFound";

function App() {
  let { user } = AuthState();
  console.log("loggedIN:", user);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/food" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/food" /> : <Signup />}
        />
        <Route path="/food" element={!user ? <Navigate to="/" /> : <Food />} />
        <Route
          path="/food/:id"
          element={!user ? <Navigate to="/" /> : <Singlefood />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
