import React from 'react';
import { Table, Button, Input } from 'antd';

import "../../../css/circulation/manage/bookManage.css";

const Search = Input.Search;

class BookManage extends React.Component{
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
        };
    }

    onSelectChange(value) {
        this.setState({
            selectedRowKeys: value
        })
    }

    render(){
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div>
                <div>
                    <Search
                        placeholder="请输入要搜索的书籍"
                        onSearch={value => console.log(value)}
                        enterButton
                        className="bookSearchInput"
                    />
                </div>
                <div className="bookTable">
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary"
                        >添加</Button>
                        &nbsp;&nbsp;
                        <Button type="primary"
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
export default BookManage;