import React from 'react';
import PropTypes from 'prop-types';
import {ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const ParamChart = ({
                        name,
                        minStandard,
                        maxStandard,
                        data,
                        width,
                        height,
                        color,
                        className,
                    }) => {

    const chartData = data.map(data => ({
        time: data.time,
        value: data.value,
        min: minStandard,
        max: maxStandard - minStandard,
    }));

    return (
        <div className={`chart ${className}`}>
            <div className="title">{name}</div>
            <ComposedChart
                data={chartData}
                height={height}
                width={width}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}
            >
                <XAxis dataKey="time"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <CartesianGrid stroke='#f5f5f5'/>
                <Area type='monotone' dataKey='min' stackId="1" stroke='#fff' fill='#fff' fill-opacity='0' />
                <Area type='monotone' dataKey='max' stackId="1" stroke='#fff' fill='#82ca9d' />
                <Area type='monotone' dataKey="noKey" stackId="1" stroke='#fff' fill='#fff' fill-opacity='0' />
                <Line type='monotone' dataKey='value' stroke='#ff7300'/>
            </ComposedChart>
        </div>
    );
};

ParamChart.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default ParamChart;