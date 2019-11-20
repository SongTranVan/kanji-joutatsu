import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render(){
        return(
            <header className="navbar navbar-expand navbar-dark bg-blue height-130">
                <div className="rows mg-center">
                    <div className="navbar-brand kanji-brand kosugi-maru">
                        漢字上達
                    </div>
                    <div className="romaji-brand kosugi-maru">
                        かんじじょうたつ
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
