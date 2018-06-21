import React from 'react';
import { Table, Button, Modal, Row, Col, Input, message } from 'antd';

const confirm = Modal.confirm;

class UserManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            userInfoModifyModalVisible: false,
            currentColumn: {},
            userModifyUsernameAlert: <br/>,
            userModifyPasswordAlert: <br/>,
            userModifyRoleIdAlert: <br/>,
            data: [
                {
                    key: "0",
                    id: "001",
                    username: "我就会瞎打",
                    roleId: "a"
                },
                {
                    key: "1",
                    id: "002",
                    username: "我只会瞎打",
                    roleId: "bb"
                },
                {
                    key: "2",
                    id: "003",
                    username: "我就会瞎玩",
                    roleId: "ccc"
                },
                {
                    key: "3",
                    id: "004",
                    username: "我只会瞎玩",
                    roleId: "dddd"
                },
                {
                    key: "4",
                    id: "005",
                    username: "天天吃鸡",
                    roleId: "eeeee"
                },
                {
                    key: "5",
                    id: "006",
                    username: "天天素材库",
                    roleId: "ffffff"
                },
                {
                    key: "6",
                    id: "007",
                    username: "逗鱼时刻",
                    roleId: "ggggggg"
                },
                {
                    key: "7",
                    id: "008",
                    username: "煮鸡时刻",
                    roleId: "hhhhhhhh"
                }
            ],
            columns: [
                {
                    title: '代理键id',
                    dataIndex: 'id',
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: "username",
                },
                {
                    title: '用户组id',
                    dataIndex: 'roleId',
                },
                {
                    title: "操作",
                    dataIndex: "operator",
                    render: (text,record,index) => (
                        <a onClick={() => this.showUserInfoModifyModal(record)}>修改个人信息</a>
                    )
                }
            ],
            userAddModalVisible: false,
            userAddUsernameAlert: <br/>,
            userAddPasswordAlert: <br/>,
            userAddPasswordAgainAlert: <br/>,
            userAddRoleIdAlert: <br/>,
            newUserAddObject: {},
        }
    }

    componentWillMount(){
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "002"){
                    message.warning("您还没有登录，请登录后重新打开此页面");
                    return;
                }else if(responseObj.errcode === "003"){
                    message.error("您没有权限访问！");
                    return;
                }else if(responseObj.errcode === "000"){
                    responseObj.data[0].title
                    let dataList = responseObj.userlist;
                    let tableData = this.state.data;
                    let dataObj;
                    for(let i=0;i<dataList.length;i++){
                        dataObj = Object.assign({},dataList[i],{key:i})
                        tableData.push(dataObj);
                    }
                    this.setState({
                        data: tableData
                    });
                }
            }
        }.bind(this);
        xmlhttp.open("GET", "/user/getalluser", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send();
    }

    showUserInfoModifyModal(record){
        let tempObj = Object.assign({},{password:"",passwordAgain:""},record);
        this.setState({
            currentColumn: tempObj,
            userInfoModifyModalVisible: true,
        });
    }

    handleModifyInfo(){
        let currentUser = this.state.currentColumn;
        let flag = false;
        if(currentUser.username === ""){
            flag = true;
        }
        if(currentUser.roleId === ""){
            flag = true;
        }
        if(currentUser.password !== ""||currentUser.passwordAgain !== ""){
            if(currentUser.password !== currentUser.passwordAgain){
                flag = true;
            }
        }
        if(flag){
            return;
        }
        let jsonObj = {
            id: currentUser.id,
            username: currentUser.username,
            password: currentUser.password,
            roleId: currentUser.roleId,
        }
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "002"){
                    message.warning("您还没有登录，请登录后重试");
                    return;
                }else if(responseObj.errcode === "003"){
                    message.error("您没有权限执行此操作！");
                    return;
                }else if(responseObj.errcode === "000"){
                    message.success("修改成功！");
                    let tempData = this.state.data;
                    let tempUserInfo = Object.assign({},jsonObj,{key: currentUser.key});
                    tempData[tempUserInfo.key] = tempUserInfo;
                    this.setState({
                        data: tempData,
                        userInfoModifyModalVisible: false,
                        currentColumn: {},
                        userModifyUsernameAlert: <br/>,
                        userModifyPasswordAlert: <br/>,
                        userModifyRoleIdAlert: <br/>,
                    });
                    return;
                }
            }
        }.bind(this);
        xmlhttp.open("POST", "/user/modify", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
    }

    handleUserInfoModifyCancel(){
        this.setState({
            userInfoModifyModalVisible: false,
            currentColumn: {},
            userModifyUsernameAlert: <br/>,
            userModifyPasswordAlert: <br/>,
            userModifyRoleIdAlert: <br/>,
        });
    }

    handleModifyInfoUsernameChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{username: e.target.value}),
        });
    }

    handleModifyInfoPasswordChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{password: e.target.value}),
        });
    }

    handleModifyInfoPasswordAgainChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{passwordAgain: e.target.value}),
        });
    }

    handleModifyInfoRoleIdChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{roleId: e.target.value}),
        });
    }

    handleModifyInfoUsernameBlur(e){
        if(e.target.value === ""){
            this.setState({
                userModifyUsernameAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>用户名不能为空</span></Col>
                </Row>
            })
        }else{
            this.setState({
                userModifyUsernameAlert: <br/>
            })
        }
    }

    handleModifyInfoPasswordBlur(e){
        const tempColumn = this.state.currentColumn;
        if(tempColumn.password !== ""||tempColumn.passwordAgain !== ""){
            if(tempColumn.password === tempColumn.passwordAgain){
                this.setState({
                    userModifyPasswordAlert: <br/>
                });
            }else{
                this.setState({
                    userModifyPasswordAlert: <Row>
                        <Col span={6}></Col>
                        <Col span={18}><span style={{color: "red",fontSize: 10}}>两次输入不一致</span></Col>
                    </Row>
                });
            }
        }else{
            this.setState({
                userModifyPasswordAlert: <br/>
            });
        }
    }

    handleModifyInfoRoleIdBlur(e){
        if(e.target.value === ""){
            this.setState({
                userModifyRoleIdAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>用户组名不能为空</span></Col>
                </Row>
            })
        }else{
            this.setState({
                userModifyRoleIdAlert: <br/>
            })
        }
    }

    showUserAddModal(){
        this.setState({
            userAddModalVisible: true,
            newUserAddObject: {
                username: "",
                password: "",
                passwordAgain: "",
                roleId: "",
            },
        });
    }

    handleUserAddModalOk(){
        let newUser = this.state.newUserAddObject;
        let flag = false;
        if(newUser.username === ""){
            flag = true;
        }
        if(newUser.roleId === ""){
            flag = true;
        }
        if(newUser.password !== ""||newUser.passwordAgain !== ""||newUser.password !== newUser.passwordAgain){
            flag = true;
        }
        if(flag){
            return;
        }
        let jsonObj = {
            username: newUser.username,
            password: newUser.password,
            roleId: newUser.roleId,
        }
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "002"){
                    message.warning("您还没有登录，请登录后重试");
                    return;
                }else if(responseObj.errcode === "003"){
                    message.error("您没有权限执行此操作！");
                    return;
                }else if(responseObj.errcode === "000"){
                    message.success("添加成功！");
                    location.reload();
                }
            }
        }.bind(this);
        xmlhttp.open("POST","/user/insertuser",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }

    handleUserAddCancel(){
        this.setState({
            userAddModalVisible: false,
            newUserAddObject: {},
        })
    }

    handleUserAddUsernameChange(e){
        this.setState({
            newUserAddObject: Object.assign({},this.state.newUserAddObject,{username: e.target.value}),
        });
    }

    handleUserAddPasswordChange(e){
        this.setState({
            newUserAddObject: Object.assign({},this.state.newUserAddObject,{password: e.target.value}),
        });
    }

    handleUserAddPasswordAgainChange(e){
        this.setState({
            newUserAddObject: Object.assign({},this.state.newUserAddObject,{passwordAgain: e.target.value}),
        });
    }

    handleUserAddRoleIdChange(e){
        this.setState({
            newUserAddObject: Object.assign({},this.state.newUserAddObject,{roleId: e.target.value}),
        });
    }

    handleUserAddUsernameBlur(e){
        if(e.target.value === ""){
            this.setState({
                userAddUsernameAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>用户名不能为空</span></Col>
                </Row>
            });
        }else{
            this.setState({
                userAddUsernameAlert: <br/>
            });
        }
    }

    handleUserAddPasswordBlur(e){
        if(e.target.value === ""){
            this.setState({
                userAddPasswordAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>密码不能为空</span></Col>
                </Row>
            });
        }else{
            this.setState({
                userAddPasswordAlert: <br/>
            });
        }
    }

    handleUserAddPasswordAgainBlur(e){
        if(e.target.value === ""){
            this.setState({
                userAddPasswordAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>确认密码不能为空</span></Col>
                </Row>
            });
        }else{
            this.setState({
                userAddPasswordAlert: <br/>
            });
        }
    }

    handleUserAddRoleIdBlur(e){
        if(e.target.value === ""){
            this.setState({
                userAddRoleIdAlert: <Row>
                    <Col span={6}></Col>
                    <Col span={18}><span style={{color: "red",fontSize: 10}}>用户组名不能为空</span></Col>
                </Row>
            });
        }else{
            this.setState({
                userAddRoleIdAlert: <br/>
            });
        }
    }

    handleDeleteUser(){
        const that = this;
        confirm({
            title: '您是否确认要删除这些内容',
            content: 'balabalabala',
            onOk() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
            },
            onCancel() {},
        });
    }

    onSelectChange(value) {
        this.setState({
            selectedRowKeys: value
        })
    }

    render(){
        const tableStyle = {
            marginTop: 20,
            marginRight: 20,
            marginLeft: 20
        };
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div>
                <Modal title="修改用户信息"
                       visible={this.state.userInfoModifyModalVisible}
                       okText="确定修改"
                       cancelText="取消"
                       onOk={this.handleModifyInfo.bind(this)}
                       onCancel={this.handleUserInfoModifyCancel.bind(this)}
                >
                    <div>
                        <Row>
                            <Col span={6}>代理键id</Col>
                            <Col span={18}>
                                <Input type="text"
                                       value={this.state.currentColumn.id}
                                       disabled
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={6}>用户名</Col>
                            <Col span={18}>
                                <Input type="text"
                                       value={this.state.currentColumn.username}
                                       onChange={this.handleModifyInfoUsernameChange.bind(this)}
                                       onBlur={this.handleModifyInfoUsernameBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userModifyUsernameAlert}
                        <Row>
                            <Col span={6}>用户密码</Col>
                            <Col span={18}>
                                <Input type="password"
                                       value={this.state.currentColumn.password}
                                       onChange={this.handleModifyInfoPasswordChange.bind(this)}
                                       placeholder="不修改密码请不要输入内容"
                                       onBlur={this.handleModifyInfoPasswordBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userModifyPasswordAlert}
                        <Row>
                            <Col span={6}>确认用户密码</Col>
                            <Col span={18}>
                                <Input type="password"
                                       value={this.state.currentColumn.passwordAgain}
                                       onChange={this.handleModifyInfoPasswordAgainChange.bind(this)}
                                       placeholder="不修改密码请不要输入内容"
                                       onBlur={this.handleModifyInfoPasswordBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={6}>用户组</Col>
                            <Col span={18}>
                                <Input type="text"
                                       value={this.state.currentColumn.roleId}
                                       onChange={this.handleModifyInfoRoleIdChange.bind(this)}
                                       onBlur={this.handleModifyInfoRoleIdBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userModifyRoleIdAlert}
                    </div>
                </Modal>
                <Modal title="添加新用户"
                       visible={this.state.userAddModalVisible}
                       okText="添加"
                       cancelText="取消"
                       onOk={this.handleUserAddModalOk.bind(this)}
                       onCancel={this.handleUserAddCancel.bind(this)}
                >
                    <div>
                        <Row>
                            <Col span={6}>用户名</Col>
                            <Col span={18}>
                                <Input type="text"
                                       value={this.state.newUserAddObject.username}
                                       onChange={this.handleUserAddUsernameChange.bind(this)}
                                       onBlur={this.handleUserAddUsernameBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userAddUsernameAlert}
                        <Row>
                            <Col span={6}>密码</Col>
                            <Col span={18}>
                                <Input type="password"
                                       value={this.state.newUserAddObject.password}
                                       onChange={this.handleUserAddPasswordChange.bind(this)}
                                       onBlur={this.handleUserAddPasswordBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userAddPasswordAlert}
                        <Row>
                            <Col span={6}>确认密码</Col>
                            <Col span={18}>
                                <Input type="password"
                                       value={this.state.newUserAddObject.passwordAgain}
                                       onChange={this.handleUserAddPasswordAgainChange.bind(this)}
                                       onBlur={this.handleUserAddPasswordAgainBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userAddPasswordAgainAlert}
                        <Row>
                            <Col span={6}>用户组</Col>
                            <Col span={18}>
                                <Input type="text"
                                       value={this.state.newUserAddObject.roleId}
                                       onChange={this.handleUserAddRoleIdChange.bind(this)}
                                       onBlur={this.handleUserAddRoleIdBlur.bind(this)}
                                />
                            </Col>
                        </Row>
                        {this.state.userAddRoleIdAlert}
                    </div>
                </Modal>
                <div style={tableStyle}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary"
                                onClick={this.showUserAddModal.bind(this)}
                        >添加</Button>
                        &nbsp;&nbsp;
                        <Button type="primary"
                                onClick={this.handleDeleteUser.bind(this)}
                                disabled={!hasSelected}
                        >删除</Button>
                    </div>
                    <Table rowSelection={rowSelection}
                           columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        )
    }
}
export default UserManage;