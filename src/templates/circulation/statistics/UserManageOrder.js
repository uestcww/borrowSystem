import React from "react";
import { Table, Button, Row, Col, Radio, DatePicker } from 'antd';

import "../../../css/circulation/statistics/userManage.css";

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class UserManageOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    key: "0",
                    readerBarcode: "0000001",
                    readerName: "王建国",
                    operation: "添加",
                    operationDate: "2018-06-01",
                    operator: "李有才",
                },
            ],
            columns: [
                {
                    title: '读者条码',
                    dataIndex: 'readerBarcode',
                },
                {
                    title: '读者姓名',
                    dataIndex: 'readerName',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                },
                {
                    title: '操作日期',
                    dataIndex: 'operationDate',
                },
                {
                    title: '操作人',
                    dataIndex: 'operator',
                },
            ],
            optionRadio: "add",
            startDate: "",
            endDate: "",
        };
    }

    handleRadioChange(e){
        this.setState({
            optionRadio: e.target.value
        });
    }

    handleRangePickerChange(value, dateString){
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1],
        });
    }

    handleButtonClick(){
        const jsonObj = {
            type: this.state.optionRadio,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        const jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "000"){
                }else if(responseObj.errcode === "001"){
                }
            }
        }.bind(this);
        xmlhttp.open("POST", "/url", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
    }

    render(){
        return(
            <div>
                <div className="queryDiv">
                    <Row>
                        <Col span={3}></Col>
                        <Col span={2}>请输入查询类型：</Col>
                        <Col span={6}>
                            <RadioGroup value={this.state.optionRadio} onChange={this.handleRadioChange.bind(this)}>
                                <Radio value="add">添加</Radio>
                                <Radio value="cancel">注销</Radio>
                                <Radio value="cancelcancel">取消注销</Radio>
                                <Radio value="lost">挂失</Radio>
                                <Radio value="cancellost">取消挂失</Radio>
                                <Radio value="modify">修改</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>请输入查询时段：</Col>
                        <Col span={5}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始日期", "结束日期"]}
                                onChange={this.handleRangePickerChange.bind(this)}
                            />
                        </Col>
                        <Col span={2}>
                            <Button type="primary" onClick={this.handleButtonClick.bind(this)}>查询</Button>
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                </div>
                <div className="tableDiv">
                    <Table columns={this.state.columns}
                           dataSource={this.state.data}
                    />
                </div>
            </div>
        );
    }
}
export default UserManageOrder;