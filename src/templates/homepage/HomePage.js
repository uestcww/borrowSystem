import React from 'react';
import { Link } from "react-router";
import { Menu, Icon, Dropdown } from 'antd';
// import { Button, Modal, message, Input, Menu, Icon, Row, Col, Radio } from 'antd';
import Footer from "./Footer";
import "../../css/homepage.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "我的名字长度达到了十三个字",
            currentMenu: "homePage",
        }
    }

    componentWillMount(){

    }

    handleClick(e) {
        this.setState({
            currentMenu: e.key,
        });
    }

    render(){
        const userMenu = (
            <Menu>
                <Menu.Item key="modifyPassword"><Icon type="edit" /> 修改登录密码</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" /> 登出</Menu.Item>
            </Menu>
        );
        return(
            <div>
                <div style={{marginTop: 10}}>
                    <img src="./src/img/title.png" style={{width: "35%"}}/>
                    <div className="username">
                        <Dropdown overlay={userMenu}>
                            <Link to="/" className="ant-dropdown-link">{this.state.username}<Icon type="down" /></Link>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <Menu onClick={this.handleClick.bind(this)}
                          selectedKeys={[this.state.currentMenu]}
                          mode="horizontal"
                    >
                        <Menu.Item key="homePage">
                            <Link to="/homePage/Search"><Icon type="home" />首页</Link>
                        </Menu.Item>
                        <SubMenu title={<span><Icon type="shopping-cart" />采购</span>}>
                            <Menu.Item key="bookBuy"><Link to="/homePage/Search">图书采购</Link></Menu.Item>
                            <Menu.Item key="bookCheck"><Link to="/homePage/Search">图书验收</Link></Menu.Item>
                            <Menu.Item key="bookBuyCount"><Link to="/homePage/Search">图书订购统计</Link></Menu.Item>
                            <Menu.Item key="bookCheckCount"><Link to="/homePage/Search">图书验收统计</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="retweet" />流通</span>}>
                            <Menu.Item key="cashier"><Link to="/homePage/Search">出纳</Link></Menu.Item>
                            <Menu.Item key="bookSearch"><Link to="/homePage/Search">书刊查询</Link></Menu.Item>
                            <Menu.Item key="userSearch"><Link to="/homePage/Search">用户查询</Link></Menu.Item>
                            <Menu.Item key="userBookCount"><Link to="/homePage/Search">用户/书刊管理统计</Link></Menu.Item>
                            <Menu.Item key="borrowOrderCount"><Link to="/homePage/Search">外借/预约统计</Link></Menu.Item>
                            <Menu.Item key="circulationPersonCount"><Link to="/homePage/Search">流通人次统计</Link></Menu.Item>
                            <Menu.Item key="loaningCount"><Link to="/homePage/Search">借阅名次统计</Link></Menu.Item>
                            <Menu.Item key="moneyCount"><Link to="/homePage/Search">押金/罚金统计</Link></Menu.Item>
                            <Menu.Item key="circulationCount"><Link to="/homePage/Search">流通统计</Link></Menu.Item>
                            <Menu.Item key="circulationLogCount"><Link to="/homePage/Search">流通日志统计</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="userManage">
                            <Link to="/homePage/userManage"><Icon type="team" />用户管理</Link>
                        </Menu.Item>
                        {/*<SubMenu title={<span><Icon type="team" />用户管理</span>}>*/}
                            {/*<Menu.Item key="modifyUserInfo"><Link to="/">修改用户信息</Link></Menu.Item>*/}
                            {/*<Menu.Item key="modifyPassword"><Link to="/">修改密码</Link></Menu.Item>*/}
                            {/*<Menu.Item key="userViolationRecord"><Link to="/">用户违规记录</Link></Menu.Item>*/}
                            {/*<Menu.Item key="userHistoryManage"><Link to="/">用户历史记录管理</Link></Menu.Item>*/}
                        {/*</SubMenu>*/}
                        <Menu.Item key="excel">
                            <Link to="/homePage/upload"><Icon type="export" />Excel书目数据导入</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div key={this.props.location.pathname}>
                    {this.props.children}
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
export default HomePage;