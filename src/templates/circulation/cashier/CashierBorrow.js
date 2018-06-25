import React from 'react';
import { Input, Table, Row, Col, Radio, Button } from 'antd';

import "../../../css/circulation/ciasher/CiasherBorrow.css";

const RadioGroup = Radio.Group;

class CashierBorrow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
            optionRadio: 1,
            bookDisabled: true,
        };
    }

    handleOptionValue(e){
        this.setState({
            optionRadio: e.target.value
        });
    }

    render(){
        return(
            <div className="borrowBodyDiv">
                <div className="borrowQueryDiv">
                    <div>
                        <Row>
                            <Col span={2}>外借/续借：</Col>
                            <Col span={2}>
                                <RadioGroup onChange={this.handleOptionValue.bind(this)} value={this.state.optionRadio}>
                                    <Radio value={1}>外借</Radio>
                                    <Radio value={2}>续借</Radio>
                                </RadioGroup>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={2}>读者条形码：</Col>
                            <Col span={2}><Input /></Col>
                            <Col span={1}></Col>
                            <Col span={2}><Button>确定</Button></Col>
                            <Col span={2}></Col>
                            <Col span={2}>书籍条形码：</Col>
                            <Col span={2}><Input disabled={this.state.bookDisabled} /></Col>
                            <Col span={1}></Col>
                            <Col span={2}><Button disabled={this.state.bookDisabled}>确定</Button></Col>
                        </Row>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="borrowInfoDiv">
                    <Table columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        )
    }
}
export default CashierBorrow;

