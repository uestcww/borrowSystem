import React from 'react';
import { Upload, Icon, Button, message } from 'antd';
import "../../css/upload.css";

const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    accept:'.xls',
    multiple: true,
    showUploadList: false,
    action: 'url',
    onChange(info) {
        const result = info.file.response;
        if (result.code === '0') {
            message.success(`${info.file.name} 上传成功.`);
        } else {
            message.error('上传失败，'+result.msg);
        }
    },
};

class ExcelUpload extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {/*<div style={{ marginTop:'0.1rem',padding:"0 5rem", height: "2rem"}}>*/}
                    {/*<a href="/library/ebook/exportExcel"><Button type="primary">下载Excel模板</Button></a>*/}
                    {/*<Dragger {...props}>*/}
                        {/*<p className="ant-upload-drag-icon">*/}
                            {/*<Icon type="inbox" />*/}
                        {/*</p>*/}
                        {/*<p className="ant-upload-text">选择或者拖动文件到此区域上传</p>*/}
                        {/*/!*<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>*!/*/}
                    {/*</Dragger>*/}
                {/*</div>*/}
                <div>
                    <div className="uploadarea">
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
                        </Dragger>
                    </div>
                </div>
            </div>
        )
    }
}
export default ExcelUpload;