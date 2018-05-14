import React from 'react';
import { Table, Button, Modal } from 'antd';

const confirm = Modal.confirm;

const columns = [{
    title: '用户名',
    dataIndex: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age: 32,
        address: `西湖区湖底公园${i}号`,
    });
}

class UserManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag: "weiwei",
            selectedRowKeys: [],
            loading: false,
        }
    }

    handleAddUser() {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    handleDeleteUser(){
        const that = this;
        confirm({
            title: '您是否确认要删除这些内容',
            content: 'balabalabala',
            onOk() {
                console.log(that.state.flag);
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
            },
            onCancel() {},
        });
    }

    onSelectChange(value) {
        console.log(value);
        this.setState({
            selectedRowKeys: value
        })
    }

    render(){
        const tableStyle = {
            marginTop: 20,
            marginRight: 20,
            marginLeft: 20
        }
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div>
                <div style={tableStyle}>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary"
                                onClick={this.handleAddUser.bind(this)}
                        >添加</Button>
                        &nbsp;&nbsp;
                        <Button type="primary"
                                onClick={this.handleDeleteUser.bind(this)}
                                disabled={!hasSelected}
                        >删除</Button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}
export default UserManage;