import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth/Auth';

const mockNotificationsNumber = 1;

const useUserDropDownController = (editRoute, loginRoute, logoutRoute) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const onClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const onClickNotUser = () => {
        navigate(loginRoute);
    };

    const onClickUserName = () => {
        navigate(editRoute);
    };


    const onClickExit = () => {
        auth.logout(logoutRoute);
    };

    return {
        anchorEl,
        notificationsNumber: mockNotificationsNumber,
        onClick,
        onClickExit, onClickNotUser, onClickUserName, onClose, openMenu: Boolean(anchorEl),
        user: auth.user
    };
};

export default useUserDropDownController;
