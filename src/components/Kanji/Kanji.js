import React, { Component } from 'react';
import './Kanji.css';

class Kanji extends Component {
    render(){
        console.log(this.props.kanji_data);
        return(
            <div className="kanji-info">
                <div className="kanji-structure">
                    <div className="row justify-content-between">
                        <div className="kanji">{this.props.kanji_data.kanji}</div>
                        <div className="col-4 info-box">
                            <div className="row justify-content-between">
                                <div className="info-text">Grade</div>
                                <div className="info">{this.props.kanji_data.grade}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">JLPT</div>
                                <div className="info">{this.props.kanji_data.jlpt}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">Stroke</div>
                                <div className="info">{this.props.kanji_data.stroke_count}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">Unicode</div>
                                <div className="info">{this.props.kanji_data.unicode}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="yomikata">
                    <div className="row">
                        <div className="col-3 yomi-text">On</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.on_readings == null?"":
                                    this.props.kanji_data.on_readings.map((i, index) =>
                                        <div className="onyomi" key={index}>{i}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Kun</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.kun_readings == null?"":
                                    this.props.kanji_data.kun_readings.map((i, index) =>
                                        <div className="kunyomi" key={index}>{i}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Nanori</div>
                        <div className="col-9">
                            <div className="row float-right">
                                <div className="nanori">かみなり</div>
                                <div className="nanori">いかずち</div>
                                <div className="nanori">いかづち</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Meanings</div>
                        <div className="col-9">
                            <div className="row float-right">
                                <div className="mean">castle</div>
                                <div className="mean">castle</div>
                                <div className="mean">castle</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Kanji;