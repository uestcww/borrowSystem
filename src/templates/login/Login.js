import React from 'react';
import { Row, Col, Input } from "antd";
import "../../css/login.css";

class Login extends React.Component{
    render(){
        const clientHeight = document.body.clientHeight;
        return(
            <div className="loginContent" style={{height: clientHeight}}>
                <Row>
                    <Col span={9}></Col>
                    <Col span={6}>账号：<Input/></Col>
                    <Col span={9}></Col>
                </Row>
                {/*<img src="./src/img/background.png" width="100%" height={clientHeight}/>*/}
            </div>
        )
    }
}
export default Login;