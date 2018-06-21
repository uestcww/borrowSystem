import React from "react"
import { Table, Button, Modal, Row, Col, Input } from 'antd';
import { hashHistory } from "react-router";
import "../../css/homePageAccept.css"
import {message} from "antd/lib/index";

const Search = Input.Search;
const confirm = Modal.confirm;


class HomePageAccept extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentColumn: {},
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
                },
                {
                    title: '用户组id',
                    dataIndex: 'roleId',
                },
                {
                    title: "操作",
                    dataIndex: "operator",
                    render: (text,record,index) => (
                        <a onClick={() => this.showUserAcceptModal(record)}>验收</a>
                    )
                }
            ],
            userAddModalVisible: false,
            count:"",
        }
    }
    handleCountChange(e){
        this.setState({
            count:e.target.value
        })
    }
    handleShoppingSearchChange(e){
        this.setState({
            selectValue:e.target.value
        })
    }
    handleEnterClick(e){
        const jsonObj = {
            value: this.state.selectValue,
            //option: this.state.selectOption,
        };
        const jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if (responseObj.code==="01") {
                    message.warning("输入有误");
                    return;
                }else if (responseObj.code==="00"){
                    let dataList = responseObj.data;
                    let tableData = this.state.data;
                    let dataObj;
                    for (let i = 0;i<dataList.length;i++){
                        dataObj = Object.assign({},dataList[i],{key:i})
                        tableData.push(dataObj);
                    }
                    this.setState({
                        data:tableData
                    });

                }
            }
        }.bind(this);
        xmlhttp.open("GET","/main/searchBooks",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }
    showUserAcceptModal(record){
        //let tempObj = Object.assign({},{password:"",passwordAgain:""},record);
        this.setState({
            //currentColumn: tempObj,
            AcceptModifyModalVisible: true,
        });
    }

    handleModifyAccept(){
        let currentUser = this.state.currentColumn;
        console.log(currentUser);

        let jsonObj = {
            count: currentUser.count,
            //username: currentUser.username,
            //password: currentUser.password,
            //roleId: currentUser.roleId,
        }
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);

                    this.setState({
                        userInfoModifyModalVisible: false,
                        currentColumn: {},

                    });
                    return;

            }
        }.bind(this);
        xmlhttp.open("POST", "url", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
    }
    handleAcceptModifyCancel(){
        this.setState({
            AcceptModifyModalVisible: false,
            currentColumn: {},
        });
    }
    handleAcceptReturnClick(){
        hashHistory.push({
            pathname:"/homePage/check"
        })
    }

    onSelectChange(value) {
        this.setState({
            selectedRowKeys: value
        })
    }
    handleModifyAcceptChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{count: e.target.value}),
        });
    }
    render(){
        const tableStyle = {
            marginTop: 80,
            marginRight: 20,
            marginLeft: 20
        }
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        return(
            <div>
                <div className="searchAccept">
                    <Search
                        type="number"
                        placeholder="请输入索书号"
                        enterButton="Search"
                        size="large"
                        //onSearch={value => console.log(value)}
                        onSearch={this.handleEnterClick.bind(this)}
                        value={this.state.selectValue}
                        onChange={this.handleShoppingSearchChange.bind(this)}
                    />
                </div>
                <div className="searchEditable">
                        <Modal title="验收"
                               visible={this.state.AcceptModifyModalVisible}
                               okText="确定验收"
                               cancelText="取消"
                               onOk={this.handleModifyAccept.bind(this)}
                               onCancel={this.handleAcceptModifyCancel.bind(this)}

                        >
                            <div>
                                <Row>
                                    <Col span={6}>册数</Col>
                                    <Col span={18}>
                                        <Input type="text"
                                               value={this.state.currentColumn.count}
                                               onChange={this.handleModifyAcceptChange.bind(this)}

                                        />
                                    </Col>
                                </Row>
                                <br/>
                            </div>
                        </Modal>
                </div>
                <div style={tableStyle}>

                    <Table
                           columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
                <div className="AcceptReturn">
                    <Button
                              type="primary"
                              onClick={this.handleAcceptReturnClick.bind(this)}

                    >返回</Button>
                </div>
            </div>



        )
    }
}
export default HomePageAccept;