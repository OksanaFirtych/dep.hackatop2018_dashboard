import React, { Component } from 'react';

import ParamChart from '../components/charts/ParamChart.js';

import ParamListContainer from '../containers/param/ParamListContainer.js';

class UserFilterListContainer extends Component {
    chartList() {
        return [
            {
                name: 'Temperature',
                minStandard: 23,
                maxStandard: 26,
                data: [
                    {time: '13:00', value: '23'},
                    {time: '13:10', value: '24'},
                    {time: '13:20', value: '25'},
                    {time: '13:30', value: '26'},
                    {time: '13:40', value: '27'},
                    {time: '13:50', value: '28'},
                    {time: '14:00', value: '29'},
                ],
                color: '#FA7151',
            },
            {
                name: 'Humidity',
                minStandard: 30,
                maxStandard: 60,
                data: [
                    {time: '13:00', value: '25'},
                    {time: '13:10', value: '30'},
                    {time: '13:20', value: '25'},
                    {time: '13:30', value: '30'},
                    {time: '13:40', value: '25'},
                    {time: '13:50', value: '30'},
                    {time: '14:00', value: '25'},
                ],
                color: '#FA7151',
            },
            {
                name: 'CO2',
                minStandard: 600,
                maxStandard: 1000,
                data: [
                    {time: '13:00', value: '600'},
                    {time: '13:10', value: '700'},
                    {time: '13:20', value: '800'},
                    {time: '13:30', value: '900'},
                    {time: '13:40', value: '1000'},
                    {time: '13:50', value: '1300'},
                    {time: '14:00', value: '1500'},
                ],
                color: '#FA7151',
            },
        ];
    }

    render() {
        const chartList = this.chartList();
        return (
            <div className="root">
                <div className="currentValueContainer">
                    <ParamListContainer />
                </div>
                <div className="chartContainer">
                    <ParamChart
                        className="leftContainer"
                        key={`chart_${chartList[0].name}`}
                        {...chartList[0]}
                        width={600}
                        height={620}
                    />
                    <div className="rightContainer">
                        <ParamChart
                            key={`chart_${chartList[1].name}`}
                            {...chartList[1]}
                            width={490}
                            height={300}
                        />
                        <ParamChart
                            key={`chart_${chartList[2].name}`}
                            {...chartList[2]}
                            width={490}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserFilterListContainer;