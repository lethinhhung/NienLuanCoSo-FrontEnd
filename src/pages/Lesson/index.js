import { useEffect, useRef, useState } from 'react';
import {
    Image,
    Avatar,
    Card,
    Flex,
    Divider,
    Progress,
    Select,
    Row,
    Col,
    Button,
    Input,
    Modal,
    Spin,
    Badge,
} from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './Lesson.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import Editor from '~/components/Editor';
import { getLessonInfoApi } from '~/utils/api';

function Lesson() {
    const cardColor = '#624e88';
    const cx = classNames.bind(styles);

    const { lessonId } = useParams();

    const { Meta } = Card;

    const [lessonInfo, setLessonInfo] = useState({});
    const [tipText, setTipText] = useState('Status');
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('red');

    useEffect(() => {
        const fetchLessonInfo = async () => {
            const lessonData = await getLessonInfoApi(lessonId);

            setLessonInfo(lessonData);
        };

        fetchLessonInfo();
    }, []);

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
            <Flex wrap justify="center" className={cx('overview-wrapper')}>
                <Card
                    className={cx('overview')}
                    hoverable
                    title={<h2>{lessonInfo.name}</h2>}
                    bordered={false}
                    extra={
                        <div>
                            <Button onClick={showModal}>Edit</Button>
                            <Modal
                                title={<h2>{'Edit lesson details'}</h2>}
                                open={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            ></Modal>
                        </div>
                    }
                >
                    <Meta title="Description" description={lessonInfo.description} />
                </Card>
            </Flex>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                <Badge color={color} count={tipText}></Badge>
                <Spin spinning={loading}></Spin>
            </div>
            <Flex wrap justify="center">
                <div style={{ backgroundColor: cardColor }} className={cx('editor-wrapper')}>
                    <Editor
                        loading={loading}
                        setLoading={setLoading}
                        tipText={tipText}
                        setTipText={setTipText}
                        className={cx('editor')}
                        lessonId={lessonId}
                        setColor={setColor}
                    />
                </div>
            </Flex>
        </Flex>
    );
}

export default Lesson;
