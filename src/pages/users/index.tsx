import React, { PureComponent } from 'react';
import { Button, Card, Divider, Layout, Input, InputNumber, Menu, Modal, Popconfirm, Table } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import { UserState } from './model';
import * as styles from './index.css';

const { Header, Content } = Layout;

interface ViewProps {
  users: UserState;
  dispatch: any;
  loading: boolean;
}

interface ViewStates {
  pendingUser: string;
  loadingM: boolean;
  visibleM: boolean; 
  visibleA: boolean;
  values: object;
  userData: object;
}

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))

class User extends PureComponent<ViewProps, ViewStates> {

  state = {
    pendingUser: '',
    loading: false,
    loadingM: false,
    visibleM: false,
    visibleA: false,
    values: {
      id: null,
      name: "",
      age: null,
      contact: null
    },
    userData: {
      name: "",
      age: null,
      contact: null
    }
  };

  showModal = (user) => {
    this.setState({ values: user })
    this.setState({ visibleM: true });
  }; 

  handleOk = () => {
    this.setState({ loadingM: true });
    setTimeout(() => {
      this.setState({ loadingM: false, visibleM: false });

      const { dispatch } = this.props;
      dispatch({
        type: 'users/update',
        payload: this.state.values,
      });
      this.setState({ values: { id: null, name: "", age: null, contact: null } });

    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visibleM: false, values: { id: null, name: "", age: null, contact: null } });
  };

  showAddModal = () => {
    this.setState({ userData: {  name: "", age: null, contact: null } });
    this.setState({ visibleA: true });
  };

  handleAddCancel = () => {
    this.setState({ visibleA: false, userData: { name: "", age: null, contact: null } });
  };

  handleAddOk = () => {
    this.setState({ loadingM: true });
    setTimeout(() => {
      this.setState({ loadingM: false, visibleA: false });

      const { dispatch } = this.props;
      dispatch({
        type: 'users/add',
        payload: this.state.userData,
      });
      this.setState({ userData: {  name: "", age: null, contact: null } });

    }, 3000);
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.showModal(record)}>Edit</Button>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUser(record.id)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/all',
    });    
  }

  addUser() {
    if (!this.state.pendingUser) return;

    const { dispatch } = this.props;
    dispatch({
      type: 'users/add',
      payload: {
        name: this.state.pendingUser,
      },
    });
    this.setState({ pendingUser: '' });
  }

  deleteUser(id: number) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/delete',
      payload: {
        id: id,
        deleted: true,
      },
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({ ...this.state, values: { ...prevState.values, [name]: value } }))
  };

  handleNumberChange = (name, value) => {
    this.setState(prevState => ({ ...this.state, values: { ...prevState.values, [name]: value } }))
  };

  handleInputChangeA = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({ ...this.state, userData: { ...prevState.userData, [name]: value } }))
  };

  handleNumberChangeA = (name, value) => {
    this.setState(prevState => ({ ...this.state, userData: { ...prevState.userData, [name]: value } }))
  };

  render() {
    const { visibleM, visibleA, loadingM, values } = this.state;
    return (
      <Layout className={styles.userLayout}>

        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '10px 50px' }}>

          <Button type="primary" onClick={() => this.showAddModal()} style={{margin:"10px 0", marginLeft:"auto", display:"block"}}>Add User</Button>

          <Card title="Users List">
            <Table rowKey={user => user.id} dataSource={this.props.users.list} columns={this.columns} />
          </Card>


          <Modal
            key={this.state.values.id}
            visible={visibleM}
            title="Edit User"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" loading={loadingM} onClick={this.handleOk}>
                Update
              </Button>,
            ]}
          >

            <Input placeholder="Name" defaultValue={values.name} id="name" name="name" onChange={this.handleInputChange} />
            <InputNumber placeholder="Age" defaultValue={values.age} id="age" name="age" style={{ width: "100%", margin: "15px 0" }} onChange={(e) => this.handleNumberChange("age", e)} />
            <InputNumber placeholder="Contact" defaultValue={values.contact} id="contact" name="contact" style={{ width: "100%" }} onChange={(e) => this.handleNumberChange("contact", e)} />
          </Modal>

          <Modal
            visible={visibleA}
            title="Add User"
            onOk={this.handleAddOk}
            onCancel={this.handleAddCancel}
            footer={[
              <Button key="back" onClick={this.handleAddCancel}>Cancel</Button>,
              <Button key="submit" type="primary" loading={loadingM} onClick={this.handleAddOk}>
                Add
              </Button>,
            ]}
          >

            <Input placeholder="Name" defaultValue={values.name} id="name" name="name" onChange={this.handleInputChangeA} />
            <InputNumber placeholder="Age" defaultValue={values.age} id="age" name="age" style={{ width: "100%", margin: "15px 0" }} onChange={(e) => this.handleNumberChangeA("age", e)} />
            <InputNumber placeholder="Contact" defaultValue={values.contact} id="contact" name="contact" style={{ width: "100%" }} onChange={(e) => this.handleNumberChangeA("contact", e)} />
          </Modal>

        </Content>
      </Layout>
    );
  }
}

export default User;
