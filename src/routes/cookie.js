import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomePage from "../templates/homepage/HomePage";
import HomePageSearch from "../templates/homepage/HomePageSearch";
import Login from "../templates/login/Login";
<<<<<<< HEAD
import HomePageShopping from "../templates/homepage/HomePageShopping"
=======
import UserManage from "../templates/user/UserManage";
import ExcelUpload from "../templates/excelUpload/ExcelUpload";
>>>>>>> 727854f78c23861e8ee38e80c22b08dc925e2376

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/homePage" component={HomePage}>
                    <Route path="/homePage/Search" component={HomePageSearch} />
<<<<<<< HEAD
                    <Route path="/homePage/Shopping" component={HomePageShopping}/>
=======
                    <Route path="/homePage/userManage" component={UserManage} />
                    <Route path="/homePage/upload" component={ExcelUpload} />
>>>>>>> 727854f78c23861e8ee38e80c22b08dc925e2376
                </Route>
            </Router>
        );
    }
}
export default Routes;
