import React from "react";
import { Table, Button, Row, Col, Radio, DatePicker, Input } from 'antd';

import "../../../css/circulation/statistics/userManage.css";
import {message} from "antd/lib/index";

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class borrowOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            readerBarcode:"",
            data: [
                {
                    key: "0",
                    borrowPersonID: "0000001",
                    bookBarcode: "王建国",
                    title: "添加",
                    startDate: "2010-01-01",
                    endDate: "2018-06-01",
                },
            ],
            columns: [
                {
                    title: '读者条码',
                    dataIndex: 'borrowPersonID',
                },
                {
                    title: '书籍条码',
                    dataIndex: 'bookBarcode',
                },
                {
                    title: '书名',
                    dataIndex: 'title',
                },
                {
                    title: '借阅时间',
                    dataIndex: 'startDate',
                },
                {
                    title: '应还时间',
                    dataIndex: 'endDate',
                },
            ],
        };
    }

    handleButtonClick(){
        let url = "/library/reader/getreadernowrented?readerbarcode="+this.state.readerBarcode;
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "000"){
                    let responseData = responseObj.data;
                    let data = [];
                    for(let i=0;i<responseData.length;i++){
                        let startDate = new Date(responseData[i].borrowTime);
                        let endDate = new Date(responseData[i].returnTime);
                        let dataObj = {
                            key: i,
                            borrowPersonID: responseData[i].borrowPersonID,
                            bookBarcode: responseData[i].bookBarcode,
                            title: responseData[i].title,
                            startDate: `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`,
                            endDate: `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`,
                        };
                        data.push(dataObj);
                    }
                    this.setState({
                        data: data,
                    })
                }else{
                    if(responseObj.errcode=="002"||responseObj.errcode=="004"){
                        message.warning("未登录或用户不存在！");
                    }else if(responseObj.errcode=="003"){
                        message.warning("您没有这个权限！");
                    }else if(responseObj.errcode=="500"){
                        message.error("未知错误！");
                    }
                }
            }
        }.bind(this);
        xmlhttp.open("GET",url,true);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send();
    }

    render(){
        return(
            <div>
                <div className="queryDiv">
                    <Row>
                        <Col span={8}></Col>
                        <Col span={5}>
                            <Input type="text"
                                   placeholder="请输入读者条码"
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button type="primary"
                            >确定</Button>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
                <div className="tableDiv">
                    <Table columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        );
    }
}
export default borrowOrder;