import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                {/*<Route path="/" component={Applist}>*/}
                    {/*<Route path="/mylibrary" component={Mylibrary}>*/}
                        {/*<Route path="/mylibrary/MyInfo" component={Myinfo} />*/}
                        {/*<Route path="/mylibrary/ChangePsd" component={Changepsd} />*/}
                        {/*<Route path="/mylibrary/ChangeInfo" component={Changeinfo} />*/}
                        {/*<Route path="/mylibrary/DownloadDetail" component={Test} />*/}
                        {/*<Route path="/mylibrary/uploadBook" component={uploadBook} />*/}
                        {/*<Route path="/mylibrary/downloadTimesManage" component={downloadTimesManage}>*/}
                            {/*<Route path="/mylibrary/downloadTimesManage/senior" component={seniorDownloadManage} />*/}
                            {/*<Route path="/mylibrary/downloadTimesManage/intermediate" component={intermediateDownloadManage} />*/}
                            {/*<Route path="/mylibrary/downloadTimesManage/junior" component={juniorDownloadManage} />*/}
                            {/*<Route path="/mylibrary/downloadTimesManage/FY" component={FYDownloadManage} />*/}
                            {/*<Route path="/mylibrary/downloadTimesManage/TSG" component={TSGDownloadManage} />*/}
                        {/*</Route>*/}
                    {/*</Route>*/}
                {/*</Route>*/}
            </Router>
        );
    }
}
export default Routes;
