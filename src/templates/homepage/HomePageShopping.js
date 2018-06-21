import React from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Router, Route, hashHistory} from 'react-router';
import {message} from "antd/lib/index";
import "../../css/homepage.css";
import "../../css/homepageShopping.css"

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
    title: '订单批号',
    dataIndex: 'batchNumber',
    //width: 150,
},{
    title: '订书总价格',
    dataIndex: 'totalPrice',
    //width: 150,
},{
    title: '订购人',
    dataIndex: 'orderPerson',
    //width: 150,
},{
    title: '订购数量',
    dataIndex: 'orderCount',
    //width: 150,
},{
    title: '书的价格',
    dataIndex: 'price',
    //width: 150,
},{
    title: '订购书来源',
    dataIndex: 'bookSource',
    //width: 150,
}];
const data = [];

class HomePageShopping extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectValue: "",
            selectOption: "1",
        }
    }
handleShoppingSearchChange(e){
        this.setState({
            selectValue:e.target.value
        })
}
handleShoppingSelectChange(value) {
        this.setState({
            selectOption: value,
        })
    }

handleShoppingClick(e){
hashHistory.push({
    pathname:"/homePage/order"
})
}
handleEnterClick(e){
    const jsonObj = {
        searchType: this.state.selectValue,
        searchStr: this.state.selectOption,
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

render(){
    const clientHeight = document.body.clientHeight;
    const formStyle = {
        width:"100%",
        marginLeft: "auto",
        marginRight: "auto",
    }
        return(

        <div className="shoppingContent" >
            <div className="shoppingLine">
            <div className="shoppingCondition">
            <label className="searchWay">检索途径：
                <Select value={this.state.selectOption} style={{ width: 120 }} onChange={this.handleShoppingSelectChange.bind(this)}>
                    <Option value="1">订单批号</Option>
                    <Option value="2">作者或责任人</Option>
                    <Option value="3">书编号</Option>
                    <Option value="4">isbn号</Option>
                    <Option value="5">订书来源</Option>
                    <Option value="6">标题</Option>
                    <Option value="7">订购人</Option>
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
                    onChange={this.handleShoppingSearchChange.bind(this)}
                />
                {/*<br /><br />*/}
            </div>
            <div className="newCondition">
                <Button type="newShopping" onClick={this.handleShoppingClick.bind(this)}>新订购</Button>
            </div>
            </div>
            <div className="tableCondition" style={formStyle}>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} />
            </div>
        </div>
        )
}
}
export default HomePageShopping;