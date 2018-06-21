import React from "react";
import { Table, Button, Row, Col, Input, Radio } from 'antd';

import "../../../css/circulation/statistics/userBookManage.css";

const RadioGroup = Radio.Group;

class UserBookManageOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
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
            optionRadio: 1,
        };
    }

    handleOptionValue(e){
        this.setState({
            optionRadio: e.target.value
        });
    }

    onSelectChange(value){
        this.setState({
            selectedRowKeys: value
        });
    }

    render(){
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div>
                <div className="queryDiv">
                    <br/>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={4}>请选择类型：</Col>
                        <Col span={16}>
                            <RadioGroup value={this.state.optionRadio} onChange={this.handleOptionValue.bind(this)}>
                                <Radio value={1}>外借</Radio>
                                <Radio value={2}>续借</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>请输入读者条码：</Col><Col span={8}><Input type="text" /></Col><Col span={2}></Col><Col span={8}><Button type="primary">确定</Button></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>请输入书籍条码：</Col><Col span={8}><Input type="text" /></Col><Col span={2}></Col><Col span={8}><Button type="primary">确定</Button></Col>
                    </Row>
                </div>
                <div className="tableDiv">
                    <Table rowSelection={rowSelection}
                           columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        );
    }
}
export default UserBookManageOrder;