import React, { Component } from 'react';
import axios from 'axios';
import { API_WORDS_URL } from '../../constants/url';
import './Word.css';
const default_kanji = "字";

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words_data: []
        }
    }

    componentDidMount() {
        //get default words data
        axios.get(API_WORDS_URL + default_kanji)
            .then(rs => {
                const words_data = rs.data;
                this.setState({
                    words_data: words_data
                })
            }
        );
    }

    showDefaultWord(words_data){
        let rs = words_data.slice(5,15).map((i, index) =>
            <div className="row margin-10" key={index}>
                <div className="col-5 margin-top-10">
                    <span className="word">{i.variants[0].written}</span>
                </div>
                <div className="col-7">
                    <div className="rows float-right">
                        <div className="mean-jap float-right">
                            {i.variants[0].pronounced}
                        </div>
                        <div className="mean-en">
                            <div className="row float-right">
                                {i.meanings[0].glosses.map((j,index)=>
                                    <div key={index}>{j};&nbsp;</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        return rs;
    }

    showWord(words_data){
        let rs = words_data.slice(5,15).map((i, index) =>
            <div className="row margin-10" key={index}>
                <div className="col-5 margin-top-10">
                    <span className="word">{i.variants[0].written}</span>
                </div>
                <div className="col-7">
                    <div className="rows float-right">
                        <div className="mean-jap float-right">
                            {i.variants[0].pronounced}
                        </div>
                        <div className="mean-en">
                            <div className="row float-right">
                                {i.meanings[0].glosses.map((j,index)=>
                                    <div key={index}>{j};&nbsp;</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
        return rs;
    }

    render(){
        return (
            <div className="words-box">
                <div className="row">
                    <div className="col-4 word-text">Word</div>
                    <div className="col-8">
                        <div className="word-text float-right">
                        Meanings
                        </div>
                    </div>
                </div>
                {this.props.words_data.length > 0 ? this.showWord(this.props.words_data) : this.showDefaultWord(this.state.words_data)}
            </div>
        );
    }
}

export default Word;
