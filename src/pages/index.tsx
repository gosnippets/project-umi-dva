import React from 'react';
import { Link } from 'umi';
import { Layout, Menu } from 'antd';
import styles from './index.css';

const { Header, Content } = Layout;

export default function () {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' }}  className={styles.normal}>
        <div className={styles.welcome} />
        <h2>Welcome to UMI</h2>
      </Content>

    </Layout>
  );
}
