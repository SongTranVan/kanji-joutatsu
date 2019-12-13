import React, { Component } from 'react';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import { KANJI_CLASSES } from '../../constants/kanji_classes';
import { API_KANJI_URL, API_WORDS_URL } from '../../constants/url';
import './Canvas.css';
var path = '../model/model.json';
var model;
var canvas;
var ctx;
var preprocess_img;
const TOP_K = 10;
const IMG_SIZE = 96;
let img_data = [];

class Canvas extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            top_k: [],
        };
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.handleKanjiClick = this.handleKanjiClick.bind(this);
    }

    /*----- load model and init canvas -----*/
    async componentDidMount(){
        console.log("loading model to browser...")
        //clear the model variable
        model = undefined;
        //load the model
        model = await tf.loadLayersModel(path);
        console.log("model loaded")
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    }

    /*----- mouse down -----*/
    onMouseDown(e) {
        this.setState({
            isDrawing: true,
            lastX: e.nativeEvent.offsetX,
            lastY: e.nativeEvent.offsetY
        })
    }

    /*----- mouse up -----*/
    onMouseUp() {
        this.setState({ isDrawing: false });
        preprocess_img = canvas.toDataURL("image/png");
        // send and get multiple kanji test data
        axios.post('http://localhost:8081/', { img : preprocess_img})
            .then(rs => {
                const data = JSON.parse(JSON.stringify(rs.data));
                console.log(data);
                img_data = data;
            }
        )
        //predict kanji
        this.predict_kanji();
    }

    /*----- mouse out -----*/
    onMouseOut() {
        this.setState({ isDrawing: false });
    }

    /*----- clear canvas -----*/
    clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < 10; i++){
            if (document.getElementById(i) !== null){
                document.getElementById(i).innerHTML = "";
            }
        }
        this.setState({
            top_k: []
        })
    }

    /*----- draw on Canvas -----*/
    drawOnCanvas(e) {
        if (this.state.isDrawing) {
            ctx.strokeStyle = "#6d6e6e";
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.moveTo(this.state.lastX, this.state.lastY);
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.stroke();
            this.setState({
                lastX: e.nativeEvent.offsetX,
                lastY: e.nativeEvent.offsetY
            })
        }
    }
    
    /*----- Preprocessing canvas -----*/
    preprocessCanvas(image) {
        // resize the input image to target size of (1, IMG_SIZE, IMG_SIZE, 3)
        let tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([IMG_SIZE, IMG_SIZE])
            .expandDims()
            .toFloat();
        return tensor.div(255.);
    }
    
    /*----- Predict Kanji function -----*/
    async predict_kanji(){
        // Save image into localStorage
        try {
            localStorage.setItem("preprocess_img", preprocess_img);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
        // for (let i = 0; i < img_data.length; i++){
        //     let converted_img = new Image(400, 350);
        //     converted_img.src = img_data[i];
        //     converted_img.id = "img"+i;
        //     converted_img.style.display = "none";
        //     document.getElementById("img_list").appendChild(converted_img);
        //     // let my_img = document.createElement('img');
        //     // my_img.src = img_url;
        //     // my_img.id = "pre_img";
        //     // console.log(my_img);
        //     // document.getElementById("img-canvas").innerHTML = my_img;
        //     // let predict_img = document.getElementById("pre_img");
        //     // console.log(predict_img)
        //     // let tensor = this.preprocessCanvas(predict_img);
        //     // console.log(canvas);
        //     // let im = document.createElement('img');
        //     // im.src = img_data[i];
        //     // im.id = i;
        //     // document.getElementById("my_img").appendChild(im);
        // }
        // var pre_img = document.getElementById("img1");
        // console.log(pre_img);
        // var pr_canvas = document.getElementById("pr_canvas");
        // var pr_ctx = pr_canvas.getContext("2d");
        // console.log(cl_img)
        // let predict_img = document.getElementById("cl_img");
        // let cl_img = document.getElementById("cl_img");
        // pr_ctx.drawImage(cl_img, 50, 1);
        // console.log(cl_img);
        // let tensor = this.preprocessCanvas(cl_img);
        // var my_canvas = document.getElementById("pr_canvas");
        let converted_img = new Image(400, 350);
        converted_img.src = img_data[0];
        console.log(converted_img)
        // let tensor = this.preprocessCanvas(pre_img);
        let tensor = this.preprocessCanvas(canvas);
        // make predictions on the preprocessed image tensor
        let predictions = await model.predict(tensor).dataSync();
        // get the model's prediction results
        let top_k = this.getTopK(predictions)
        
        this.handleTopResult(top_k);
    }
    
    /*----- Save top_k to state -----*/
    handleTopResult(top_k) {
        this.setState({
            top_k: top_k
        })
    }

    /*----- Get TOP_K -----*/
    getTopK(predictions){
        // Input: predictions is the output dataSync of model.predict_kanji() function
        let top_k = Array.from(predictions)
            .map(function(p, i){
                return {
                    probability: p,
                    className: KANJI_CLASSES[i]
                };
            }).sort(function(a,b){
                return b.probability - a.probability;
            }).slice(0, TOP_K);
        return top_k
    }
    
    /*----- Draw TOP_K results -----*/
    returnResult(top_k){
        var results = top_k.map((i,index) => 
            <span id={index} onClick={this.handleKanjiClick} className="result-style" key={index}>
                {i['className']}
            </span>
        )
        return results;
    }    

    /*----- handle kanji click -----*/
    handleKanjiClick(e) {
        var selected_kanji = document.getElementById(e.target.id).textContent;
        this.clearCanvas();
        //get kanji data
        axios.get(API_KANJI_URL + selected_kanji)
            .then(rs => {
                const data = rs.data;
                this.props.handleSelectedKanji(data);
            }
        );
        //get words data
        axios.get(API_WORDS_URL + selected_kanji)
            .then(rs => {
                const words_data = rs.data;
                this.props.handleWords(words_data);
            }
        );
    }

    render(){
        return(
            <div>
                <div>
                    <div id="draw-table">
                        <div className="title-text">手書きで漢字を入力してください！</div>
                        <canvas 
                            id="canvas" 
                            width={this.props.width} height={this.props.height} 
                            onMouseMove={this.drawOnCanvas}
                            onMouseDown={this.onMouseDown}
                            onMouseUp={this.onMouseUp} 
                            onMouseOut={this.onMouseOut}
                        />
                        <div id="kanji-result">{this.returnResult(this.state.top_k)}</div>
                        <div id="canvas-btn">
                            <button className="btn btn-light btn-sm mybtn" onClick={this.clearCanvas}>削除</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Canvas;
