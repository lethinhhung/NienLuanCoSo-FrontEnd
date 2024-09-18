import { Flex, Card, Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
function DashboardLarge() {
    const cx = classNames.bind(styles);
    return (
        <Row className={cx('large-wrapper')}>
            <Col className={cx('large-col')} span={8}>
                <Card
                    className={cx('large-card')}
                    title="Card title"
                    bordered={false}
                    style={{
                        height: 1000,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col className={cx('large-col')} span={8}>
                <Card
                    className={cx('large-card')}
                    title="Card title"
                    bordered={false}
                    style={{
                        height: 500,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card
                    className={cx('large-card')}
                    title="Card title"
                    bordered={false}
                    style={{
                        height: 400,
                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col className={cx('large-col')} span={8}>
                <Card className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
        </Row>
    );
}

export default DashboardLarge;
