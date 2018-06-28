import React from 'react';
import { Table, Input, Button, Row, Col, Modal } from "antd";
import {message} from "antd/lib/index";

class FinesManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            readerBarcode: "",
            readerName: "",
            readerGender: "",
            readerStatus: "",
            data: [
                {
                    key: "0",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
                {
                    key: "1",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
                {
                    key: "2",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
                {
                    key: "3",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
                {
                    key: "4",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
                {
                    key: "5",
                    readerBarcode: "007",
                    bookBarcode: "008",
                    bookName: "母猪的产后护理",
                    borrowDate: "2018-01-01",
                    endDate: "3018-01-01",
                },
            ],
            columns: [
                {
                    title: '读者条形码',
                    dataIndex: 'readerBarcode',
                },
                {
                    title: '书籍条形码',
                    dataIndex: 'bookBarcode',
                },
                {
                    title: '书籍名称',
                    dataIndex: 'bookName',
                },
                {
                    title: '借阅时间',
                    dataIndex: 'borrowDate',
                },
                {
                    title: '截止日期',
                    dataIndex: 'endDate',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span><a href="javascript:;">确认丢失</a></span>
                    ),
                }
            ],
        };
    }

    handleInputChange(e){
        this.setState({
            readerBarcode: e.target.value,
        })
    }

    handleButtonClick(){
        let url = "/library/reader/getreaderbyid?readerbarcode="+this.state.readerBarcode;
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "000"){
                    let status = "正常";
                    if(responseObj.isLost&&responseObj.isRevoke === 2){
                        status = "即将注销且已挂失";
                    }else if(responseObj.isLost){
                        status = "已挂失";
                    }else if(responseObj.isRevoke === 2){
                        status = "即将注销";
                    }
                    if(responseObj.isRevoke === 1){
                        status = "已注销";
                    }
                    this.setState({
                        readerName: responseObj.name,
                        readerGender: responseObj.gender,
                        readerStatus: status,
                    });
                    this.getReaderBook();
                }else{
                    this.setState({
                        readerName: "",
                        readerGender: "",
                        readerStatus: "",
                    });
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

    getReaderBook(){
        let url = "/library/reader/getreadernowrented?readerbarcode="+this.state.readerBarcode;
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "000"){
                    let data = responseObj.data;
                    let bookData = [];
                    for(let i=0;i<data.length;i++){
                        let endTime = new Date(data[i].returnTime);
                        /*


                        function timestampToTime(timestamp) {
                            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                            Y = date.getFullYear() + '-';
                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                            D = date.getDate() + ' ';
                            h = date.getHours() + ':';
                            m = date.getMinutes() + ':';
                            s = date.getSeconds();
                            return Y+M+D+h+m+s;
                        }
                        timestampToTime(1403058804);
                        console.log(timestampToTime(1403058804));//2014-06-18 10:33:24

                        * */
                        /*
                        * 1.加一个字段，就是借书时间
                        * 2.时间戳一共几位，是不是固定长的
                        *
                        *
                        * */
                        let bookObj = {
                            key: i,
                            readerBarcode: data[i].borrowPersonID,
                            bookBarcode: data[i].bookBarcode,
                            bookName: data[i].title,
                            borrowDate: data[i].borrowDate,
                            endDate: data[i].returnTime,
                        };
                        bookData.push(bookObj);
                    }
                    this.setState({
                        data: bookData,
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
                <div style={{marginTop: 20}}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={4}>
                            <Input type="text"
                                   placeholder="请输入读者条码"
                                   value={this.state.readerBarcode}
                                   onChange={this.handleInputChange.bind(this)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button type="primary"
                                    onClick={this.handleButtonClick.bind(this)}
                            >确定</Button>
                        </Col>
                        <Col span={3}>读者姓名：{this.state.readerName}</Col>
                        <Col span={2}>性别：{this.state.readerGender}</Col>
                        <Col span={4}>账户状态：{this.state.readerStatus}</Col>
                        <Col span={4}></Col>
                    </Row>
                </div>
                <div style={{margin: 20,}}>
                    <Table columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        )
    }
}
export default FinesManage;