import React from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Link } from "react-router";
import "../../css/homepage.css";
import "../../css/homepageShopping.css"

const Option = Select.Option;
const Search = Input.Search;

class HomePageShopping extends React.Component{
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

}
render(){
    const clientHeight = document.body.clientHeight;
    const formStyle = {
        width: 800,
        marginLeft: "auto",
        marginRight: "auto",
    }
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    }, {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    }, {
        title: 'Address',
        dataIndex: 'address',
    }];
    const data = [];
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
                <Button type="newShopping" onClick={this.handleShoppingClick.bind(this)}><Link to ="/homePage/Search">新订购</Link></Button>
            </div>
            <div className="tableCondition">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
            </div>
        </div>
        )
}
}
export default HomePageShopping;