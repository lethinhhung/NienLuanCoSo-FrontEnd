import React, { createContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const showNotification = (message, description, type = 'info') => {
        notification[type]({
            message,
            description,
        });
    };

    return <NotificationContext.Provider value={{ showNotification }}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
