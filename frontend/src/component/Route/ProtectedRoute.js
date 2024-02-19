import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Profile from "../User/Profile";

const ProtectedRoute = ({ isAdmin, element: element, ...rest }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || (isAdmin === true && user.role !== "admin")) {
            navigate('/login')
        }
    }, [])


    return <Profile />
};

export default ProtectedRoute;