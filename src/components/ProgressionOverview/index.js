import { Flex, Progress, Row, Button } from 'antd';
import classNames from 'classnames/bind';

import styles from './ProgressionOverview.module.scss';

function ProgressionOverview({ data }) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <Flex wrap justify="space-evenly">
                <div className={cx('progression-wrapper')}>
                    <p>Progression</p>
                    <Flex justify="center">
                        <Progress type="circle" percent={75} />
                    </Flex>
                </div>
                <div className={cx('progression-wrapper')}>
                    <p>Tests</p>

                    <Flex justify="center">
                        <Progress type="circle" percent={75} />
                    </Flex>
                </div>
                <div className={cx('progression-wrapper')}>
                    <p>Projects</p>

                    <Flex justify="center">
                        <Progress type="circle" percent={75} />
                    </Flex>
                </div>
            </Flex>
            <Row>
                <Button>Edit/Add</Button>
            </Row>
        </div>
    );
}

export default ProgressionOverview;
