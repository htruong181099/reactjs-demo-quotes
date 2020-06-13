import React from 'react';
import './Quotes.css'
import 'bootstrap/dist/css/bootstrap.css';

class Quotes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colors : ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"],
            color : "#16a085",
            quotes: [],
            quote: "",
            author: ""
        }
    }

    componentDidMount() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(res => res.json())
        .then(
            (result) =>{
                const rand = Math.floor(Math.random()*100);
                const first = result.quotes[rand];
                this.setState({ 
                    quotes : result.quotes,
                    quote: first.quote,
                    author: first.author
                })
            }
        )
        document.body.style.backgroundColor = "#16a085";
    }

    btnHandle(event){
        const randQuoteIndex = Math.floor(Math.random()*100);
        const quote = this.state.quotes[randQuoteIndex];
        const randColorIndex = Math.floor(Math.random()*this.state.colors.length);
        const colorChange = this.state.colors[randColorIndex];
        document.body.style.backgroundColor = colorChange;
        this.setState({
            quote: quote.quote,
            author: quote.author,
            color: colorChange
        })
        
    }

    render(){
        return(
                <div className="wrapper">
                    <div id="quote-box">
                        <div className="quote-text" style={{color:this.state.color}}> 
                            <i className="fa fa-quote-left">"</i>
                            <span>{this.state.quote!==""?this.state.quote:"Loading..."}</span>
                        </div>
                        <div className="quote-author" style={{color:this.state.color}}>
                            <span>- {this.state.author}</span>
                        </div>
                        <div className="buttons">
                            <button className="btn button" style={{backgroundColor:this.state.color}} onClick={(e)=>this.btnHandle(e)}> New quote</button>
                        </div>
                    </div>
                    <div className="footer"> 
                        by Hoang Truong
                    </div>
                </div>
        )
    }
}

export default Quotes;