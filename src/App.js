import { Fragment } from 'react';
import { ConfigProvider, notification, App as AntApp } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';
import PrivateRoute from './components/PrivateRoute';
import { publicRoutes } from './routes';
import DefaultLayout from '~/layouts';
import { NotificationProvider } from '~/contexts/NotificationContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    // Seed Token
                                                    colorPrimary: '#624e88',
                                                },
                                            }}
                                        >
                                            <Layout>
                                                {route.path === '/login' || route.path === '/' ? (
                                                    <Page />
                                                ) : (
                                                    <PrivateRoute>
                                                        <Page />
                                                    </PrivateRoute>
                                                )}
                                            </Layout>
                                        </ConfigProvider>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
