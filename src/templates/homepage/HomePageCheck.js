import React from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Router, Route, hashHistory} from 'react-router';
import "../../css/homepage.css";
import "../../css/homepageShopping.css"
import {message} from "antd/lib/index";

const Option = Select.Option;
const Search = Input.Search;

const columns = [{
    title: '书编号',
    dataIndex: 'bookIndex',
    //width: 150,
}, {
    title: '标题',
    dataIndex: 'title',
    //width: 150,
}, {
    title: '作者',
    dataIndex: 'author',
    //width:150,
},{
    title: 'isbn',
    dataIndex: 'isbn',
    //width: 150,
},{
    title: '出版社',
    dataIndex: 'publisher',
    width: 150,
},{
    title: '索书号',
    dataIndex: 'callNumber',
    //width: 150,
},{
    title: '条形码',
    dataIndex: 'barCode',
    width: 150,
},{
    title: '出版日期',
    dataIndex: 'publishDate',
    //width: 150,
},{
    title: '总页码',
    dataIndex: 'pages',
    //width: 150,
},{
    title: '开本',
    dataIndex: 'format',
    //width: 150,
},{
    title: '价格',
    dataIndex: 'price',
    //width: 150,
}];
const data = [];

class HomePageCheck extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectValue: "",
            selectOption: "title",
        }
    }
    handleCheckSearchChange(e){
        this.setState({
            selectValue:e.target.value
        })
    }
    handleCheckSelectChange(value) {
        this.setState({
            selectOption: value,
        })
    }
    handleCheckClick(e){
        hashHistory.push({
            pathname:"/homePage/accept"
        })
    }
    handleEnterClick(e){
        const jsonObj = {
            value: this.state.selectValue,
            option: this.state.selectOption,
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
        xmlhttp.open("GET","/main/searchBooks",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }
    render(){
        const clientHeight = document.body.clientHeight;
        const formStyle = {
            width:"100%",
            marginLeft: "auto",
            marginRight: "auto",
        }
        return(

            <div className="shoppingContent" style={{height: clientHeight}}>
                <div className="shoppingCondition">
                    {/*<label className="language">类型：
            <Select key={this.state.language} style={{ width: 120 }} onChange={this.handleShoppingChange.bind(this)}>
                <Option key="Chinese">中文</Option>
                <Option key="English">英文</Option>
            </Select>
            </label>
            <label className="searchDatabase">检索数据库：
                <Select key={this.state.language} style={{ width: 120 }} onChange={this.handleShoppingChange.bind(this)}>
                    <Option key="all">所有</Option>
                    <Option key="orderDatabase">订购库</Option>
                    <Option key="checkDatabase">验收库</Option>
                    <Option key="afterShopDatabase">采后库</Option>
                    <Option key="centerDatabase">中央库</Option>
                    <Option key="recordDatabase">套录库</Option>
                    <Option key="workDatabase">工作库</Option>
                </Select>
            </label>*/}
                    <label className="searchWay">检索途径：
                        <Select value={this.state.selectOption} style={{ width: 120 }} onChange={this.handleCheckSelectChange.bind(this)}>
                            <Option value="title">标题</Option>
                            <Option value="author">作者或责任人</Option>
                            <Option value="callNumber">索书号</Option>
                            <Option value="isbn">isbn</Option>
                            <Option value="barCode">书的条形码</Option>
                        </Select>
                    </label>
                </div>
                <div className="searchCondition">
                    <Search
                        type="text"
                        placeholder="请输入查询内容"
                        onSearch={this.handleEnterClick.bind(this)}
                        style={{ width: 800 }}
                        value={this.state.selectValue}
                        enterButton
                        onChange={this.handleCheckSearchChange.bind(this)}
                    />
                    <br /><br />
                </div>
                <div className="newCondition">
                    <Button type="newShopping" onClick={this.handleCheckClick.bind(this)}>验收</Button>
                </div>
                <div className="tableCondition" style={formStyle}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} />
                </div>
            </div>
        )
    }
}
export default HomePageCheck;