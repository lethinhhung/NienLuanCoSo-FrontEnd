import { notification, App as AntApp } from 'antd';
import './GlobalStyles.scss';
import { NotificationProvider } from '~/contexts/NotificationContext';
function GlobalStyles({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const showNotification = (message, description, type = 'info') => {
        api[type]({
            message,
            description,
        });
    };
    return (
        <NotificationProvider showNotification={showNotification}>
            {contextHolder}
            {children}
        </NotificationProvider>
    );
}

export default GlobalStyles;
