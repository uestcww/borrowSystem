import React from 'react';
import { Table, Button, Input } from 'antd';

import "../../../css/circulation/manage/readerManage.css";

const Search = Input.Search;

class ReaderManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            data: [
                {
                    key: "0",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "1",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "2",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "3",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "4",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "5",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "6",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "7",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "8",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "9",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "10",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "11",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "12",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
                {
                    key: "13",
                    readerbarcode: "123",
                    name: "魏巍",
                    idnumber: "130636199603260012",
                    photo: "图片",
                    birthday: "1996-03-26",
                    gender: "男",
                    deposit: "100W",
                    regdate: "2017-01-01",
                    validdate: "2018-01-01",
                    isrevoke: "是",
                    islost: "否",
                    borrowcount: "500",
                },
            ],
            columns: [
                {
                    title: '读者条形码',
                    dataIndex: 'readerbarcode',
                },
                {
                    title: '读者姓名',
                    dataIndex: 'name',
                },
                {
                    title: '读者身份证号',
                    dataIndex: 'idnumber',
                },
                {
                    title: '照片路径',
                    dataIndex: 'photo',
                },
                {
                    title: '读者生日',
                    dataIndex: 'birthday',
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                },
                {
                    title: '押金金额',
                    dataIndex: 'deposit',
                },
                {
                    title: '注册日期',
                    dataIndex: 'regdate',
                },
                {
                    title: '截止日期',
                    dataIndex: 'validdate',
                },
                {
                    title: '是否被注销',
                    dataIndex: 'isrevoke',
                },
                {
                    title: '是否挂失',
                    dataIndex: 'islost',
                },
                {
                    title: '当前已借数量',
                    dataIndex: 'borrowcount',
                },
                // {
                //     title: "操作",
                //     dataIndex: "operator",
                //     render: (text,record,index) => (
                //         <a onClick={() => this.showUserInfoModifyModal(record)}>修改个人信息</a>
                //     )
                // }
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
                        placeholder="请输入要搜索的读者"
                        onSearch={value => console.log(value)}
                        enterButton
                        className="readerSearchInput"
                    />
                </div>
                <div className="readerTable">
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
export default ReaderManage;