import React from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import "../../css/homepage.css";

const Option = Select.Option;

class HomePageSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectValue: "",
        }
    }

    handleSelectChange(value) {
        this.setState({
            selectValue: value,
        })
    }

    render(){
        return(
            <div className="searchKitParent">
                <div className="searchKit">
                    <Row>
                        <Col span={6}></Col>
                        <Col span={6}><Input placeholder="请输入查询的内容" /></Col>
                        <Col span={2}>
                            <Select defaultValue="book" style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                                <Option value="book">书刊</Option>
                                <Option value="user">读者</Option>
                            </Select>
                        </Col>
                        <Col span={8}><Button type="ghost" icon="search">Search</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default HomePageSearch;