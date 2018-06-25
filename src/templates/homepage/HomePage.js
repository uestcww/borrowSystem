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
        const MenuStyle = {
            backgroundColor: "rgb(249,249,251)",
            borderBottom: "1px rgb(e8e8e8) solid",
        };
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
                            <Link to="" className="ant-dropdown-link">{this.state.username}<Icon type="down" /></Link>
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
                          style={MenuStyle}
                    >
                        <Menu.Item key="homePage">
                            <Link to="/homePage/Search"><Icon type="home" />首页</Link>
                        </Menu.Item>
                        <SubMenu title={<span><Icon type="shopping-cart" />采购</span>}>

                            <Menu.Item key="bookBuy"><Link to="/homePage/Shopping">图书采购</Link></Menu.Item>
                            <Menu.Item key="bookCheck"><Link to="/homePage/check">图书验收</Link></Menu.Item>
                            <Menu.Item key="bookBuyCount"><Link to="/homePage/orderStatistic">图书订购统计</Link></Menu.Item>
                            <Menu.Item key="bookCheckCount"><Link to="/homePage/checkStatistic">图书验收统计</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="retweet" />流通</span>}>
                            <SubMenu title={<span>出纳</span>}>
                                <Menu.Item key="borrow"><Link to="/homePage/cashier/borrow">外借/续借</Link></Menu.Item>
                                <Menu.Item key="return"><Link to="/homePage/cashier/return">还回</Link></Menu.Item>
                                <Menu.Item key="lost">丢失</Menu.Item>
                                <Menu.Item key="finesDeal">罚金处理</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="bookSearch"><Link to="/homePage/BookManage">书刊管理</Link></Menu.Item>
                            <Menu.Item key="userSearch"><Link to="/homePage/ReaderManage">读者管理</Link></Menu.Item>
                            <Menu.Item key="userBookCount"><Link to="/homePage/userManageCount">读者管理统计</Link></Menu.Item>
                            <Menu.Item key="borrowOrderCount"><Link to="/homePage/borrowCount">外借统计</Link></Menu.Item>
                            <Menu.Item key="loaningCount"><Link to="/homePage/Search">借阅名次统计</Link></Menu.Item>
                            <Menu.Item key="moneyCount"><Link to="/homePage/Search">押金/罚金统计</Link></Menu.Item>
                            <Menu.Item key="circulationCount"><Link to="/homePage/Search">流通统计</Link></Menu.Item>
                            <Menu.Item key="circulationLogCount"><Link to="/homePage/Search">流通日志统计</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="userManage">
                            <Link to="/homePage/userManage"><Icon type="team" />用户管理</Link>
                        </Menu.Item>
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