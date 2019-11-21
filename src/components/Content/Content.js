import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import Kanji from '../Kanji/Kanji';
import Word from '../Word/Word';
import './Content.css';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            kanji_data: [],
            words_data: []
        }
    }

    callbackHandleSelectedKanji = (kanji_data) => {
        this.setState({
            kanji_data: kanji_data
        });
    }

    callbackHandleWords = (words_data) => {
        this.setState({
            words_data: words_data
        })
    }

    render(){
        return(
            <div className="container padding-by-rem">
                <div className="row">
                    <div className="col-5">
                        <Canvas handleSelectedKanji={this.callbackHandleSelectedKanji} handleWords={this.callbackHandleWords} width="400" height="350"/>
                    </div>                  
                    <div className="col-7">
                        <Kanji kanji_data={this.state.kanji_data}/>
                    </div>
                </div>
                <div>
                    <Word words_data={this.state.words_data}/>
                </div>
            </div>
        );
    }
}

export default Content;
