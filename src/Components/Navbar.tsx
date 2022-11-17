import React from 'react';
import { Link } from 'umi';
import { Menu, Row, Col, Select } from 'antd';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-locale';
const { Option } = Select;

interface ViewProps {
    activeNav: string;
}

class Navbar extends React.Component<ViewProps> {

    handleChange(lang: string) {
        setLocale(lang, false);
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
                    <Select defaultValue={getLocale()} style={{ width: 120 }} onChange={(e) => this.handleChange(e)}>
                        <Option value="en-US">EN</Option>
                        <Option value="zh-CN">CN</Option>
                    </Select>

                    {/* <div>
                        <span className={styles.lang} onClick={() => this.changeLang("en-US")}>EN</span>
                        <span className="ant-divider" style={{ margin: '0 1em' }} />
                        <span className={styles.lang} onClick={() => this.changeLang("zh-CN")}>中国</span>
                    </div> */}
                </Col>
            </Row>
        );
    }
}

export default Navbar;
