import React from 'react';
import { Form, Button, Input } from "antd";
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
            author:"",
            isbn:"",
            publisher:"" ,
            price:"",
            callNumber:"",
            bindStyle:"",
            format:"",
            orderCount:"",
            bookSource:"",
            pages:"",
            publishDate:""

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
        this.setState({
            author:e.target.value
        })
    }
    handleIsbnChange(e){
        this.setState({
            isbn:e.target.value
        })
    }
    handlePublisherChange(e){
        this.setState({
            publisher:e.target.value
        })
    }
    handleCallNumberChange(e){
        this.setState({
            callNumber:e.target.value
        })
    }
    handleBindStyleChange(e){
        this.setState({
            bindStyle:e.target.value
        })
    }
    handleFormatChange(e){
        this.setState({
            format:e.target.value
        })
    }
    handleOrderCountChange(e){
        this.setState({
            orderCount:e.target.value
        })
    }
    handleBookSourceChange(e){
        this.setState({
            bookSource:e.target.value
        })
    }
    handlePagesChange(e){
        this.setState({
            pages:e.target.value
        })
    }
    handlePriceChange(e){
        this.setState({
            price:e.target.value
        })
    } handlePublishDateChange(e){
        this.setState({
            publishDate:e.target.value
        })
    }
    handleOrderClick(e){

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
                 /*
                 处理response
                */
             }
         }.bind(this)
         xmlhttp.open("POST", "http://localhost:8080/order/addOrder", false);
         xmlhttp.setRequestHeader("Content-Type", "application/json");
         xmlhttp.send(jsonString);
    }
    handleNextOrderClick(e){
        hashHistory.push({
            pathname: "/homePage/order"
        });
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
                /*hashHistory.push({
                    pathname: "/homePage/order"
                });*/
            }
        }.bind(this)
        xmlhttp.open("POST", "url", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(jsonString);
    }
    handleCancelOrderClick(e){
        hashHistory.push({
            pathname: "/homePage/Shopping"
        });
    }
render(){
        return(
            <div>
                <div>
                    <Form>
                        <FormItem
                            label="图书编号"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.bookIndex}
                                onChange={this.handleBookIndexChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="图书标题"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="责任人或作者"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.author}
                                onChange={this.handleAuthorChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="isbn"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.isbn}
                                onChange={this.handleIsbnChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="出版社"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.publisher}
                                onChange={this.handlePublisherChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="单价"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10}}
                        >
                            <Input
                                value={this.state.price}
                                onChange={this.handlePriceChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="索书号"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.callNumber}
                                onChange={this.handleCallNumberChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="装订风格"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.bindStyle}
                                onChange={this.handleBindStyleChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="开本"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.format}
                                onChange={this.handleFormatChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="订购数量"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 10}}
                        >
                            <Input
                                value={this.state.orderCount}
                                onChange={this.handleOrderCountChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="图书来源"
                            labelCol={{ span: 7}}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.bookSource}
                                onChange={this.handleBookSourceChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="页码"
                            labelCol={{ span: 7}}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.pages}
                                onChange={this.handlePagesChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem
                            label="出版日期"
                            labelCol={{ span: 7}}
                            wrapperCol={{ span: 10 }}
                        >
                            <Input
                                value={this.state.publishDate}
                                onChange={this.handlePublishDateChange.bind(this)}
                            />
                        </FormItem>
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