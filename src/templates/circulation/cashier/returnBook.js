import React from 'react';
import { Input, Button, Modal, message } from "antd";

import "../../../css/circulation/ciasher/returnBook.css";

class returnBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            bookBarcode: "",
        };
    }

    handleInputChange(e){
        this.setState({
            bookBarcode: e.target.value,
        })
    }

    handleButtonClick(){
        if(this.state.bookBarcode !== ""){
            this.setState({
                visible: true,
            });
        }else{
            message.warning("书目条形码为空！");
        }
    }

    handleModalOk(){
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 600);
    }

    handleModalCancel(){
        this.setState({
            visible: false,
        });
    }

    render(){
        return(
            <div>
                <Modal title="确认还回"
                       visible={this.state.visible}
                       onOk={this.handleModalOk.bind(this)}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleModalCancel.bind(this)}
                >
                    <p>Content of the modal</p>
                </Modal>
                <div className="returnBookDiv">
                    <div className="returnBookInputDiv">
                        <Input placeholder="这里输入书籍条形码"
                               value={this.state.bookBarcode}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </div>
                    <div className="returnBookButtonDiv">
                        <Button onClick={this.handleButtonClick.bind(this)}>还回</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default returnBook;