import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	ComposedChart,
	ReferenceArea,
	ReferenceLine,
	Line,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

import ParamChartDot from './ParamChartDot.js';
import ParamChartVerticalLabel from './ParamChartVerticalLabel.js';

class ParamChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: [],
			isResized: false,
		};
	}
	
	componentDidMount() {
		const chartData = this.props.data ? this.props.data.map(data => ({
			time: data.time,
			value: data.value,
		})) : [];
		const { width, height } = this.getSize();
		this.setState({chartData, width, height});
		window.addEventListener("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	onResize = () => {
		this.setState({
			isResized: true,
		});
		setTimeout(() => {
			const { width, height } = this.getSize();
			this.setState({
				width: width + 20,
				height: height,
				isResized: false,
			});
		});
		
	};
	
	getSize() {
		return this._container.getBoundingClientRect();
	}

	renderReferenceLines() {
		if (!this.actionList || !this.actionList.length) {
			return null;
		}
		
		return this.actionList.map(actionData => {
			return (<ReferenceLine 
				x={actionData.time}
				label={actionData.name}
				stroke="red"
			/>);
		});
	}
	
	renderChart = () => (
		<ComposedChart
			data={this.props.data}
			height={this.state.height}
			width={this.state.width}
			margin={{top: 20, right: 20, bottom: 20, left: 20}}
		>
			<defs>
				<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					<stop offset="10%" stopColor="#82ca9d" stopOpacity={0.8}/>
					<stop offset="75%" stopColor="#82ca9d" stopOpacity={0.4}/>
					<stop offset="100%" stopColor="#82ca9d" stopOpacity={0.4}/>
				</linearGradient>
			</defs>
			
			<XAxis 
				dataKey="time"
				type="category"
				scale="utcTime"
				tick={<ParamChartVerticalLabel />}
			/>
			<YAxis domain={this.props.domainY} type="number" allowDataOverflow={true}/>
			<Tooltip/>
			<Legend
				wrapperStyle={{
					position: 'absolute',
					right: '10px',
					top: 0,
				}}
				verticalAlign="top"
				align="right"
				payload={[
					{ id: 'comfort', value: 'Comfort range', type: 'square', color: '#82ca9d'},
					{ id: 'hystory', value: 'Historical data', type: 'line', color: '#ff7300'},
				]}
			/>
			<CartesianGrid stroke='#f5f5f5'/>
			<ReferenceArea 
				y1={this.props.minComfortValue}
				y2={this.props.maxComfortValue}
				stroke="#82ca9d"
				fill="url(#colorUv)"
				label={`${this.props.minComfortValue}-${this.props.maxComfortValue} ${this.props.measure}`}
			/>
			{this.renderReferenceLines()}
			<Area type='monotone' dataKey="noKey" stackId="1" stroke='#82ca9d' fill='#fff' fill-opacity='0'/>
			<Line 
				type='monotone'
				dataKey='value'
				stroke='#ff7300'
				dot={
					<ParamChartDot min={this.props.minComfortValue} max={this.props.maxComfortValue}/>
				}
			/>
		</ComposedChart>
	);
	
	render() {
		return (
			<div className="chart">
				<div className="title">{`${this.props.name} (${this.props.measure})`}</div>
				<div 
					ref={(ref) => this._container = ref}
					className='paramChartContainer'
				>
					{this.state.isResized ? null : this.renderChart()}
				</div>
			</div>
		);
	}
};

ParamChart.propTypes = {
	minComfortValue: PropTypes.number.isRequired,
	maxComfortValue: PropTypes.number.isRequired,
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	data: PropTypes.array,
	measure: PropTypes.string,
	actionList: PropTypes.array,
};

export default ParamChart;