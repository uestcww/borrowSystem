import React from 'react';
import { Table, Button, Input, Select, Row, Col } from 'antd';

import "../../../css/circulation/manage/bookManage.css";

const Option = Select.Option;

class BookManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookSelect: "title",
            selectedRowKeys: [],
            loading: false,
            columns: [
                {
                    title: '书编号',
                    dataIndex: 'id',
                },
                {
                    title: '书名',
                    dataIndex: 'username',
                    key: "username",
                },
                {
                    title: '作者',
                    dataIndex: 'roleId',
                },
                {
                    title: 'ISBN',
                    dataIndex: 'roleId',
                },
                {
                    title: '出版社',
                    dataIndex: 'roleId',
                },
                {
                    title: '索书号',
                    dataIndex: 'roleId',
                },
                {
                    title: '作者',
                    dataIndex: 'roleId',
                },
                {
                    title: '作者',
                    dataIndex: 'roleId',
                },
                {
                    title: '作者',
                    dataIndex: 'roleId',
                },
                {
                    title: '作者',
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

    handleSelectChange(value) {
        this.setState({
            bookSelect: value,
        })
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
                <div className="bookQueryDiv">
                    <Row>
                        <Col span={8}></Col>
                        <Col span={5}>
                            <Input
                                placeholder="请输入要搜索的书籍"
                                type="text"
                            />
                        </Col>
                        <Col span={2}>
                            <Select value={this.state.bookSelect} style={{ width: 150 }} onChange={this.handleSelectChange.bind(this)}>
                                <Option value="title">标题</Option>
                                <Option value="author">作者（或责任人）</Option>
                                <Option value="callNumber">索书号</Option>
                                <Option value="isbn">ISBN号</Option>
                                <Option value="barcode">条形码</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" >搜索</Button>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                </div>
                <div className="bookTableDiv">
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