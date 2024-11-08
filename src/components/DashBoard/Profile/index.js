import { Card, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getAccountInfoApi } from '~/utils/api';

function Profile() {
    const { Meta } = Card;
    const { Title } = Typography;
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});

    const fetchUserInfo = async () => {
        const userData = await getAccountInfoApi();

        setInfo(userData);
        setLoading(false);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <Card loading={loading}>
            <Meta
                title={info && info.info && info.info.name ? info.info.name + '❤️' : ''}
                description="Welcome back!"
            />
        </Card>
    );
}

export default Profile;
