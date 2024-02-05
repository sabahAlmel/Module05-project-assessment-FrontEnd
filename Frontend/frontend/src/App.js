import "./App.css";
import Signup from "./components/authForm/Signup";
import Login from "./components/authForm/Login";
import { Route, Routes } from "react-router-dom";
import { fetchUser } from "./db/authData";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext/userContext";
import ProtectedRoute from "./components/protectedRoutes";
import Products from "./components/Products";
import { QueryClient, QueryClientProvider } from "react-query";
import Cart from "./components/Cart";

const queryClient = new QueryClient();

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const res = await fetchUser();
      if (res) {
        console.log(res);
        setUser(res);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else setLoading(false);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: 30,
        }}
      >
        Loading...
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            element={<ProtectedRoute isAllowed={user} redirectPath="Login" />}
          >
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
