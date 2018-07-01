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


class HomePageShopping extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectValue: "",
            selectOption: "1",
            pageNumber:1,
            totalCount:0,
            data:[],
            columns : [
                {
                    title:"序号",
                    dataIndex:"key"
                },
                {
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
                }]
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
        searchType: this.state.selectOption,
        searchStr: this.state.selectValue,
        pageNumber:this.state.pageNumber,
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
                let j = dataList.length;
                let tableData = [];
                let dataObj;
                for (let i = 0;i<dataList.length;i++){
                    dataObj = Object.assign({},dataList[i],{key:i+1})
                    tableData.push(dataObj);
                }
                this.setState({
                    data:tableData,
                    totalCount:responseObj.totalCount
                },this.setState({
                    data:[]
                }));

            }
        }
    }.bind(this);

    xmlhttp.open("POST","order/searchOrder",false);
    xmlhttp.setRequestHeader("Content-Type","application/json");
    xmlhttp.send(jsonString);

}

render(){
    const clientHeight = document.body.clientHeight;
    const that = this;
    const formStyle = {
        width:"100%",
        marginLeft: "auto",
        marginRight: "auto",
    }
    const page={
        onChange: function(page,pageSize){
            const jsonObj = {
                searchType: that.state.selectOption,
                searchStr: that.state.selectValue,
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
                            dataObj = Object.assign({},dataList[i],{key:i+1})
                            tableData.push(dataObj);
                        }
                        that.setState({
                            pageNumber:page,
                            data:tableData,
                            totalCount:responseObj.totalCount
                        },that.setState({
                            data:[]
                        }));


                    }
                }
            }
            xmlhttp.open("POST","order/searchOrder",false);
            xmlhttp.setRequestHeader("Content-Type","application/json");
            xmlhttp.send(jsonString);
        },
        total:that.state.totalCount,
        pageSize:8
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
                <span>采购查询：  </span>
                <Search
                    type="text"
                    placeholder="请输入查询内容"
                    onSearch={this.handleEnterClick.bind(this)}
                    style={{ width: 800 }}
                    value={this.state.selectValue}
                    enterButton
                    onChange={this.handleShoppingSearchChange.bind(this)}
                />
            </div>
            <div className="newCondition">
                <Button type="newShopping" onClick={this.handleShoppingClick.bind(this)}>新订购</Button>
            </div>
            </div>
            <div className="tableCondition" style={formStyle}>
                <Table columns={this.state.columns} dataSource={this.state.data}  pagination={page} />
            </div>
        </div>
        )
}
}
export default HomePageShopping;