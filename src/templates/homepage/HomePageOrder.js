import React from 'react';
import { Form, Button, Input ,message} from "antd";
import "../../css/homepage.css";
import { Router, Route, hashHistory} from 'react-router';
import "../../css/homepageOrder.css";

const FormItem = Form.Item;
class HomePageOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookIndex:"",
            title:"",
            author:null,
            isbn:"",
            publisher:null,
            price:null,
            callNumber:null,
            bindStyle:null,
            format:null,
            orderCount:"",
            bookSource:null,
            pages:null,
            publishDate:null,
            bookIndexAlert:"",
            titleAlert:"",
            isbnAlert:"",
            orderCountAlert:""

        }
    }
    handleBookIndexOnBlur(e) {
        if (this.state.bookIndex == "") {
            this.setState({
                bookIndexAlert: "请输入图书编号"
            })
        } else {
            this.setState({
                bookIndexAlert: ""
            })
        }
    }
    handleTitleOnBlur(e) {
        if (this.state.title == "") {
            this.setState({
                titleAlert: "图书标题"
            })
        } else {
            this.setState({
                titleAlert: ""
            })
        }
    }
    handleIsbnOnBlur(e) {
        if (this.state.isbn == "") {
            this.setState({
                isbnAlert: "isbn号"
            })
        } else {
            this.setState({
                isbnAlert: ""
            })
        }
    }
    handleOrderCountOnBlur(e) {
        if (this.state.orderCount == "") {
            this.setState({
                orderCountAlert: "订购数量"
            })
        } else {
            this.setState({
                orderCountAlert: ""
            })
        }
    }
    handleBookIndexChange(e){
        this.setState({
            bookIndex:e.target.value
        })
    }
    handleTitleChange(e){
        this.setState({
            title:e.target.value
        })
    }
    handleAuthorChange(e){
        if (e.target.value==""){
            this.setState({
                author:null
            })
        } else {
            this.setState({
                author:e.target.value
            })
        }

    }
    handleIsbnChange(e){
        this.setState({
            isbn:e.target.value
        })
    }
    handlePublisherChange(e){
        if (e.target.value==""){
            this.setState({
                publisher:null
            })
        } else {
            this.setState({
                publisher:e.target.value
            })
        }
    }
    handleCallNumberChange(e){
        if (e.target.value==""){
            this.setState({
                callNumber:null
            })
        } else {
            this.setState({
                callNumber:e.target.value
            })
        }
    }
    handleBindStyleChange(e){
        if (e.target.value==""){
            this.setState({
                bindStyle:null
            })
        } else {
            this.setState({
                bindStyle:e.target.value
            })
        }
    }
    handleFormatChange(e){
        if (e.target.value==""){
            this.setState({
                format:null
            })
        } else {
            this.setState({
                format:e.target.value
            })
        }
    }
    handleOrderCountChange(e){
        this.setState({
            orderCount:e.target.value
        })
    }
    handleBookSourceChange(e){
        if (e.target.value==""){
            this.setState({
                bookSource:null
            })
        } else {
            this.setState({
                bookSource:e.target.value
            })
        }
    }
    handlePagesChange(e){
        if (e.target.value==""){
            this.setState({
                pages:null
            })
        } else {
            this.setState({
                pages:e.target.value
            })
        }
    }
    handlePriceChange(e){
        if (e.target.value==""){
            this.setState({
                price:null
            })
        } else {
            this.setState({
                price:e.target.value
            })
        }
    } handlePublishDateChange(e){
        if (e.target.value==""){
            this.setState({
                publishDate:null
            })
        } else {
            this.setState({
                publishDate:e.target.value
            })
        }
    }
    handleOrderClick(e){
        let flag = false;
        if (this.state.bookIndex===""){
            flag = true;
            this.setState({bookIndexAlert:"请输入图书编号"})
        }
        if (this.state.title===""){
            flag = true;
            this.setState({titleAlert:"请输入图书标题"})
        }
        if (this.state.isbn===""){
            flag = true;
            this.setState({isbnAlert:"请输入isbn号"})
        }
        if (this.state.orderCount===""){
            flag = true;
            this.setState({orderCountAlert:"请输入订购数量"})
        }
        if(flag){
            return;
        }
      /*  hashHistory.push({
            pathname: "/homePage/Shopping"
        });*/
         const jsonObj = {
             bookIndex: this.state.bookIndex,
             title: this.state.title,
             author:this.state.author,
             isbn:this.state.isbn,
             publisher:this.state.publisher,
             price:this.state.price,
             callNumber:this.state.callNumber,
             bindStyle:this.state.bindStyle,
             format:this.state.format,
             orderCount:this.state.orderCount,
             bookSource:this.state.bookSource,
             pages:this.state.pages,
             publishDate:this.state.publishDate
         }
         let jsonString = JSON.stringify(jsonObj)
         let xmlhttp;
         xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function () {
             if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                 let responseObj = JSON.parse(xmlhttp.responseText);
                 if (responseObj.code==="00") {
                     message.success(responseObj.msg)
                     hashHistory.push({
                         pathname:"/homepage/Shopping"
                     })
                 }else {
                     message.warning(responseObj.msg)
                 }
             }
         }.bind(this)
         xmlhttp.open("POST", "order/addOrder", false);
         xmlhttp.setRequestHeader("Content-Type", "application/json");
         xmlhttp.send(jsonString);


    }
    handleNextOrderClick(e){

         let flag = false;
         if (this.state.bookIndex==""){
             flag = true;
             this.setState({bookIndexAlert:"请输入图书编号"})
         }
         if (this.state.title===""){
             flag = true;
             this.setState({titleAlert:"请输入图书标题"})
         }
        if (this.state.isbn===""){
            flag = true;
            this.setState({isbnAlert:"请输入isbn号"})
        }
        if (this.state.orderCount===""){
            flag = true;
            this.setState({orderCountAlert:"请输入订购数量"})
        }
        if(flag){
             return;
         }
        const jsonObj = {
            bookIndex: this.state.bookIndex,
            title: this.state.title,
            author:this.state.author,
            isbn:this.state.isbn,
            publisher:this.state.publisher,
            price:this.state.price,
            callNumber:this.state.callNumber,
            bindStyle:this.state.bindStyle,
            format:this.state.format,
            orderCount:this.state.orderCount,
            bookSource:this.state.bookSource,
            pages:this.state.pages,
            publishDate:this.state.publishDate

        }
        let jsonString = JSON.stringify(jsonObj)
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                if (responseObj.code === "00"){
                    message.success(responseObj.msg)
                } else {
                    message.warning(responseObj.msg)
                }

            }
        }.bind(this)
        xmlhttp.open("POST", "order/addOrder", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
        this.setState({
            bookIndex:"",
            title:"",
            author:null,
            isbn:"",
            publisher:null,
            price:null,
            callNumber:null,
            bindStyle:null,
            format:null,
            orderCount:"",
            bookSource:null,
            pages:null,
            publishDate:null,
        })

    }
    handleCancelOrderClick(e){
        hashHistory.push({
            pathname: "/homePage/Shopping"
        });
    }
render(){
        return(
            <div className="one">
                <div>
                    <Form>
                        <FormItem className="bookIndex"
                            label="图书编号"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.bookIndex}
                                onChange={this.handleBookIndexChange.bind(this)}
                                onBlur={this.handleBookIndexOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.bookIndexAlert}</span>
                        </FormItem>
                        <FormItem className="title"
                            label="图书标题"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                                   onBlur={this.handleTitleOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.titleAlert}</span>
                        </FormItem>
                        <FormItem className="author"
                            label="责任人或作者"
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span:15 }}
                        >
                            <Input size="default"
                                value={this.state.author}
                                onChange={this.handleAuthorChange.bind(this)}
                            />
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Form>
                        <FormItem className="isbn"
                            label="isbn"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.isbn}
                                onChange={this.handleIsbnChange.bind(this)}
                                onBlur={this.handleIsbnOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.isbnAlert}</span>
                        </FormItem>
                        <FormItem className="publisher"
                            label="出版社"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.publisher}
                                onChange={this.handlePublisherChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem className="price"
                            label="单价"
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 15}}
                        >
                            <Input size="default"
                                value={this.state.price}
                                onChange={this.handlePriceChange.bind(this)}
                            />
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Form>
                        <FormItem className="callNumber"
                            label="索书号"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.callNumber}
                                onChange={this.handleCallNumberChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem className="bindStyle"
                            label="装订风格"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.bindStyle}
                                onChange={this.handleBindStyleChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem className="format"
                            label="开本"
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input size="default"
                                value={this.state.format}
                                onChange={this.handleFormatChange.bind(this)}
                            />
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Form>
                        <FormItem className="orderCount"
                            label="订购数量"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16}}
                        >
                            <Input size="default"
                                value={this.state.orderCount}
                                onChange={this.handleOrderCountChange.bind(this)}
                                onBlur={this.handleOrderCountOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.orderCountAlert}</span>
                        </FormItem>
                        <FormItem className="bookSource"
                            label="图书来源"
                            labelCol={{ span: 8}}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.bookSource}
                                onChange={this.handleBookSourceChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem className="pages"
                            label="页码"
                            labelCol={{ span: 8}}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.pages}
                                onChange={this.handlePagesChange.bind(this)}
                            />
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Form>
                        <FormItem className="publishDate"
                            label="出版日期"
                            labelCol={{ span: 8}}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input size="default"
                                value={this.state.publishDate}
                                onChange={this.handlePublishDateChange.bind(this)}
                            />
                        </FormItem>
                    </Form>
                </div>
                <div className="two">
                    <Form>
                        <FormItem wrapperCol={{ span: 16, offset: 10}}>
                            <Button className="orderCommit"
                                type="primary"
                                onClick={this.handleOrderClick.bind(this)}
                            >确定</Button>
                            <Button className="orderNext"
                                type="primary"
                                onClick={this.handleNextOrderClick.bind(this)}
                            >下一个</Button>
                            <Button className="orderCancel"
                                    type="primary"
                                    onClick={this.handleCancelOrderClick.bind(this)}
                            >取消</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
}
}
export default HomePageOrder;