import React from 'react';
import { Input, Row, Col, Radio, Button, message, Modal } from 'antd';
import Barcode from "react-barcode";

import "../../../css/circulation/ciasher/CiasherBorrow.css";

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class FinesManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            optionRadio: 0,
            readerbarcode: "",
            bookInfoDisabled: false,
            bookbarcode: "",
            modalVisible: false,
            confirmLoading: false,
            readerInfo: {
                readerbarcode: "12345678",
                name: "weiwei",
                gender: "nan",
                isRevoke: "yes",
                isLost: "no",
                borrowcount: 360,
                file: "/src/img/test.jpg",
                canBorrow: true,
            },
            bookInfo: {
                title: "母猪的产后护理",
                author: "李言荣",
                isbn: "007",
                publisher: "电子科技大学",
                callNumber: "5568522",
                pages: 366,
            },
        };
    }

    handleOptionValueChange(e){
        this.setState({
            optionRadio: e.target.value,
        });
    }

    handleReaderInputChange(e){
        this.setState({
            readerbarcode: e.target.value,
        });
    }

    handleReaderClick(){
        if(this.state.readerbarcode === ""){
            message.warning("请输入读者条形码！");
            return;
        }
        let jsonObj = {
            readerbarcode: this.state.readerbarcode,
        };
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.errcode === "000"){
                    let isrevoke="";
                    let borrowable = false;
                    if(!responseObj.isRevoke){
                        isrevoke = "正常";
                        borrowable = true;
                    }else if(responseObj.isRevoke==1){
                        isrevoke = "已注销/过期";
                    }else if(responseObj.isRevoke==2){
                        isrevoke = "距离过期小于一个月";
                    }
                    if(!responseObj.isLost){
                        borrowable=true;
                    }
                    let readerObj = {
                        readerbarcode: responseObj.readerbarcode,
                        name: responseObj.name,
                        gender: responseObj.gender,
                        isRevoke: isrevoke,
                        isLost: responseObj.isLost?"是":"否",
                        borrowcount: responseObj.borrowcount,
                        file: responseObj.file,
                        canBorrow: borrowable,
                    };
                }else{
                    this.setState({
                        bookInfoDisabled: true,
                        readerInfo: {},
                    });
                    if(responseObj.errcode=="002"||responseObj.errcode=="004"){
                        message.warning("未登录或用户不存在！");
                    }else if(responseObj.errcode=="003"){
                        message.warning("您没有这个权限！");
                    }else if(responseObj.errcode=="500"){
                        message.error("未知错误！");
                    }
                }
            }
        }.bind(this);
        xmlhttp.open("POST","/library/reader/getreaderbyid",true);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }

    handleBookInputChange(e){
        this.setState({
            bookbarcode: e.target.value,
        });
    }

    handleBookClick(){
        this.setState({
            modalVisible: true,
        });
        if(!this.state.readerInfo.canBorrow){
            message.warning("该读者已挂失或即将注销或者已注销，无法借书！");
            return;
        }
        if(this.state.bookbarcode === ""){
            message.warning("请输入书籍条形码！");
            return;
        }
        let jsonObj = {
            searchType: 5,
            searchStr: this.state.bookbarcode,
        };
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "00"){
                    let bookObj = {
                        title: responseObj.data[0].title,
                        author: responseObj.data[0].author,
                        isbn: responseObj.data[0].isbn,
                        publisher: responseObj.data[0].publisher,
                        callNumber: responseObj.data[0].callNumber,
                        pages: responseObj.data[0].pages,
                    };
                    this.setState({
                        bookInfo: bookObj,
                        modalVisible: true,
                    })
                }else if(responseObj.code === "01"){
                    message.warning("操作失败，请重试！");
                    this.State({
                        bookInfo: {},
                        modalVisible: false,
                    })
                }
            }
        }.bind(this);
        xmlhttp.open("POST","/main/searchBooks",true);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send(jsonString);
    }

    handleModalOk(){
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            let url="";
            if(this.state.optionRadio){
                url = "/main/renewBooks";
            }else{
                url = "/main/borrowBooks";
            }
            let jsonObj = {
                borrowPersonId: this.state.readerbarcode,
                bookBarCode: this.state.bookbarcode,
            };
            let jsonString = JSON.stringify(jsonObj);
            let xmlhttp;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    let responseObj = JSON.parse(xmlhttp.responseText);
                    if(responseObj.code === "00"){
                        message.success("借书成功！");
                        this.setState({
                            modalVisible: false,
                            bookInfo: {},
                            bookbarcode: "",
                        })
                    }else{
                        message.warning(responseObj.msg);
                    }
                }
            }.bind(this);
            xmlhttp.open("POST",url,true);
            xmlhttp.setRequestHeader("Content-Type","application/json");
            xmlhttp.send(jsonString);
        }, 600);
    }

    handleModalCancel() {
        this.setState({
            modalVisible: false,
            bookInfo: {},
        });
    }

    render(){
        return(
            <div className="borrowBodyDiv">
                <Modal title={this.state.optionRadio?"确定续借这本书吗？":"确定要借这本书吗？"}
                       visible={this.state.modalVisible}
                       onOk={this.handleModalOk.bind(this)}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleModalCancel.bind(this)}
                       okText="确定"
                       cancelText="取消"
                >
                    <div style={{fontSize: 18}}>
                        <Row>
                            <Col span={5}>标题：</Col>
                            <Col span={19}>《{this.state.bookInfo.title}》</Col>
                        </Row>
                        <Row>
                            <Col span={5}>作者：</Col>
                            <Col span={19}>{this.state.bookInfo.author}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>ISBN：</Col>
                            <Col span={19}>{this.state.bookInfo.isbn}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>出版社：</Col>
                            <Col span={19}>{this.state.bookInfo.publisher}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>索书号：</Col>
                            <Col span={19}>{this.state.bookInfo.callNumber}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>页数：</Col>
                            <Col span={19}>{this.state.bookInfo.pages}</Col>
                        </Row>
                    </div>
                </Modal>
                <div className="borrowQueryDiv">
                    <Row>
                        <Col span={2}>外借/续借：</Col>
                        <Col span={2}>
                            <RadioGroup onChange={this.handleOptionValueChange.bind(this)} value={this.state.optionRadio}>
                                <Radio value={0}>外借</Radio>
                                <Radio value={1}>续借</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={2}>读者条形码：</Col>
                        <Col span={2}>
                            <Input type="text"
                                   value={this.state.readerbarcode}
                                   onChange={this.handleReaderInputChange.bind(this)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button type="primary" onClick={this.handleReaderClick.bind(this)}>确定</Button>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={2}>书籍条形码：</Col>
                        <Col span={2}>
                            <Input type="text"
                                   disabled={this.state.bookInfoDisabled}
                                   value={this.state.bookbarcode}
                                   onChange={this.handleBookInputChange.bind(this)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button type="primary"
                                    disabled={this.state.bookInfoDisabled}
                                    onClick={this.handleBookClick.bind(this)}
                            >确定</Button>
                        </Col>
                    </Row>
                </div>
                <div className="borrowInfoDiv">
                    <div className="borrowInfoImgDiv">
                        <img src={this.state.readerInfo.file} height={350} width={250}/>
                    </div>
                    <div className="borrowInfoTextDiv">
                        <Row>
                            <Col span={10}>读者姓名：</Col>
                            <Col span={12}>{this.state.readerInfo.name}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={10}>读者性别：</Col>
                            <Col span={12}>{this.state.readerInfo.gender}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={10}>账号状态：</Col>
                            <Col span={12}>{this.state.readerInfo.isRevoke}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={10}>是否挂失：</Col>
                            <Col span={12}>{this.state.readerInfo.isLost}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={10}>已借图书数目：</Col>
                            <Col span={12}>{this.state.readerInfo.borrowcount}</Col>
                        </Row>
                    </div>
                    <div className="borrowInfoBarcode">
                        <Barcode value={this.state.readerInfo.readerbarcode} />
                    </div>
                </div>
            </div>
        )
    }
}
export default FinesManage;

