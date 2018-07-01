import React from 'react';
import { Select } from 'antd';
import { Form, Button, Input } from "antd";
import { DatePicker } from 'antd';
import { Table } from 'antd';
import { Router, Route, hashHistory} from 'react-router';
import {message} from "antd/lib/index";
import "../../css/homepage.css";
import "../../css/homePageCheckStatistic.css"

const FormItem = Form.Item;
const { RangePicker} = DatePicker;


class HomePageOrderStatistic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            columns : [ {
                title: '标题',
                dataIndex: 'title',
                //width: 150,
            }, {
                title: '作者',
                dataIndex: 'author',
                //width:150,
            },{
                title: '索书号',
                dataIndex: 'callNumber',
                //width: 150,
            },{
                title: 'isbn号',
                dataIndex: 'isbn',
                //width: 150,
            },{
                title: '出版社',
                dataIndex: 'publisher',
                //width: 150,
            },{
                title: '出版日期',
                dataIndex: 'publishDate',
                //width: 150,
            },{
                title: '书的馆藏数量',
                dataIndex: 'count',
                //width: 150,
            },{
                title: '单价',
                dataIndex: 'price',
                //width: 150,
            },{
                title: '页码',
                dataIndex: 'pages',
                //width: 150,
            },{
                title: '书的来源',
                dataIndex: 'bookSource',
                //width: 150,
            },{
                title:'订购人',
                dataIndex:'person'
            }],
            batchNumber:null,
            person:null,
            bookSource:"",
            startDate:"",
            endDate:"",
            bookSourceAlert:"",
            startDateAlert:"",
            endDateAlert:"",
            pageNumber:1,
            kindCount:0
        }
    }

    handleDateChange(date,dateString) {
        this.setState({
            endDate:dateString
        })
    }
    handleBeginDateChange(date,dateString){
        this.setState({
            startDate:dateString
        })
    }



    handleBookSourceOnBlur(e) {
        if (this.state.bookSource == "") {
            this.setState({
                bookSourceAlert: "请输入书来源"
            })
        } else {
            this.setState({
                bookSourceAlert: ""
            })
        }
    }
    handleStartDateOnBlur() {
        if (this.state.startDate == "") {
            this.setState({
                startDateAlert: "请选择开始时间"
            })
        } else {
            this.setState({
                startDateAlert: ""
            })
        }
    }
    handleEndDateOnBlur(e) {
        if (this.state.endDate == "") {
            this.setState({
                endDateAlert: "请选择结束时间"
            })
        } else {
            this.setState({
                endDateAlert: ""
            })
        }
    }
    handleBatchNumberChange(e){
        if (e.target.value==""){
            this.setState({
                batchNumber:null
            })
        } else {
            this.setState({
                batchNumber:e.target.value
            })
        }


    }
    handlePersonChange(e) {
        if (e.target.value=="") {
            this.setState({
                person: null

            })
        }else {
            this.setState({
                person: e.target.value
            })
        }
    }
    handleBookSourceChange(e) {
        this.setState({
            bookSource:e.target.value
        })
    }
    handleStartDateChange(e){
        this.setState({
            startDate:e.target.value
        })

    }
    handleEndDateChange(e){
        this.setState({
            endDate:e.target.value
        })

    }

    handleOrderStatisticClick(e){
        /* hashHistory.push({
             pathname:""
         })*/
        let flag = false;
        if (this.state.bookSource==""){
            flag = true;
            this.setState({bookSourceAlert:"请输入图书来源"})
        }
        if (this.state.startDate===""){
            flag = true;
            this.setState({startDateAlert:"请选择开始时间"})
        }
        if (this.state.endDate===""){
            flag = true;
            this.setState({endDateAlert:"请选择结束时间"})
        }
        if(flag){
            return;
        }
        const jsonObj = {
            batchNumber:this.state.batchNumber,
            person:this.state.person,
            bookSource:this.state.bookSource,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            pageNumber:this.state.pageNumber
        };
        const jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if (responseObj.code==="01") {
                    message.warning("输入有误");
                    return;
                }else if (responseObj.code==="00"){
                    let dataList = responseObj.data;
                    let tableData;
                    tableData = [];
                    let dataObj;
                    for (let i = 0;i<dataList.length;i++){
                        dataObj = Object.assign({},dataList[i],{key:i})
                        tableData.push(dataObj);
                    }
                    this.setState({
                        data:tableData,
                        totalPage:responseObj.totalPage,
                        kindCount:tableData[0].kindCount
                    },this.setState({
                        data:[]
                    }));
                }
            }
        }.bind(this);
        xmlhttp.open("POST","order/orderStatistics",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);

    }
    handleExcleClick(e){
        window.open("order/orderExportExcel")

    }
    render(){
        const clientHeight = document.body.clientHeight;
        const that=this;
        const formStyle = {
            width:"100%",
            marginLeft: "auto",
            marginRight: "auto",
        }
        const page={
            onChange: function(page,pageSize){
                const jsonObj = {
                    batchNumber:that.state.batchNumber,
                    person:that.state.person,
                    bookSource:that.state.bookSource,
                    startDate:that.state.startDate,
                    endDate:that.state.endDate,
                    pageNumber:page
                };
                const jsonString = JSON.stringify(jsonObj);
                let xmlhttp;
                xmlhttp=new XMLHttpRequest();
                xmlhttp.onreadystatechange=function() {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        let responseObj = JSON.parse(xmlhttp.responseText);
                        if (responseObj.code==="01") {
                            message.warning("输入有误");
                            return;
                        }else if (responseObj.code==="00"){
                            let dataList = responseObj.data;
                            let tableData= [];
                            let dataObj;
                            for (let i = 0;i<dataList.length;i++){
                                dataObj = Object.assign({},dataList[i],{key:i})
                                tableData.push(dataObj);
                            }
                            that.setState({
                                pageNumber:page,
                                data:tableData,
                                kindCount:tableData[0].kindCount,
                            },that.setState({
                                data:[]
                            }));


                        }
                    }
                }
                xmlhttp.open("POST","order/orderStatistics",false);
                xmlhttp.setRequestHeader("Content-Type","application/json");
                xmlhttp.send(jsonString);
            },
            total:that.state.kindCount,
            pageSize:8
        }
        return(

            <div className="shoppingContent1">
                <div className="shoppingLine1">
                    <div className="shoppingCondition1">
                        <div className="input">
                            <Form>
                                <FormItem className="batchNumber"
                                          label="订购批号"
                                          labelCol={{ span: 8 }}
                                          wrapperCol={{ span: 16 }}
                                >
                                    <Input size="default"
                                           value={this.state.batchNumber}
                                           onChange={this.handleBatchNumberChange.bind(this)}
                                    />
                                </FormItem>
                                <FormItem className="person"
                                          label="订购人"
                                          labelCol={{ span: 8 }}
                                          wrapperCol={{ span: 16 }}
                                >
                                    <Input size="default"
                                           value={this.state.person}
                                           onChange={this.handlePersonChange.bind(this)}
                                    />
                                </FormItem>
                                <FormItem className="bookSource"
                                          label="书来源"
                                          labelCol={{ span: 9 }}
                                          wrapperCol={{ span:15 }}
                                >
                                    <Input size="default"
                                           value={this.state.bookSource}
                                           onChange={this.handleBookSourceChange.bind(this)}
                                           onBlur={this.handleBookSourceOnBlur.bind(this)}
                                    />
                                    <span className="alertContent">{this.state.bookSourceAlert}</span>
                                </FormItem>
                            </Form>
                        </div>
                        <div className="date">
                            <span>开始时间： </span>
                            <DatePicker placeholder="请选择开始时间"
                                        onChange={this.handleBeginDateChange.bind(this)}
                                        onBlur={this.handleStartDateOnBlur.bind(this)}/>
                            <span className="alertContent">{this.state.startDateAlert}</span>
                            <span className="endDate">结束时间：</span>
                            <DatePicker placeholder="请选择结束时间"
                                        onChange={this.handleDateChange.bind(this)}
                                        onBlur={this.handleEndDateOnBlur.bind(this)}/>
                            <span className="alertContent">{this.state.endDateAlert}</span>
                        </div>
                    </div>
                    <div className="newCondition1">
                        <Button  type="newShopping"
                                 onClick={this.handleOrderStatisticClick.bind(this)}>订购统计</Button>
                    </div>
                </div>
                <div className="tableCondition1" style={formStyle}>
                    <Table columns={this.state.columns} dataSource={this.state.data} pagination={page} />
                </div>
                <div className="under">
                    <div className="kindCount">
                        <span>书的种类数量： {this.state.kindCount}</span>
                    </div>
                    <div className="e">
                        <Button onClick={this.handleExcleClick.bind(this)}>导出Excel</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomePageOrderStatistic;