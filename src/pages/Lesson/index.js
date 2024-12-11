import { useEffect, useState } from 'react';
import { Card, Flex, Badge } from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './Lesson.module.scss';
import Editor from '~/components/Editor';
import { getContentFromLessonApi, getLessonInfoApi } from '~/utils/api';
import PageTitle from '~/components/PageTitle';
import LoadingSpin from '~/components/LoadingSpin';
import EditDescription from '~/components/EditDescription';

function Lesson() {
    const cardColor = '#624e88';
    const cx = classNames.bind(styles);

    const { lessonId } = useParams();

    const { Meta } = Card;

    const [loading, setLoading] = useState(true);
    const [lessonInfo, setLessonInfo] = useState({});
    const [lessonContent, setLessonContent] = useState();
    const [tipText, setTipText] = useState('Status');

    const [color, setColor] = useState('red');

    const fetchLessonInfo = async () => {
        const lessonData = await getLessonInfoApi(lessonId);
        const lessonContentData = await getContentFromLessonApi(lessonId);

        setLessonContent(lessonContentData);
        setLessonInfo(lessonData);
        setLoading(false);
    };

    useEffect(() => {
        fetchLessonInfo();
    }, [lessonId]);

    const handleUpdated = async () => {
        fetchLessonInfo();
    };

    return (
        <>
            <LoadingSpin loading={loading}></LoadingSpin>
            <div hidden={loading}>
                <PageTitle title={lessonInfo.name ? lessonInfo.name : 'Lesson'} />
                <Flex className={cx('wrapper')} wrap vertical align="center">
                    <Flex wrap justify="center" className={cx('overview-wrapper')}>
                        <Card
                            style={{ cursor: 'default' }}
                            className={cx('overview')}
                            hoverable
                            title={<h2>{lessonInfo.name}</h2>}
                            bordered={false}
                            extra={
                                <EditDescription
                                    type="lesson"
                                    editData={lessonInfo}
                                    onUpdated={handleUpdated}
                                ></EditDescription>
                            }
                        >
                            <Meta title="Description" description={lessonInfo.description} />
                        </Card>
                    </Flex>
                    <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                        <Badge color={color} count={tipText}></Badge>
                    </div>
                    <Flex wrap justify="center">
                        <div style={{ backgroundColor: cardColor }} className={cx('editor-wrapper')}>
                            <Editor
                                tipText={tipText}
                                setTipText={setTipText}
                                className={cx('editor')}
                                lessonId={lessonId}
                                setColor={setColor}
                                lessonContent={lessonContent}
                            />
                        </div>
                    </Flex>
                </Flex>
            </div>
        </>
    );
}

export default Lesson;
