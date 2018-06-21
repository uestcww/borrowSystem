import React from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import "../../css/homepage.css";

const Option = Select.Option;

class HomePageSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectValue: "",
            selectOption: "book",
        }
    }

    handleSearchChange(e){
        this.setState({
            selectValue: e.target.value,
        })
    }

    handleSelectChange(value) {
        this.setState({
            selectOption: value,
        })
    }

    handleSearchClick(e){
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
                if (responseObj.errcode==="01") {
                    message.warning("输入有误");
                    return;
                }else if (responseObj.errcode==="00"){
                    let dataList = responseObj.searchList;
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
        return(
            <div className="searchKitParent">
                <div className="searchKit">
                    <Row>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <Input
                                type="text"
                                placeholder="请输入查询的内容"
                                value={this.state.selectValue}
                                onChange={this.handleSearchChange.bind(this)}
                            />
                        </Col>
                        <Col span={2}>
                            <Select value={this.state.selectOption} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                                <Option value="book">书刊</Option>
                                <Option value="user">读者</Option>
                            </Select>
                        </Col>
                        <Col span={8}><Button type="ghost" icon="search" onClick={this.handleSearchClick.bind(this)}>Search</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default HomePageSearch;