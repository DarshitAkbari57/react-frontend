import './Header.less';
import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { Layout, Menu, Button, Dropdown, Drawer } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, DownOutlined, UserOutlined, SearchOutlined, MenuOutlined,
    CalendarOutlined,
    LinkOutlined, } from '@ant-design/icons';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';

const { Header, } = Layout;
const { SubMenu } = Menu;

export default class HeaderComp extends Component {

    constructor(props){
        super(props);

        this.state={
            isScrolled: false,
            current: 'mail',
            isOpenDrawer: false,
        }

    }


    handleClick = e => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    showDrawer = () => {
        this.setState({isOpenDrawer: true})
    };

    onCloseDrawer = () => {
        this.setState({isOpenDrawer: false})
    };


    render() {
        const { isOpenDrawer }=this.state;

        return (
            <Header>
                <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                        <div className="logo" ><img src='assets/logo_solo.png' alt='logo' /></div>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="Celebrities">
                                <Link to="https://ant.design">
                                    Home
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="Social Media">
                                <Link to="https://ant.design">
                                    About
                                </Link>
                            </Menu.Item> 
                        </Menu>
                    </div>
                    <div style={{display: 'flex'}}>

                        <Link className='login' to='/login'>Login</Link>
                        <Link className='login' to='/signup'>Signup</Link>

                        <Button className="menu-btn" onClick={this.showDrawer} type="primary" icon={<MenuOutlined  />} size={22} />
                        
                    </div>
                </div>
                <Drawer
                    title={<img src='assets/white_logo.png' alt='logo' />}
                    placement="left"
                    closable={false}
                    onClose={this.onCloseDrawer}
                    visible={isOpenDrawer}
                >
                    <Menu
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={'inline'}
                        theme={'light'}
                        >
                        <Menu.Item key="1" icon={null}>
                            Celebrities
                        </Menu.Item>
                        <Menu.Item key="2" icon={null}>
                            Social Media Stars
                        </Menu.Item>
                        <Menu.Item key="3" icon={null}>
                            Experience
                        </Menu.Item>
                        <Menu.Item key="5" icon={null}>
                            Download
                        </Menu.Item>
                    </Menu>
                </Drawer>
            
            </Header>
        )
    }
}
