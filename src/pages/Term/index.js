import { Image, Card, Flex, Input, Progress, Tooltip, Badge } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Term.module.scss';
import convertAvatarPath from '~/utils/convertAvatarPath';
import CustomList from '~/components/CustomList';
import EditDescription from '~/components/EditDescription';
import { getTermInfoApi } from '~/utils/api';
import defaultCourseCover from '../../assets/images/default-term-cover.jpg';
import LoadingSpin from '~/components/LoadingSpin';
import moment from 'moment';

function Term() {
    const cx = classNames.bind(styles);

    const { termId } = useParams();

    const { Meta } = Card;

    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);
    const [termInfo, setTermInfo] = useState({});
    const [fetchData, setFetchData] = useState(false);

    const currentDate = new Date();
    const termStartDate = new Date(termInfo.startDate);
    const termEndDate = new Date(termInfo.endDate);
    const progression = (termEndDate - currentDate) / 1000 / 60 / 60 / 24;

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        const fetchTermInfo = async () => {
            const termData = await getTermInfoApi(termId);

            setTermInfo(termData);
            setLoading(false);
        };

        fetchTermInfo();
    }, [isModalVisible, fetchData, termId]);

    return (
        <>
            <LoadingSpin loading={loading} />
            <div hidden={loading}>
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
                                src={termInfo.cover === '' ? defaultCourseCover : convertAvatarPath(termInfo.cover)}
                            />
                        </div>
                    </div>

                    <div className={cx('lessions-list-wrapper')}>
                        <CustomList
                            title="Courses"
                            data={termInfo.courses}
                            id={termInfo._id}
                            isModalVisible={isModalVisible}
                            setIsModalVisible={setIsModalVisible}
                            fetchData={fetchData}
                            setFetchData={setFetchData}
                        />
                    </div>
                    <div className={cx('component-wrapper')}>
                        <Card className={cx('notes')} hoverable title="Progession" bordered={false}>
                            <Flex justify="space-between">
                                <Badge
                                    color={currentDate > termEndDate ? 'blue' : 'red'}
                                    count={moment(termInfo.startDate).format('DD/MM/YYYY')}
                                ></Badge>
                                <Badge
                                    color={currentDate > termEndDate ? 'blue' : 'red'}
                                    count={moment(termInfo.endDate).format('DD/MM/YYYY')}
                                ></Badge>
                            </Flex>
                            <Tooltip
                                title={
                                    currentDate < termStartDate
                                        ? 'Incoming'
                                        : currentDate > termEndDate
                                        ? 'Completed'
                                        : progression.toFixed(1) + '%'
                                }
                            >
                                <Progress
                                    percent={
                                        currentDate < termStartDate
                                            ? '0'
                                            : currentDate > termEndDate
                                            ? '100'
                                            : progression.toFixed(1)
                                    }
                                />
                            </Tooltip>
                        </Card>
                    </div>
                    <div className={cx('component-wrapper')}>
                        <Card
                            className={cx('notes')}
                            hoverable
                            title="Term overview"
                            bordered={false}
                            extra={<EditDescription type="term" editData={termInfo} isEdit={true} />}
                        >
                            <Meta
                                avatar={<h1>{termInfo.emoji}</h1>}
                                title={termInfo.name}
                                description={termInfo.description}
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
            </div>
        </>
    );
}

export default Term;
