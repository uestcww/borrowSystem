import React from 'react';
import { Table, Button, Input, Select, Row, Col } from 'antd';

import "../../../css/circulation/manage/bookManage.css";
import {message} from "antd/lib/index";

const Option = Select.Option;

class BookManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookSelect: "1",
            inputValue: "",
            selectedRowKeys: [],
            loading: false,
            columns: [
                {
                    title: '书编号',
                    dataIndex: 'bookIndex',
                },
                {
                    title: '书名',
                    dataIndex: 'title',
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                },
                {
                    title: 'ISBN',
                    dataIndex: 'isbn',
                },
                {
                    title: '出版社',
                    dataIndex: 'publisher',
                },
                {
                    title: '索书号',
                    dataIndex: 'callNumber',
                },
                {
                    title: '出版日期',
                    dataIndex: 'publishDate',
                },
                {
                    title: '总页数',
                    dataIndex: 'pages',
                },
                {
                    title: '开本',
                    dataIndex: 'format',
                },
                {
                    title: "操作",
                    dataIndex: "operator",
                    render: (text,record,index) => (
                        <a>编辑</a>
                    )
                }
            ],
        };
    }

    handleInputChange(e){
        this.setState({
            inputValue: e.target.value,
        })
    }

    handleSelectChange(value) {
        this.setState({
            bookSelect: value,
        })
    }

    handleSearchClick(){
        let jsonObj = {
            searchType: this.state.bookSelect,
            searchStr: this.state.bookbarcode,
        };
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "00"){
                    let data = responseObj.data;
                    let bookData = [];
                    for(let i =0;i<data.length;i++){
                        let bookObj = Object.assign({},data[i],{key: i});
                        bookData.push(bookObj);
                    }
                    this.setState({
                        data: [],
                    },this.setState({
                        data: bookData,
                    }))
                }else if(responseObj.code === "01"){
                    message.warning("操作失败，请重试！");
                }
            }
        }.bind(this);
        xmlhttp.open("POST","/main/searchBooks",true);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
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
                                value={this.state.inputValue}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </Col>
                        <Col span={2}>
                            <Select value={this.state.bookSelect} style={{ width: 150 }} onChange={this.handleSelectChange.bind(this)}>
                                <Option value="1">标题</Option>
                                <Option value="2">作者（或责任人）</Option>
                                <Option value="3">索书号</Option>
                                <Option value="4">ISBN号</Option>
                                <Option value="5">条形码</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Button type="primary"
                                    onClick={this.handleSearchClick.bind(this)}
                            >搜索</Button>
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