import { Steps, Flex, Layout, Affix, FloatButton, Button, Dropdown, Space, Tooltip } from 'antd';
import {
    CaretUpOutlined,
    HomeOutlined,
    PlusOutlined,
    MehOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './NewCourse.module.scss';
import CustomHeader from '~/layouts/DefaultLayout/Header';
import CustomFooter from '~/layouts/DefaultLayout/Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateObject from '~/components/CreateObject';

function NewCourse() {
    return <CreateObject type="course" />;
}
export default NewCourse;
