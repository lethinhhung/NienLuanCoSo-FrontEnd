import React, { createContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children, showNotification }) => {
    return <NotificationContext.Provider value={{ showNotification }}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
