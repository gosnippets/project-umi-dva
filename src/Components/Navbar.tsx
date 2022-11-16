import React from 'react';
import { Link } from 'umi';
import { Menu, Row, Col } from 'antd';
import { formatMessage, setLocale } from 'umi-plugin-locale';
import styles from '../pages/index.css';

interface ViewProps {
    activeNav: string;
}

class Navbar extends React.Component<ViewProps> {

    changeLang(lang: string) {
        setLocale(lang);
    }

    render() {
        const { activeNav } = this.props;
        return (
            <Row>
                <Col span={22}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[activeNav]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/">{formatMessage({ id: 'nav.home' })}</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/users">{formatMessage({ id: 'nav.users' })}</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={2}>
                    <div>
                        <span className={styles.lang} onClick={() => this.changeLang("en-US")}>EN</span>
                        <span className="ant-divider" style={{ margin: '0 1em' }} />
                        <span className={styles.lang} onClick={() => this.changeLang("zh-CN")}>中国</span>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Navbar;
