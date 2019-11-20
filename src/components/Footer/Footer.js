import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render(){
        return(
            <footer className="navbar navbar-expand navbar-dark bg-blue">
                <div className="rows mg-center">
                    <div className="navbar-brand author-brand nutino">
                        Copyright©2019 by Song Tran Van
                    </div>
                    <div className="company-brand nutino">
                        PR TIMES Inc
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
