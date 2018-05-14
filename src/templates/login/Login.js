import React from 'react';
import { Form, Row, Col, Input } from "antd";
import { Button, Radio, DatePicker,TimePicker, message } from 'antd';
import "../../css/login.css";

const FormItem = Form.Item;

class Login extends React.Component{
    handleLoginClick(e){
        let xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let responseObj = JSON.parse(xmlhttp.responseText);
                /*
                处理response
                */
            }
        }.bind(this)
        xmlhttp.open("POST","url",false);
        xmlhttp.setRequestHeader("Content-Type","application/json");
        xmlhttp.send();
    }
    render(){
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
                        <Input />
                    </FormItem>
                    <FormItem
                        label="密码"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary">确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Login;