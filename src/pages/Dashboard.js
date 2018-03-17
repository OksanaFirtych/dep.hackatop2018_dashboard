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
		
		this.socket.on('room_actual_data', (params) => {
			
		});
	}
	
	getActualCurrentData(params) {
		return this.state.chartList.map(({id, name, measure}) => ({
			id,
			name,
			measure,
		}));
	}

	render() {
		const chartList = this.state.chartList;
		const dataList = this.chartList();
		return (
			<div className="root">
				<div className="currentValueContainer">
					<ParamListContainer values={this.state.currentValue}/>
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
