import React from 'react';
import { hashHistory, Link } from "react-router";
import { Menu, Icon, Dropdown, Modal, Button } from 'antd';
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
            passwordModifyModalVisible: false,
        }
    }

    componentWillMount(){
        // this.setState({
        //     username: sessionStorage.getItem("username")
        // });
    }

    handleClick(e) {
        this.setState({
            currentMenu: e.key,
        });
    }

    handleLogout(){
        hashHistory.push({
            pathname: "/"
        });
    }

    setPasswordModifyModalVisible(isVisible) {
        this.setState({
            passwordModifyModalVisible: isVisible,
        });
    }

    handlePasswordModify(){

    }

    handleUserMenu(e){
        switch (e.key){
            default: break;
            case "logout": this.handleLogout();break;
            case "modifyPassword": this.setPasswordModifyModalVisible(true);break;
        }
    }

    render(){
        const userMenu = (
            <Menu onClick={this.handleUserMenu.bind(this)}>
                <Menu.Item key="modifyPassword"><Icon type="edit" />&nbsp;修改登录密码</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" />&nbsp;登出</Menu.Item>
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
                <Modal
                    title="修改密码"
                    style={{ top: 50 }}
                    visible={this.state.passwordModifyModalVisible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setPasswordModifyModalVisible(false)}
                >
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                </Modal>
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
                            <SubMenu title={<span>出纳</span>}>
                                <Menu.Item key="borrow">外借</Menu.Item>
                                <Menu.Item key="return">还回</Menu.Item>
                                <Menu.Item key="renew">续借</Menu.Item>
                                <Menu.Item key="order">预约</Menu.Item>
                                <Menu.Item key="lost">丢失</Menu.Item>
                                <Menu.Item key="fouling">污损</Menu.Item>
                                <Menu.Item key="finesDeal">罚金处理</Menu.Item>
                                <Menu.Item key="retreatFines">退罚金</Menu.Item>
                                <Menu.Item key="dayHistory">当日历史</Menu.Item>
                                <Menu.Item key="circulation">流通量</Menu.Item>
                            </SubMenu>
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