/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthProvider from "./providers/AuthProvider";
import SiteTemplate from "./components/common/SiteTemplate";
import Login from "./pages/auth/Login";
import LostPassword from "./pages/auth/LostPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import "bootswatch/dist/litera/bootstrap.min.css";
import { useAuth } from "./hooks/useAuth";
import NotarizeDocument from "./pages/notary/NotarizeDocument";
import VerifyDocument from "./pages/notary/VerifyDocument";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const auth = useAuth();

  if (auth.startup) {
    return <p>Loading...</p>;
  }

  return auth.user ? children : <Navigate to="/" />;
};

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const auth = useAuth();

  if (auth.startup) {
    return <p>Loading...</p>;
  }

  return !auth.user ? children : <Navigate to="/notary/notarize-document" />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <SiteTemplate />
              </PublicRoute>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="lost-password" element={<LostPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/notary" element={<SiteTemplate />}>
            <Route
              path="notarize-document"
              element={
                <RequireAuth>
                  <NotarizeDocument />
                </RequireAuth>
              }
            />
            <Route path="verify-document" element={<VerifyDocument />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
