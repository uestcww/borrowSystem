import React from 'react';
import { Form, Row, Col, Input } from "antd";
import { Button, Radio, DatePicker,TimePicker, message } from 'antd';
import "../../css/login.css";
import HomePage from "../homepage/HomePage";

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
        if (this.state.password==""){
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
        if (this.state.username!=""&this.state.password!="") {
            const jsonObj = {
                username: this.state.username,
                password: this.state.password
            }
            let jjj = JSON.stringify(jsonObj)
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
            xmlhttp.open("POST", "url", false);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(jjj);
        }else if (this.state.username==""){
            this.setState({
                usernamealert:"请输入用户名"
            })
        } else if (this.state.password==""){
            this.setState({
                passwordalert:"请输入密码"
            })
        }

    }
    render(x1){
        const clientHeight = document.body.clientHeight;
        const formStyle = {
            width: 800,
            marginLeft: "auto",
            marginRight: "auto",
        }
        return(
            <div className="loginContent" style={{height: clientHeight}}>
                <Form style={formStyle}>
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
                        <span>{this.state.usernamealert}</span>
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
                        <span>{this.state.passwordalert}</span>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button
                            type="primary"
                            onClick={this.handleLoginClick.bind(this)}
                        >确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Login;