import React, {Component} from 'react';

import ParamView from '../../components/param/ParamView.js';

class ParamListContainer extends Component {
    paramList() {
        return [
            {
                id: 'temp',
                title: 'Temperature',
                value: 25,
                measure: 'С',
                icon: 'thermometer',
                color: '#FA7151',
            },
            {
                id: 'co2',
                title: 'CO2',
                value: 1000,
                measure: 'ppm',
                icon: 'affiliatetheme',
                color: '#9F82D5',
            },
            {
                id: 'humidity',
                title: 'Humidity',
                value: 60,
                measure: '%',
                icon: 'tint',
                color: '#49B1D9',
            },
        ];
    }

    render() {
        return (<div className="paramContainer">
            { this.paramList().map(param => (<ParamView key={`param_${param.id}`} {...param}/>)) }
        </div>);
    }
}

export default ParamListContainer;