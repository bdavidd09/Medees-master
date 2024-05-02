import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from "react";
import AuthModule from "./Authentication/Auth";
import AuthRegister from "./Authentication/AuthRegister";
import AuthLogin from "./Authentication/AuthLogin";
import Main from "./Main/Main";
import ConfirmationScreen from "./Confirmation/ConfirmationScreen";
import Footer from "./Footer/Footer";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"; // Make sure this is imported as well

export default function Components() {
    console.log("Rendering Components...");

    return (
        <Router>
            <Routes>
                {/* Make auth/login the default landing route */}
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                {/* These are the routes for different authentication related components */}
                <Route path="/auth" element={<AuthModule />} />
                <Route path="/auth/register" element={<AuthRegister />} />
                <Route path="/auth/login" element={<AuthLogin />} />

                {/* Use ProtectedRoute to wrap the authenticated routes */}
                <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                <Route path="/footer" element={<ProtectedRoute><Footer /></ProtectedRoute>} />
                <Route path="/confirmation" element={<ProtectedRoute><ConfirmationScreen /></ProtectedRoute>} />

                {/* Redirect any unknown paths to auth/login */}
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </Router>
    );
}
