import React from 'react';
import { Row, Col, Input } from "antd";
import "../../css/login.css";

class Login extends React.Component{
    render(){
        const clientHeight = document.body.clientHeight;
        return(
            <div className="loginContent" style={{height: clientHeight}}>
                <div className="loginModal">
                    <div className="loginForm">
                        <Row>
                            <Col span={4}><span>账号：</span></Col>
                            <Col span={20}><Input /></Col>
                        </Row>
                        <Row>
                            <Col span={4}><span>密码：</span></Col>
                            <Col span={20}><Input /></Col>
                        </Row>
                    </div>
                </div>
                {/*<img src="./src/img/background.png" width="100%" height={clientHeight}/>*/}
            </div>
        )
    }
}
export default Login;