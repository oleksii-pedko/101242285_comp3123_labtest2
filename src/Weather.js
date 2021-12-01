import React from 'react';
import './App.css';
import axios from 'axios';

export default class Weather extends React.Component {
    state = {
        icon: [],
        data: [],
        name: '',
        country: '',
        feels_like: '',
        description: ''
    }

    componentDidMount() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=493ef59b3ebdf52d02cfe12cb09cd60a`)
            .then(res => {
                const icon = res.data.weather[0].icon;
                // console.log(icon);
                this.setState({icon});
                const data = res.data.main.temp;
                this.setState({data});
                const name = res.data.name;
                this.setState({name});
                const country = res.data.sys.country;
                this.setState({country});
                const feels_like = res.data.main.feels_like;
                this.setState({feels_like});
                const description = res.data.weather[0].description;
                this.setState({description});
            });

    }

    render() {
        let image = 'http://openweathermap.org/img/wn/' + this.state.icon.toString() + '@2x.png';
        let feel = Math.round(this.state.feels_like - 273.15);
        return (
            <div className="container">
                <div className="main">
                    <div className="item">
                        <img src={image} alt=""/>
                        <h1>{Math.round(this.state.data - 273.15)} <span> °C</span></h1>
                        <h4>{this.state.name}, {this.state.country}</h4>
                    </div>
                    <div className="item left">
                        <span>Feels like: {feel} °C</span><br/>
                        <span>{this.state.description}</span>
                    </div>
                </div>
            </div>
        )
    }
}