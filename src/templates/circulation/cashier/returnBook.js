import React from 'react';
import { Input, Button, Modal, message, Row, Col } from "antd";

import "../../../css/circulation/ciasher/returnBook.css";

class returnBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            bookBarcode: "",
            bookName: "",
            press: "",
            author: "",
        };
    }

    handleInputChange(e){
        this.setState({
            bookBarcode: e.target.value,
        })
    }

    handleButtonClick(){
        if(this.state.bookBarcode === ""){
            message.warning("书目条形码为空！");
            return;
        }
        let jsonObj = {
            searchType: 5,
            searchStr: this.state.bookBarcode,
        };
        let jsonString = JSON.stringify(jsonObj);
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState===4&&xmlhttp.status===200){
                let responseObj = JSON.parse(xmlhttp.responseText);
                if(responseObj.code === "00"){
                    this.setState({
                        visible: true,
                        bookName: responseObj.data[0].title,
                        press: responseObj.data[0].publisher,
                        author: responseObj.data[0].author,
                    })
                }else if(responseObj.code === "01"){
                    message.warning(responseObj.msg);
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
            let url = "/main/returnBooks/"+this.state.bookBarcode;
            let xmlhttp;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState===4&&xmlhttp.status===200){
                    let responseObj = JSON.parse(xmlhttp.responseText);
                    message.warning(responseObj.msg);
                    this.setState({
                        confirmLoading: false,
                    });
                    if(responseObj.code === "00"){
                        this.setState({
                            visible: false,
                            bookBarcode: "",
                        });
                    }
                }
            }.bind(this);
            xmlhttp.open("GET",url,true);
            xmlhttp.setRequestHeader("Content-Type","application/json");
            xmlhttp.send();
        }, 600);
    }

    handleModalCancel(){
        this.setState({
            visible: false,
            bookName: "",
            bookBarcode: "",
            press: "",
            author: "",
        });
    }

    render(){
        return(
            <div>
                <Modal title="确认还回？"
                       visible={this.state.visible}
                       onOk={this.handleModalOk.bind(this)}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleModalCancel.bind(this)}
                       okText="确定还回"
                       cancelText="取消"
                >
                    <Row>
                        <Col span={4}>书籍名称：</Col>
                        <Col span={20}>《{this.state.bookName}》</Col>
                    </Row>
                    <Row>
                        <Col span={4}>作者：</Col>
                        <Col span={20}>{this.state.author}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>出版社：</Col>
                        <Col span={20}>{this.state.press}</Col>
                    </Row>
                </Modal>
                <div className="returnBookDiv">
                    <div className="returnBookInputDiv">
                        <Input type="text"
                               placeholder="这里输入书籍条形码"
                               value={this.state.bookBarcode}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </div>
                    <div className="returnBookButtonDiv">
                        <Button type="primary" onClick={this.handleButtonClick.bind(this)}>还回</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default returnBook;