import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Term.module.scss';
import { useConvertAvatarPath, useDebounce, useWindowDimensions } from '~/hooks';
import CustomList from '~/components/CustomList';
import EditDescription from '~/components/EditDescription';
import { getTermInfoApi, getTermsInfoApi } from '~/utils/api';

function Term() {
    const cx = classNames.bind(styles);

    const { termId } = useParams();

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

    const [termInfo, setTermInfo] = useState({});

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const termData = await getTermInfoApi(termId);

            setTermInfo(termData);
        };

        fetchCoursesInfo();
    }, []);

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
                            border: '10px solid ' + termInfo.color,
                        }}
                        width={'100%'}
                        preview={false}
                        src={useConvertAvatarPath(termInfo.cover)}
                    />
                </div>
            </div>
            <div className={cx('lessions-list-wrapper')}>
                <CustomList title="Courses" data={termInfo.courses} />
            </div>
            <div className={cx('component-wrapper')}>
                <Card
                    className={cx('notes')}
                    hoverable
                    title="Term overview"
                    bordered={false}
                    extra={<EditDescription type="term" editData={termInfo} />}
                >
                    <Meta avatar={<h1>{termInfo.emoji}</h1>} title={termInfo.name} description={termInfo.description} />
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
