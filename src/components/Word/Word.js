import React, { Component } from 'react';
import './Word.css';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            meanings: []
        }
    }

    render() {
        return (
            <div className="words-box">
                <div className="row">
                    <div className="col-1 word-text">Word</div>
                    <div className="col-11">
                        <div className="word-text float-right">
                        Meanings
                        </div>
                    </div>
                </div>
                <div className="row margin-10">
                    <div className="col-1">
                        <div className="word">城</div>
                    </div>
                    <div className="col-11">
                        <div className="rows float-right">
                            <div className="mean-jap float-right">しろ</div>
                            <div className="mean-en">
                                <div className="row float-right">
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-10">
                    <div className="col-1">
                        <div className="word">城</div>
                    </div>
                    <div className="col-11">
                        <div className="rows float-right">
                            <div className="mean-jap float-right">しろ</div>
                            <div className="mean-en">
                                <div className="row float-right">
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-10">
                    <div className="col-1">
                        <div className="word">城</div>
                    </div>
                    <div className="col-11">
                        <div className="rows float-right">
                            <div className="mean-jap float-right">しろ</div>
                            <div className="mean-en">
                                <div className="row float-right">
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                    <div>castle</div>&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-10">
                    <div className="col-1">
                        <div className="word">城</div>
                    </div>
                    <div className="col-11">
                        <div className="rows float-right">
                            <div className="mean-jap float-right">しろ</div>
                            <div className="mean-en">
                                <div className="row float-right">
                                    <div>castle;</div>&nbsp;
                                    <div>castle;</div>&nbsp;
                                    <div>castle;</div>&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Word;