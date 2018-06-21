import React from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Router, Route, hashHistory} from 'react-router';
import {message} from "antd/lib/index";
import "../../css/homepage.css";
import "../../css/homePageCheckStatistic.css"

const Option = Select.Option;

const columns = [{
    title: '书目名称',
    dataIndex: 'bookIndex',
    //width: 150,
}, {
    title: '种数',
    dataIndex: 'title',
    //width: 150,
}, {
    title: '册数',
    dataIndex: 'author',
    //width:150,
},{
    title: '金额',
    dataIndex: 'isbn',
    //width: 150,
},{
    title: '金额百分比',
    dataIndex: 'publisher',
    //width: 150,
},{
    title: '备注',
    dataIndex: 'callNumber',
    //width: 150,
}];
const data = [];
class HomePageOrderStatistic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectOption3: "Chinese",
            selectOption: "title",
            selectOption2:"all",
        }
    }
    handleOrderStatisticSearchChange(option){
        this.setState({
            selectOption2:option
        })
    }
    handleOrderStatisticSelectChange(option) {
        this.setState({
            selectOption: option,
        })
    }
    handleOrderStatisticSelect3Change(option) {
        this.setState({
            selectOption3: option,
        })
    }

    handleOrderStatisticClick(e){
       /* hashHistory.push({
            pathname:""
        })*/
        const jsonObj = {
            option2: this.state.selectOption2,
            option: this.state.selectOption,
            option3:this.state.selectOption3
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
                    let tableData = this.state.data;
                    let dataObj;
                    for (let i = 0;i<dataList.length;i++){
                        dataObj = Object.assign({},dataList[i],{key:i})
                        tableData.push(dataObj);
                    }
                    this.setState({
                        data:tableData
                    });

                }
            }
        }.bind(this);
        xmlhttp.open("POST","/main/searchBooks",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }
    handleEnterClick(e){

    }

    render(){
        const clientHeight = document.body.clientHeight;
        const formStyle = {
            width:"100%",
            marginLeft: "auto",
            marginRight: "auto",
        }
        return(

            <div className="shoppingContent1" style={{height: clientHeight}}>
                <div className="shoppingCondition1">
                    <label className="language1">选择操作员：
            <Select value={this.state.selectOption3} style={{ width: 150 }} onChange={this.handleOrderStatisticSelect3Change.bind(this)}>
                <Option value="Chinese">中文</Option>
                <Option value="English">英文</Option>
            </Select>
            </label>
            <label className="searchDatabase1">选择订购批号：
                <Select value={this.state.selectOption2} style={{ width: 150 }} onChange={this.handleOrderStatisticSearchChange.bind(this)}>
                    <Option value="all">所有</Option>
                    <Option value="orderDatabase">订购库</Option>
                    <Option value="checkDatabase">验收库</Option>
                    <Option value="afterShopDatabase">采后库</Option>
                    <Option value="centerDatabase">中央库</Option>
                    <Option value="recordDatabase">套录库</Option>
                    <Option value="workDatabase">工作库</Option>
                </Select>
            </label>
                    <label className="searchWay1">选择订购单位：
                        <Select value={this.state.selectOption} style={{ width: 150 }} onChange={this.handleOrderStatisticSelectChange.bind(this)}>
                            <Option value="title">标题</Option>
                            <Option value="author">作者或责任人</Option>
                            <Option value="callNumber">索书号</Option>
                            <Option value="isbn">isbn</Option>
                            <Option value="barCode">书的条形码</Option>
                        </Select>
                    </label>
                </div>
               {/* <div className="searchCondition1">
                    <Search
                        type="text"
                        placeholder="请输入查询内容"
                        onSearch={this.handleEnterClick.bind(this)}
                        style={{ width: 800 }}
                        value={this.state.selectValue}
                        enterButton
                        onChange={this.handleOrderStatisticSearchChange.bind(this)}
                    />
                    <br /><br />
                </div>*/}
                <div className="newCondition1">
                    <Button type="newShopping" onClick={this.handleOrderStatisticClick.bind(this)}>订购统计</Button>
                </div>
                <div className="tableCondition1" style={formStyle}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} />
                </div>
            </div>
        )
    }
}
export default HomePageOrderStatistic;