import React from 'react';
import { Form, Button, Input, message } from "antd";
import { Router, Route, hashHistory} from 'react-router';
import "../../css/login.css";

const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password:"",
            usernamealert:"",
            passwordalert:""
        }
    }
    handleUsernameChange(e){
        this.setState({
            username: e.target.value,
        })
    }
    handleUsernameOnBlur(e){
     if (this.state.username==""){
      this.setState({
          usernamealert:"请输入用户名"
      })
     }else {
         this.setState({
             usernamealert:""
         })
     }
    }
    handlePasswordChange(e){
        this.setState({
            password:e.target.value,
        })
    }
    handlePasswordOnBlur(e){
        if (this.state.password===""){
            this.setState({
                passwordalert:"请输入密码"
            })
        }else {
            this.setState({
                passwordalert:""
            })
        }
    }
    handleLoginClick(e){
        hashHistory.push({
            pathname: "/homePage/Search"
        });
        // let flag = false;
        // if (this.state.username===""){
        //     flag = true;
        //     this.setState({usernamealert:"请输入用户名"})
        // }
        // if (this.state.password===""){
        //     flag = true;
        //     this.setState({passwordalert:"请输入密码"})
        // }
        // if(flag){
        //     return;
        // }
        // const jsonObj = {
        //     username: this.state.username,
        //     password: this.state.password,
        // };
        // let jsonString = JSON.stringify(jsonObj);
        // let xmlhttp;
        // xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function(){
        //     if(xmlhttp.readyState === 4&&xmlhttp.status === 200){
        //         let responseObj = JSON.parse(xmlhttp.responseText);
        //         if(responseObj.errcode === "000"){
        //             message.success("登录成功！");
        //             localStorage.setItem("username",this.state.username);
        //             localStorage.setItem("isLogin",true);
        //             hashHistory.push({
        //                 pathname: "/homePage/Search",
        //             });
        //         }else if(responseObj.errcode === "001"){
        //             message.error("账号或密码错误！");
        //         }
        //     }
        // }.bind(this);
        // xmlhttp.open("POST","/user/login",true);
        // xmlhttp.setRequestHeader("Content-Type","application/json");
        // xmlhttp.send(jsonString);
    }
    render(){
        const clientHeight = document.body.clientHeight;
        return(
            <div className="loginContent" style={{height: clientHeight}}>
                <div className="formContent">
                    <Form>
                        <FormItem
                            label="账号"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input
                                value={this.state.username}
                                onChange={this.handleUsernameChange.bind(this)}
                                onBlur={this.handleUsernameOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.usernamealert}</span>
                        </FormItem>
                        <FormItem
                            label="密码"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)}
                                onBlur={this.handlePasswordOnBlur.bind(this)}
                            />
                            <span className="alertContent">{this.state.passwordalert}</span>
                        </FormItem>
                        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
                            <Button
                                type="primary"
                                onClick={this.handleLoginClick.bind(this)}
                            >确定</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login;