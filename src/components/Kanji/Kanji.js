import React, { Component } from 'react';
import axios from 'axios';
import { API_KANJI_URL } from '../../constants/url';
import './Kanji.css';
const default_kanji = "字";

class Kanji extends Component {
    constructor(props){
        super(props);
        this.state = {
            kanji: "",
            grade: 0,
            jlpt: 0,
            stroke_count: 0,
            unicode: "",
            on_readings: [],
            kun_readings: [],
            name_readings: [],
            meanings: []
        }
    }

    componentDidMount(){
        //get default kanji data
        axios.get(API_KANJI_URL + default_kanji)
            .then(rs => {
                const data = rs.data;
                this.setState({
                    kanji: data.kanji,
                    grade: data.grade,
                    jlpt: data.jlpt,
                    stroke_count: data.stroke_count,
                    unicode: data.unicode,
                    on_readings: data.on_readings,
                    kun_readings: data.kun_readings,
                    name_readings: data.name_readings,
                    meanings: data.meanings
                })
            }
        );
    }

    showDefaultOnyomi(on){
        let rs = on.map((i, index) =>
            <div className="onyomi" key={index}>{i}</div>
        )
        
        return rs;
    }

    showOnyomi(on){
        let rs = on.map((i, index) =>
            <div className="onyomi" key={index}>{i}</div>
        )

        return rs;
    }

    showDefaultKunyomi(kun){
        let rs = kun.map((i, index) =>
            <div className="kunyomi" key={index}>{i}</div>
        )
        
        return rs;
    }

    showKunyomi(kun){
        let rs = kun.map((i, index) =>
            <div className="kunyomi" key={index}>{i}</div>
        )

        return rs;
    }

    showDefaultMeanings(mean){
        let rs = mean.map((i, index) =>
            <div className="mean" key={index}>{i}</div>
        )
        
        return rs;
    }

    showMeanings(mean){
        let rs = mean.map((i, index) =>
            <div className="mean" key={index}>{i}</div>
        )

        return rs;
    }

    showNameReadings(name_readings){
        let rs = name_readings.map((i, index) =>
            <div className="nanori" key={index}>{i}</div>
        )

        return rs;
    }

    render(){
        return(
            <div className="kanji-info">
                <div className="kanji-structure">
                    <div className="row justify-content-between">
                        <div className="kanji">{this.props.kanji_data.kanji?this.props.kanji_data.kanji:this.state.kanji}</div>
                        <div className="col-4 info-box">
                            <div className="row justify-content-between">
                                <div className="info-text">Grade</div>
                                <div className="info">{this.props.kanji_data.grade?this.props.kanji_data.grade:this.state.grade}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">JLPT</div>
                                <div className="info">{this.props.kanji_data.jlpt?this.props.kanji_data.jlpt:this.state.jlpt}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">Strokes</div>
                                <div className="info">{this.props.kanji_data.stroke_count?this.props.kanji_data.stroke_count:this.state.stroke_count}</div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="info-text">Unicode</div>
                                <div className="info">{this.props.kanji_data.unicode?this.props.kanji_data.unicode:this.state.unicode}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="yomikata">
                    <div className="row">
                        <div className="col-3 yomi-text">On</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.on_readings == null?this.showDefaultOnyomi(this.state.on_readings):this.showOnyomi(this.props.kanji_data.on_readings)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Kun</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.kun_readings == null?this.showDefaultKunyomi(this.state.kun_readings):this.showKunyomi(this.props.kanji_data.kun_readings)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Nanori</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.name_readings == null?"":this.showNameReadings(this.props.kanji_data.name_readings)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 yomi-text">Meanings</div>
                        <div className="col-9">
                            <div className="row float-right">
                                {this.props.kanji_data.meanings == null?this.showDefaultMeanings(this.state.meanings):this.showMeanings(this.props.kanji_data.meanings)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );      
    }
}

export default Kanji;
