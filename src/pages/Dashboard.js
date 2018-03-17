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
			currentValue: {},
		};
	}

	componentDidMount() {
		this.socket = io(config.socket);

		this.socket.on('connect', () => {
			console.log('connect');
			this.socket.emit('initialize', 743);
		});

		this.socket.on('room_initial_data', (params) => {
			console.log('room_initial_data', params);
			this.setState({
				chartList: params.conditions,
				currentValue: this.getActualCurrentData()
			});
		});
	}
	
	getActualCurrentData() {
		return {};
	}

	chartList() {
		return [
			{
				data: [
					{time: '13:00', value: '23'},
					{time: '13:10', value: '24'},
					{time: '13:20', value: '25'},
					{time: '13:30', value: '26'},
					{time: '13:40', value: '27'},
					{time: '13:50', value: '28'},
					{time: '14:00', value: '29'},
				],
			},
			{
				data: [
					{time: '13:00', value: '600'},
					{time: '13:10', value: '700'},
					{time: '13:20', value: '800'},
					{time: '13:30', value: '900'},
					{time: '13:40', value: '1000'},
					{time: '13:50', value: '1300'},
					{time: '14:00', value: '1500'},
				],
			},
			{
				data: [
					{time: '13:00', value: '500'},
					{time: '13:10', value: '550'},
					{time: '13:20', value: '600'},
					{time: '13:30', value: '650'},
					{time: '13:40', value: '700'},
					{time: '13:50', value: '750'},
					{time: '14:00', value: '800'},
				],
			},
		];
	}

	render() {
		const chartList = this.state.chartList;
		const dataList = this.chartList();
		console.log(chartList);
		return (
			<div className="root">
				<div className="currentValueContainer">
					<ParamListContainer currentValue={this.state.currentValue}/>
				</div>
				<div className="chartContainer">
					{chartList[0] ? <ParamChart
						className="leftContainer"
						key={`chart_${chartList[0].id}`}
						{...chartList[0]}
						data={dataList[0].data}
					/> : null}
					<div className="rightContainer">
						{chartList[1] ? <ParamChart
							key={`chart_${chartList[1].id}`}
							{...chartList[1]}
							data={dataList[1].data}
						/> : null}
						{chartList[2] ? <ParamChart
							key={`chart_${chartList[2].id}`}
							{...chartList[2]}
							data={dataList[2].data}
						/> : null}
					</div>
				</div>
			</div>
		);
	}
};

export default UserFilterListContainer;
