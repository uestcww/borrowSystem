import React from "react";
import { Row, Col, Radio, DatePicker, Button, Table } from "antd";

import "../../../css/circulation/statistics/borrowCountOrder.css";

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const readerColumns = [
    {
        title: '读者条码',
        dataIndex: 'readerBarcode',
    },
    {
        title: '读者姓名',
        dataIndex: 'name',
    },
    {
        title: '借书数量',
        dataIndex: 'num',
    },
];
const bookColumns = [
    {
        title: '书籍中央库代码',
        dataIndex: 'bookIndex',
    },
    {
        title: '书籍名称',
        dataIndex: 'title',
    },
    {
        title: '借阅次数',
        dataIndex: 'num',
    },
];

class BorrowCountOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            circulationType: "1",
            startDate: "",
            endDate: "",
            columns: readerColumns,
        }
    }

    handleSelectChange(e){
        this.setState({
            circulationType: e.target.value,
        });
        if(e.target.value === "1"){
            this.setState({
                columns: readerColumns,
            });
        }else if(e.target.value === "2"){
            this.setState({
                columns: bookColumns,
            });
        }
    }

    handleRangePickerChange(value, dateString){
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1],
        });
    }

    render(){
        return(
            <div className="borrowCountBody">
                <div className="borrowCountQueryDiv">
                    <Row>
                        <Col span={5}></Col>
                        <Col span={2}>请选择统计类型：</Col>
                        <Col span={3}>
                            <RadioGroup value={this.state.circulationType} onChange={this.handleSelectChange.bind(this)}>
                                <Radio value="1">按人排序</Radio>
                                <Radio value="2">按书排序</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>请输入查询时段：</Col>
                        <Col span={4}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始日期", "结束日期"]}
                                onChange={this.handleRangePickerChange.bind(this)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <Button type="primary"

                            >查询</Button>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
                <div className="borrowCountTableDiv">
                    <Table  columns={this.state.columns}/>
                </div>
            </div>
        )
    }
}
export default BorrowCountOrder;