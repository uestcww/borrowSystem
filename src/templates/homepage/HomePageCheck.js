import React from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Router, Route, hashHistory} from 'react-router';
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
            language:""
        }
    }
    handleShoppingChange(e){
        this.setState({
            language:e.key
        })
    }
    handleShoppingClick(e){
        hashHistory.push({
            pathname:"/homePage/accept"
        })
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
                    <label className="language">类型：
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
                    </label>
                    <label className="searchWay">检索途径：
                        <Select key={this.state.language} style={{ width: 120 }} onChange={this.handleShoppingChange.bind(this)}>
                            <Option key="isbn">ISBN号</Option>
                            <Option key="title">题名</Option>
                            <Option key="responsibility">责任者</Option>
                            <Option key="publish">出版社</Option>
                            <Option key="number">索书号</Option>
                            <Option key="orderNumber">订购批号</Option>
                            <Option key="checkNumber">验收批号</Option>
                            <Option key="controlNumber">控制号</Option>
                            <Option key="operator">操作员</Option>
                        </Select>
                    </label>
                </div>
                <div className="searchCondition">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                        enterButton
                    />
                    <br /><br />
                </div>
                <div className="newCondition">
                    <Button type="newShopping" onClick={this.handleShoppingClick.bind(this)}>验收</Button>
                </div>
                <div className="tableCondition" style={formStyle}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} />
                </div>
            </div>
        )
    }
}
export default HomePageCheck;