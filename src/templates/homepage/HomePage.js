import React from 'react';
import { hashHistory, Link } from "react-router";
import { Menu, Icon, Dropdown, Modal, message, Button, Row, Col, Input } from 'antd';
import Footer from "./Footer";
import "../../css/homepage.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            currentMenu: "homePage",
            passwordModifyModalVisible: false,
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            oldPasswordAlert: <br/>,
            newPasswordAlert: <br/>,
            newPasswordAgainAlert: <br/>,
        }
    }

    componentWillMount(){
        // let isLogin = localStorage.getItem("isLogin");
        // if(isLogin){
        //     this.setState({
        //         username: localStorage.getItem("username"),
        //         currentMenu: localStorage.getItem("currentMenu"),
        //     })
        // }else{
        //     message.warning("您没有登录！");
        //     setInterval(() => {
        //         hashHistory.push({
        //             pathname: "/",
        //         });
        //     },2000)
        // }
    }

    handleClick(e){
        this.setState({
            currentMenu: e.key,
        });
        localStorage.setItem("currentMenu",e.key);
    }

    setPasswordModifyModalVisible(value){
        this.setState({
            passwordModifyModalVisible: value,
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            oldPasswordAlert: <br/>,
            newPasswordAlert: <br/>,
            newPasswordAgainAlert: <br/>,
        });
    }

    handlePasswordModifyOldChange(e){
        this.setState({
            oldPassword: e.target.value,
        });
    }

    handlePasswordModifyNewChange(e){
        this.setState({
            newPassword: e.target.value,
        });
    }

    handlePasswordModifyNewAgainChange(e){
        this.setState({
            newPasswordAgain: e.target.value,
        });
    }

    handlePasswordModifyOldBlur(e){
        if(e.target.value === ""){
            this.setState({
                oldPasswordAlert: <Row>
                    <Col span={5}></Col>
                    <Col span={19}><span style={{color: "red",fontSize: 10}}>请填写旧密码</span></Col>
                </Row>
            })
        }else{
            this.setState({
                oldPasswordAlert: <br/>
            })
        }
    }

    handlePasswordModifyNewBlur(e){
        if(e.target.value === ""){
            this.setState({
                newPasswordAlert: <Row>
                    <Col span={5}></Col>
                    <Col span={19}><span style={{color: "red",fontSize: 10}}>请填写新密码</span></Col>
                </Row>
            })
        }else if(this.state.newPassword !== this.state.newPasswordAgain){
            this.setState({
                newPasswordAlert: <Row>
                    <Col span={5}></Col>
                    <Col span={19}><span style={{color: "red",fontSize: 10}}>新旧密码不一致</span></Col>
                </Row>
            })
        }else{
            this.setState({
                newPasswordAlert: <br/>
            })
        }
    }

    handlePasswordModifyNewAgainBlur(e){
        if(e.target.value === ""){
            this.setState({
                newPasswordAgainAlert: <Row>
                    <Col span={5}></Col>
                    <Col span={19}><span style={{color: "red",fontSize: 10}}>请重新填写新密码</span></Col>
                </Row>
            })
        }else if(this.state.newPassword !== this.state.newPasswordAgain){
            this.setState({
                newPasswordAgainAlert: <Row>
                    <Col span={5}></Col>
                    <Col span={19}><span style={{color: "red",fontSize: 10}}>新旧密码不一致</span></Col>
                </Row>
            })
        }else{
            this.setState({
                newPasswordAgainAlert: <br/>
            })
        }
    }

    handlePasswordModify(){
        const State = this.state;
        if(State.oldPassword === ""||State.newPassword === ""||State.newPasswordAgain === ""){
            return;
        }else if(State.newPassword!==State.newPasswordAgain){
            return;
        }else{
            let jsonObj = {
                username: this.state.username,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            };
            let jsonString = JSON.stringify(jsonObj);
            let xmlhttp;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    let responseObj = JSON.parse(xmlhttp.responseText);
                    if(responseObj.errcode === "000"){
                        message.success("修改成功！请重新登录！");
                        localStorage.clear();
                        hashHistory.push({
                            pathname: "/"
                        })
                    }else{
                        message.warning(responseObj.errcontent);
                    }
                }
            }.bind(this);
            xmlhttp.open("POST","/user/changepassword",true);
            xmlhttp.setRequestHeader("Content-Type","application/json");
            xmlhttp.send(jsonString);
        }
    }

    handleLogout(){
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "000"){
                    message.success("登出成功！");
                    localStorage.clear();
                    hashHistory.push({
                        pathname: "/"
                    })
                }else{
                    message.warning("操作失败！");
                    message.warning(responseObj.errcontent);
                }
            }
        }.bind(this);
        xmlhttp.open("GET","/user/logout",true);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send();
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
        const clientHeight = document.body.clientHeight;
        return(
            <div className="homepageDiv" style={{height: clientHeight,}}>
                <div style={{marginTop: 10}}>
                    <img src={require("../../img/title.png")} style={{width: "35%"}}/>
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
                    onOk={this.handlePasswordModify.bind(this)}
                    onCancel={() => this.setPasswordModifyModalVisible(false)}
                    okText="确认修改"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={5}>旧密码：</Col>
                        <Col span={19}>
                            <Input type="password"
                                   value={this.state.oldPassword}
                                   onChange={this.handlePasswordModifyOldChange.bind(this)}
                                   onBlur={this.handlePasswordModifyOldBlur.bind(this)}
                            />
                        </Col>
                    </Row>
                    {this.state.oldPasswordAlert}
                    <Row>
                        <Col span={5}>新密码：</Col>
                        <Col span={19}>
                            <Input type="password"
                                   value={this.state.newPassword}
                                   onChange={this.handlePasswordModifyNewChange.bind(this)}
                                   onBlur={this.handlePasswordModifyNewBlur.bind(this)}
                            />
                        </Col>
                    </Row>
                    {this.state.newPasswordAlert}
                    <Row>
                        <Col span={5}>确认新密码：</Col>
                        <Col span={19}>
                            <Input type="password"
                                   value={this.state.newPasswordAgain}
                                   onChange={this.handlePasswordModifyNewAgainChange.bind(this)}
                                   onBlur={this.handlePasswordModifyNewAgainBlur.bind(this)}
                            />
                        </Col>
                    </Row>
                    {this.state.newPasswordAgainAlert}
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
                                <Menu.Item key="lost"><Link to="/homePage/cashier/bookLost">丢失</Link></Menu.Item>
                                <Menu.Item key="finesDeal"><Link to="/homePage/cashier/finesManage">罚金处理</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="bookSearch"><Link to="/homePage/BookManage">书刊管理</Link></Menu.Item>
                            <Menu.Item key="userSearch"><Link to="/homePage/ReaderManage">读者管理</Link></Menu.Item>

                            <Menu.Item key="loaningCount"><Link to="/homePage/borrowRankCount">借阅名次统计</Link></Menu.Item>
                            <Menu.Item key="borrowOrderCount"><Link to="/homePage/borrowCount">外借统计</Link></Menu.Item>
                            <Menu.Item key="moneyCount"><Link to="/homePage/depositFineCount">押金/罚金统计</Link></Menu.Item>
                            <Menu.Item key="userBookCount"><Link to="/homePage/userManageCount">读者管理统计</Link></Menu.Item>
                            <Menu.Item key="circulationLogCount"><Link to="/homePage/circulationLogCount">流通日志统计</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="userManage">
                            <Link to="/homePage/userManage"><Icon type="team" />用户管理</Link>
                        </Menu.Item>
                        <Menu.Item key="excel">
                            <Link to="/homePage/upload"><Icon type="export" />Excel书目数据导入</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div key={this.props.location.pathname} >
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