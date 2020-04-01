import React from 'react';

const AppFooter = (props) => {
    return (
        <div className="layout-footer">
            <span className="footer-text" style={{'marginRight': '5px'}}>CoronaBuster</span>
            {/*<img src="assets/layout/images/logo.svg" alt="" width="80"/>*/}
            <span className="footer-text" style={{'marginLeft': '5px'}}>Admin Dashboard</span>
        </div>
    );

};

export default AppFooter;