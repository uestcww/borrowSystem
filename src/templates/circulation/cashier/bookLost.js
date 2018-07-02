import React from 'react';
import { Table, Input, Button, Row, Col, message, Modal } from "antd";

const confirm = Modal.confirm;

class bookLost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            readerBarcode: "",
            readerName: "",
            readerGender: "",
            readerStatus: "",
            data: [],
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
                    dataIndex: 'startDate',
                },
                {
                    title: '截止日期',
                    dataIndex: 'endDate',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text,record,index) => (
                        <span><a onClick={() => this.confirmLost(text,record,index)}>确认丢失</a></span>
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
                        let startTime = new Date(data[i].borrowTime);
                        let endTime = new Date(data[i].returnTime);
                        let bookObj = {
                            key: i,
                            readerBarcode: data[i].borrowPersonID,
                            bookBarcode: data[i].bookBarcode,
                            bookName: data[i].title,
                            startDate: `${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()}`,
                            endDate: `${endTime.getFullYear()}-${endTime.getMonth()+1}-${endTime.getDate()}`,
                        };
                        bookData.push(bookObj);
                    }
                    this.setState({
                        data: []
                    },this.setState({
                        data: bookData,
                    }))
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

    confirmLost(text,record,index){
        confirm({
            title: '确定丢失？',
            content: '',
            onOk(){
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let jsonObj = {
                            borrowPersonId: record.readerBarcode,
                            bookBarCode: record.bookBarcode
                        };
                        let jsonString = JSON.stringify(jsonObj);
                        let xmlhttp;
                        xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function(){
                            if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
                                let responseObj = JSON.parse(xmlhttp.responseText);
                                if(responseObj.code === "00"){
                                    message.success("操作成功！");
                                    this.handleButtonClick();
                                }else{
                                    message.warning(responseObj.msg);
                                }
                            }
                        }.bind(this);
                        xmlhttp.open("POST","/main/lostBooks",true);
                        xmlhttp.setRequestHeader("Content-Type","application/json");
                        xmlhttp.send(jsonString);
                    }, 600);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
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
                <div style={{margin: 20}}>
                    <Table columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        )
    }
}
export default bookLost;