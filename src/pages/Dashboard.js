import React, { Component } from 'react';

import ParamChart from '../components/charts/ParamChart.js';

import ParamListContainer from '../containers/param/ParamListContainer.js';

import io from 'socket.io-client';
import config from '../config';

class UserFilterListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartList: [],
			historyData: {},
			currentValueSettingsList: [],
			currentValueList: [],
		};
	}

	componentDidMount() {
		this.socket = io(config.socket);

		this.socket.on('connect', () => {
			console.log('connect');
			this.socket.emit('initialize', {
				roomId: 743,
				count: 30,
				step: 10000,
			});

			this.socket.on('room_initial_data', (params) => {
				console.log('room_initial_data', params);
				this.setState({
					chartList: params.conditions ? params.conditions : [],
					currentValueSettingsList: this.getActualCurrentData(params.conditions),
				});
			});

			this.socket.on('room_last_entry', (params) => {
				console.log('room_last_entry', params[0]);

				const historyData = this.state.historyData;
				const chartList = this.state.chartList;
				const currentValueList = this.state.currentValueList;
				
				chartList.forEach(chart => {
					historyData[chart.id].push({
						value: params[0][chart.id],
						time: this.getTime(params[0].time),
					});
					historyData[chart.id].shift();
					currentValueList[chart.id] = params[0][chart.id];
				});
				this.setState({
					historyData,
					currentValueList,
				});
			});

			this.socket.on('room_initial_entries', (params) => {
				console.log('room_initial_entries', params);
				const chartList = this.state.chartList;
				const data = {
					[chartList[0].id]: [],
					[chartList[1].id]: [],
					[chartList[2].id]: [],
				};
				let currentValueList;
				params.forEach((d, index) => {
					const timeStr = this.getTime(d.time);
					data[chartList[0].id].push({value: d[chartList[0].id], time: timeStr});
					data[chartList[1].id].push({value: d[chartList[1].id], time: timeStr});
					data[chartList[2].id].push({value: d[chartList[2].id], time: timeStr});
					if (index === params.length - 1) {
						currentValueList = {
							[chartList[0].id]: d[chartList[0].id],
							[chartList[1].id]: d[chartList[1].id],
							[chartList[2].id]: d[chartList[2].id],
						}
					}
				});
				this.setState({
					historyData: data,
					currentValueList: currentValueList,
				});
			});
		});
	}
	
	getTime(time) {
		const date = new Date(time);
		const h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();
		return `${h}:${m}:${s}`;
	}
	
	getActualCurrentData(params) {
		return params.map(({id, name, measure}) => ({
			id,
			name,
			measure,
		}));
	}

	render() {
		const chartList = this.state.chartList;
		const historyData = this.state.historyData;
		
		return (
			<div className="root">
				<ParamListContainer 
					settings={this.state.currentValueSettingsList}
					values={this.state.currentValueList}
				/>
				
				<div className="chartContainer">
					{chartList[0] ? <ParamChart
						className="leftContainer"
						key={`chart_${chartList[0].id}`}
						{...chartList[0]}
						data={historyData[chartList[0].id]}
						domainY={[15, 30]}
					/> : null}
					<div className="rightContainer">
						{chartList[1] ? <ParamChart
							key={`chart_${chartList[1].id}`}
							{...chartList[1]}
							data={historyData[chartList[1].id]}
							domainY={[400, 1500]}
						/> : null}
						{chartList[2] ? <ParamChart
							key={`chart_${chartList[2].id}`}
							{...chartList[2]}
							data={historyData[chartList[2].id]}
							domainY={[180, 1000]}
						/> : null}
					</div>
				</div>
			</div>
		);
	}
};

export default UserFilterListContainer;
