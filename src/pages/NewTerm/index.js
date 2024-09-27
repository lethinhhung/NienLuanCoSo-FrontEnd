import { Flex, Layout, Affix, FloatButton, Button, Dropdown, Space, Tooltip } from 'antd';
import { HomeOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './NewTerm.module.scss';
import CustomHeader from '~/layouts/DefaultLayout/Header';
import CustomFooter from '~/layouts/DefaultLayout/Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateObject from '~/components/CreateObject';

function NewTerm() {
    return <CreateObject type="term" />;
}

export default NewTerm;
