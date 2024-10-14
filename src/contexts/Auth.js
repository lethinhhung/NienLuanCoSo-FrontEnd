import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập từ localStorage khi ứng dụng khởi động
        const access_token = localStorage.getItem('access_token');
        const loginTime = new Date(localStorage.getItem('login_time'));
        if (access_token && loginTime) {
            const currentTime = new Date();

            const timeDifference = currentTime - loginTime;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            console.log(daysDifference);

            if (daysDifference < 1) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('login_time');
            }
        } else setIsAuthenticated(false);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
