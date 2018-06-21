import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomePage from "../templates/homepage/HomePage";
import HomePageSearch from "../templates/homepage/HomePageSearch";
import Login from "../templates/login/Login";

import HomePageShopping from "../templates/homepage/HomePageShopping"
import HomePageOrder from "../templates/homepage/HomePageOrder"
import UserManage from "../templates/user/UserManage";
import ExcelUpload from "../templates/excelUpload/ExcelUpload";
import HomePageCheck from "../templates/homepage/HomePageCheck"
import HomePageAccept from "../templates/homepage/HomePageAccept"
import HomePageOrderStatistic from "../templates/homepage/HomePageOrderStatistic";
import HomePageCheckStatistic from "../templates/homepage/HomePageCheckStatistic";


class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/homePage" component={HomePage}>
                    <Route path="/homePage/Search" component={HomePageSearch} />
                    <Route path="/homePage/Shopping" component={HomePageShopping}/>
                    <Route path="/homePage/userManage" component={UserManage} />
                    <Route path="/homePage/upload" component={ExcelUpload} />
                    <Route path="/homePage/order" component={HomePageOrder}/>
                    <Route path="/homePage/check"component={HomePageCheck}/>
                    <Route path="/homePage/accept" component={HomePageAccept}/>
                    <Route path="/homePage/orderStatistic" component={HomePageOrderStatistic}/>
                    <Route path="/homePage/checkStatistic" component={HomePageCheckStatistic}/>

                </Route>
            </Router>
        );
    }
}
export default Routes;
