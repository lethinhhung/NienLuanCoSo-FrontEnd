import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Term.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import CustomList from '~/components/CustomList';
import EditDescription from '~/components/EditDescription';

function Term() {
    const cx = classNames.bind(styles);

    const { Meta } = Card;

    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //Goi API
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Flex className={cx('wrapper')} wrap vertical align="center">
            <div className={cx('image-wrapper')}>
                <div className={cx('image')}>
                    <Image
                        style={{
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            borderRadius: '20px',
                            boxShadow: 'rgba(99, 99, 99, 0.8) 0px 2px 8px 0px',
                            border: 'solid #624e88',
                        }}
                        width={'100%'}
                        preview={false}
                        src="https://images.unsplash.com/photo-1693590229281-6a78deecd122?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </div>
            </div>
            <div className={cx('lessions-list-wrapper')}>
                <CustomList title="Courses" data={data} />
            </div>
            <div className={cx('component-wrapper')}>
                <Card
                    className={cx('notes')}
                    hoverable
                    title="Term overview"
                    bordered={false}
                    extra={<EditDescription type="term" />}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="This is the term name"
                        description="This is the description"
                    />
                </Card>
            </div>

            <div className={cx('component-wrapper')}>
                <Card hoverable className={cx('notes')} title="Notes">
                    <TextArea
                        placeholder="Term notes..."
                        autoSize={{
                            minRows: 2,
                        }}
                    />
                </Card>
            </div>
        </Flex>
    );
}

export default Term;
