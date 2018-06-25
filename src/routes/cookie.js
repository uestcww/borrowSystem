import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomePage from "../templates/homepage/HomePage";
import HomePageSearch from "../templates/homepage/HomePageSearch";
import Login from "../templates/login/Login";
import HomePageShopping from "../templates/homepage/HomePageShopping"
import HomePageOrder from "../templates/homepage/HomePageOrder"
import UserManage from "../templates/user/UserManage";
import ExcelUpload from "../templates/excelUpload/ExcelUpload";
import BookManage from "../templates/circulation/manage/BookManage";
import UserManageOrder from "../templates/circulation/statistics/UserManageOrder";
import CashierBorrow from "../templates/circulation/cashier/CashierBorrow";
import HomePageCheck from "../templates/homepage/HomePageCheck"
import HomePageAccept from "../templates/homepage/HomePageAccept"
import HomePageOrderStatistic from "../templates/homepage/HomePageOrderStatistic";
import HomePageCheckStatistic from "../templates/homepage/HomePageCheckStatistic";
import ReaderManage from "../templates/circulation/manage/ReaderManage";
import borrowOrder from "../templates/circulation/statistics/borrowOrder";
import returnBook from "../templates/circulation/cashier/returnBook";

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/homePage" component={HomePage}>
                    {/*首页模块*/}
                    <Route path="/homePage/Search" component={HomePageSearch} />
                    {/*采购模块*/}
                    <Route path="/homePage/Shopping" component={HomePageShopping}/>
                    <Route path="/homePage/order" component={HomePageOrder}/>
                    <Route path="/homePage/check" component={HomePageCheck}/>
                    <Route path="/homePage/accept" component={HomePageAccept}/>
                    <Route path="/homePage/orderStatistic" component={HomePageOrderStatistic}/>
                    <Route path="/homePage/checkStatistic" component={HomePageCheckStatistic}/>
                    {/*流通模块*/}
                    <Route path="/homePage/cashier/borrow" component={CashierBorrow} />
                    <Route path="/homePage/cashier/return" component={returnBook} />
                    <Route path="/homePage/BookManage" component={BookManage} />
                    <Route path="/homePage/ReaderManage" component={ReaderManage} />
                    <Route path="/homePage/userManageCount" component={UserManageOrder} />
                    <Route path="/homePage/borrowCount" component={borrowOrder} />
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
