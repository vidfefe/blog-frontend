import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import FullPost from "./pages/FullPost";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./store/slices/authSlice";
import { AppDispatch } from "./store/store";
import AddPost from "./pages/AddPost";
import Toast from "./components/Toast";
import NotFound from "./pages/NorFound";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/create_post" element={<AddPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
    </Container>
  );
}

export default App;
