import React, { Component } from 'react';

import ParamChart from '../components/charts/ParamChart.js';

import ParamListContainer from '../containers/param/ParamListContainer.js';

import DashboardControlPanel from '../components/controls/DashboardControlPanel.js';

import io from 'socket.io-client';
import config from '../config';

class UserFilterListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitState();
	}
	
	getInitState() {
		return {
			chartList: [],
			historyData: {},
			currentValueSettingsList: [],
			currentValueList: [],
			dashSettigns: {
				roomId: 743,
				count: 30,
				step: 10000,
			},
			eventList: [],
		};
	}
	
	connectSocket() {
		this.socket = null;
		this.socket = io(config.socket);

		this.socket.on('connect', () => {
			console.log('connect');
			
			this.socket.emit('initialize', this.state.dashSettigns);
			
			this.socket.on('room_initial_data', this.onRoomInitialData);
			this.socket.on('room_last_entry', this.onRoomLastEntry);
			this.socket.on('room_initial_entries', this.onRoomInitialEntries);
			this.socket.on('room_event', this.onRoomEvent);
		});
	}

	onRoomEvent = (params) => {
		console.log('room_event', params);
		const {eventList, historyData, chartList} = this.state;
		const timeStr = this.getTime(params[0].time);
		eventList.push({value: params[0].name, time: timeStr});
		if (eventList[0].time < historyData[chartList[0].id][0].time) {
			eventList.shift();
		}
	};
	
	onRoomInitialData = (params) => {
		console.log('room_initial_data', params);
		this.setState({
			chartList: params.conditions ? params.conditions : [],
			currentValueSettingsList: this.getActualCurrentData(params.conditions),
		});
	};

	onRoomLastEntry = (params) => {
		console.log('room_last_entry', params[0]);

		const {
			historyData,
			chartList,
			currentValueList,
		} = this.state;

		chartList.forEach(chart => {
			const timeStr = this.getTime(params[0].time);
			if (timeStr !== historyData[chart.id][historyData[chart.id].length -1].time) {
				historyData[chart.id].push({
					value: params[0][chart.id],
					time: this.getTime(params[0].time),
				});
				historyData[chart.id].shift();
				currentValueList[chart.id] = params[0][chart.id];
				
			}
		});
		this.setState({
			historyData,
			currentValueList,
		});
	};
	
	onRoomInitialEntries = (params) => {
		console.log('room_initial_entries', params);
		const chartList = this.state.chartList;
		const data = {
			[chartList[0].id]: [],
			[chartList[1].id]: [],
			[chartList[2].id]: [],
		};
		let currentValueList;
		const eventList = [];
		params.forEach((d, index) => {
			const timeStr = this.getTime(d.time);
			data[chartList[0].id].push({value: d[chartList[0].id], time: timeStr});
			data[chartList[1].id].push({value: d[chartList[1].id], time: timeStr});
			data[chartList[2].id].push({value: d[chartList[2].id], time: timeStr});
			if (d.event) { 
				eventList.push({name: d.event, time: timeStr});
			};
			if (index === params.length - 1) {
				currentValueList = {
					[chartList[0].id]: d[chartList[0].id],
					[chartList[1].id]: d[chartList[1].id],
					[chartList[2].id]: d[chartList[2].id],
				}
			}
		});
		console.log(eventList);
		this.setState({
			historyData: data,
			currentValueList,
			eventList,
		});
	};

	componentDidMount() {
		this.connectSocket();
	}
	
	getTime(time) {
		const date = new Date(time);
		let h = date.getHours().toString();
		h = h.length === 1 ? '0' + h : h;
		let m = date.getMinutes().toString();
		m = m.length === 1 ? '0' + m : m;
		let s = date.getSeconds().toString();
		s = s.length === 1 ? '0' + s : s;
		return `${h}:${m}:${s}`;
	}
	
	getActualCurrentData(params) {
		return params.map(({id, name, measure}) => ({
			id,
			name,
			measure,
		}));
	}
	
	changeControl = (dashSettigns) => {
		console.log(dashSettigns);
		const newState = this.getInitState();
		newState.dashSettigns = dashSettigns;
		this.setState(newState);
		this.connectSocket();
	};

	render() {
		const chartList = this.state.chartList;
		const historyData = this.state.historyData;
		
		return (
			<div className="root">
				<div className="topPanel">
					<DashboardControlPanel {...this.state.dashSettigns} changeHandler={this.changeControl}/>
					<ParamListContainer 
						settings={this.state.currentValueSettingsList}
						values={this.state.currentValueList}
					/>
					
				</div>
				
				<div className="chartContainer">
					{chartList[0] ? <ParamChart
						className="leftContainer"
						key={`chart_${chartList[0].id}`}
						{...chartList[0]}
						data={historyData[chartList[0].id]}
						domainY={[15, 30]}
						eventList={this.state.eventList}
					/> : null}
					<div className="rightContainer">
						{chartList[1] ? <ParamChart
							key={`chart_${chartList[1].id}`}
							{...chartList[1]}
							data={historyData[chartList[1].id]}
							domainY={[400, 1500]}
							eventList={this.state.eventList}
						/> : null}
						{chartList[2] ? <ParamChart
							key={`chart_${chartList[2].id}`}
							{...chartList[2]}
							data={historyData[chartList[2].id]}
							domainY={[180, 1000]}
							eventList={this.state.eventList}
						/> : null}
					</div>
				</div>
			</div>
		);
	}
};

export default UserFilterListContainer;
