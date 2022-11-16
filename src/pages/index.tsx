import React from 'react';
import { Layout } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import styles from './index.css';
import Navbar from '@/Components/Navbar';

const { Header, Content } = Layout;

export default function () {
  return (
    <Layout>
      <Header>
        <Navbar activeNav="1" />
      </Header>

      <Content style={{ padding: '0 50px' }} className={styles.normal}>
        <div className={styles.welcome} />
        <h2>{formatMessage({ id: 'welcome.text' })}</h2>
      </Content>

    </Layout>
  );
}
