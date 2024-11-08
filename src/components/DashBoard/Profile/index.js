import { Card, Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getAccountInfoApi } from '~/utils/api';
import getGreeting from '~/utils/getGreetings';

function Profile() {
    const { Meta } = Card;
    const { Title } = Typography;
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    );

    const fetchUserInfo = async () => {
        const userData = await getAccountInfoApi();

        setInfo(userData);
        setLoading(false);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, []);

    return (
        <Card hoverable loading={loading} style={{ backgroundColor: '#cb80ab' }}>
            <Flex justify="left">
                <div
                    style={{
                        color: '#624e88',
                        padding: '0',
                        borderRadius: '5px',
                        margin: '-10px 0 15px 0',
                    }}
                >
                    <h1>{currentTime}</h1>
                </div>
            </Flex>
            <Meta
                title={info && info.info && info.info.name ? info.info.name + '❤️' : ''}
                description={getGreeting() + ' Welcome back.'}
            />
        </Card>
    );
}

export default Profile;
