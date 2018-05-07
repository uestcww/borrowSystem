import React from 'react';

import "../../css/homepage.css";

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <p>
                    <span className='footerSpan'>
                        版权所有：四川省人民医院医学图书馆，电话87394703，邮箱scsyytsg@163.com
                    </span>
                </p>
            </div>
        )
    }
}
export default Footer;