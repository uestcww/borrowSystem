import React from "react"
import { Table, Button, Modal, Row, Col, Input } from 'antd';
import { hashHistory } from "react-router";
import "../../css/homePageAccept.css"
import {message} from "antd/lib/index";

const Search = Input.Search;
const confirm = Modal.confirm;


class HomePageAccept extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentColumn: {},
            data: [
            ],
            columns: [
                {
                    title:'序号',
                    dataIndex:'key',
                }, {
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
                },
                {
                    title: "操作",
                    dataIndex: "operator",
                    render: (text,record,index) => (
                        <a onClick={() => this.showUserAcceptModal(record)}>验收</a>
                    )
                }
            ],
            AcceptModifyModalVisible: false,
            count:"",
            selectValue: "",
            selectOption: "1",
            pageNumber:1,
            batchNumber:1,
            totalCount2:0,
            orderCount:"",
            ifChecked:0
        }
    }
    showUserAcceptModal(index){
        this.setState({
            AcceptModifyModalVisible: true,
            batchNumber:index.batchNumber,
            orderCount:index.orderCount,
            ifChecked:index.ifChecked
        });
    }
    handleCountChange(e){
        this.setState({
            count:e.target.value,
        })
    }
    handleShoppingSearchChange(e){
        this.setState({
            selectValue:e.target.value
        })
    }

    handleEnterClick(e){
        const jsonObj = {
            searchType: this.state.selectOption,
            searchStr: this.state.selectValue,
            pageNumber:this.state.pageNumber
        };
        const jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if (responseObj.code==="01") {
                    message.warning("输入有误");

                }else if (responseObj.code==="00"){
                    let dataList = responseObj.data;
                    let tableData = [];
                    let j = dataList.length;
                    let dataObj;
                    for (let i = 0;i<dataList.length;i++){
                        dataObj = Object.assign({},dataList[i],{key:i+1});
                        tableData.push(dataObj);
                    }
                    this.setState({
                        data:tableData,
                        totalPage:responseObj.totalPage,
                        totalCount2:responseObj.totalCount
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


    handleModifyAccept(){

      /*  let currentUser = this.state.currentColumn;
        console.log(currentUser);*/


        const jsonObj = {
            checkCount: this.state.currentColumn.count,
            orderBatchNumber:this.state.batchNumber
        };
        const jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        let a = this.state.currentColumn.count;
        let b = this.state.batchNumber+"/";
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                    if (this.state.ifChecked===1){
                        message.warning("该订单已验收，无需重复验收");
                    }else if (this.state.orderCount<this.state.currentColumn.count){
                        message.warning("订购数量没有那么多")
                    } else if (responseObj.code=="00") {
                        this.setState({
                            AcceptModifyModalVisible: false,
                            currentColumn: {},
                        });
                        message.success("验收成功，订单批号是"+this.state.batchNumber)
                    } else {
                    message.warning("验收失败");

                }
            }
        }.bind(this);
        var url = "order/addCheck/"+b+a
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
    }
    handleAcceptModifyCancel(){
        this.setState({
            AcceptModifyModalVisible: false,
            currentColumn: {},
        });
    }
    handleAcceptReturnClick(){
        hashHistory.push({
            pathname:"/homePage/check"
        })
    }

    onSelectChange(value) {
        this.setState({
            selectedRowKeys: value
        })
    }
    handleModifyAcceptChange(e){
        this.setState({
            currentColumn: Object.assign({},this.state.currentColumn,{count: e.target.value}),
        });
    }
    render(){
        const tableStyle = {
            marginTop: 80,
            marginRight: 20,
            marginLeft: 20
        };
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const that = this;
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
                                totalCount2:responseObj.totalCount
                            },that.setState({
                                data:[]
                            }));


                        }
                    }
                }
                xmlhttp.open("POST","order/searchCheck",false);
                xmlhttp.setRequestHeader("Content-Type","application/json");
                xmlhttp.send(jsonString);
            },
            total:that.state.totalCount2,
            pageSize:8
        }
        return(
            <div>
                <div className="searchAccept">
                    <Search
                        type="number"
                        placeholder="请输入订单批号"
                        enterButton="Search"
                        style={{ width: 400 }}
                        //onSearch={value => console.log(value)}
                        onSearch={this.handleEnterClick.bind(this)}
                        value={this.state.selectValue}
                        onChange={this.handleShoppingSearchChange.bind(this)}
                    />
                </div>
                <div className="searchEditable">
                        <Modal title="验收"
                               visible={this.state.AcceptModifyModalVisible}
                               okText="确定验收"
                               cancelText="取消"
                               onOk={this.handleModifyAccept.bind(this)}
                               onCancel={this.handleAcceptModifyCancel.bind(this)}
                        >
                            <div>
                                <Row>
                                    <Col span={6}>册数</Col>
                                    <Col span={18}>
                                        <Input type="text"
                                               value={this.state.currentColumn.count}
                                               onChange={this.handleModifyAcceptChange.bind(this)}
                                        />
                                    </Col>
                                </Row>
                                <br/>
                            </div>
                        </Modal>
                </div>
                <div style={tableStyle}>

                    <Table
                           columns={this.state.columns}
                           dataSource={this.state.data}
                           pagination={page}
                    />
                </div>
                <div className="AcceptReturn">
                    <Button
                              type="primary"
                              onClick={this.handleAcceptReturnClick.bind(this)}

                    >返回</Button>
                </div>
            </div>



        )
    }
}
export default HomePageAccept;