import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomePage from "../templates/homepage/HomePage";
import HomePageSearch from "../templates/homepage/HomePageSearch";
import Login from "../templates/login/Login";
import UserManage from "../templates/user/UserManage";
import ExcelUpload from "../templates/excelUpload/ExcelUpload";
import BookSearch from "../templates/circulation/search/BookSearch";
import UserBookManageOrder from "../templates/circulation/statistics/UserBookManageOrder";
import CashierBorrow from "../templates/circulation/cashier/CashierBorrow";

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/homePage" component={HomePage}>
                    {/*首页模块*/}
                    <Route path="/homePage/Search" component={HomePageSearch} />
                    {/*采购模块*/}
                    {/*流通模块*/}
                    <Route path="/homePage/BookSearch" component={BookSearch} />
                    <Route path="/homePage/userBookManageCount" component={UserBookManageOrder} />
                    <Route path="/homePage/cashier/borrow" component={CashierBorrow} />
                    {/*用户管理模块*/}
                    <Route path="/homePage/userManage" component={UserManage} />
                    {/*Excel书目数据导入模块*/}
                    <Route path="/homePage/upload" component={ExcelUpload} />
                </Route>
            </Router>
        );
    }
}
export default Routes;
