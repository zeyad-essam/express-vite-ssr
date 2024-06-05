import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Api from "./pages/Api";
import NotFound from "./pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/redirect" element={<Navigate to="/" />} />
      <Route path="api" element={<Api />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
