import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import Kanji from '../Kanji/Kanji';
import Word from '../Word/Word';
import './Content.css';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            kanji_data: []
        }
    }

    callbackHandleSelectedKanji = (kanji_data) => {
        this.setState({
            kanji_data: kanji_data
        });
    }

    render(){
        return(
            <div className="container padding-by-rem">
                <div className="row">
                    <div className="col-5">
                        <Canvas handleSelectedKanji={this.callbackHandleSelectedKanji} width="400" height="350"/>
                    </div>                  
                    <div className="col-7">
                        <Kanji kanji_data={this.state.kanji_data}/>
                    </div>
                </div>
                <div>
                    <Word />
                </div>
            </div>
        );
    }
}

export default Content;
