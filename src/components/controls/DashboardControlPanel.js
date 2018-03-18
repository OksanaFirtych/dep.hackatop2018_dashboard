import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const DashboardControlPanel = ({roomId, count, step, changeHandler}) => {
	const stepOptions = [
		{
			label: '10s',
			value: 10000,
		},
		{
			label: '30s',
			value: 30000,
		},
		{
			label: '1min',
			value: 60000,
		},
		{
			label: '10min',
			value: 600000,
		},
		{
			label: '30min',
			value: 1800000,
		},
		{
			label: '1h',
			value: 3600000,
		},
	];
	
	const countOptions = [
		{
			label: '10',
			value: 10,
		},
		{
			label: '30',
			value: 30,
		},
		{
			label: '50',
			value: 50,
		},
	];
	
	const roomOptions = [
		{
			label: '743',
			value: 743,
		},
	];

	const onChangeRoom = (newRoomId) => {
		if (!changeHandler) { return; }
		changeHandler({ 
			count,
			step,
			roomId: newRoomId.value,
		})
	};

	const onChangeStep = (newStep) => {
		if (!changeHandler) { return; }
		changeHandler({
			count,
			step: newStep.value,
			roomId,
		})
	};
	
	

	const onChangeCount = (newCount) => {
		if (!changeHandler) { return; }
		console.log('newCount', newCount);
		changeHandler({
			count: newCount.value,
			step,
			roomId,
		})
	};
	
	console.log(roomId, count, step);
	return (
		<div className="dashControl">
			<div className="control">
				<label>Room</label>
				<Select value={roomId} options={roomOptions} onChange={onChangeRoom} multi={false} clearable={false}/>
			</div>
			<div className="control">
				<label>Charts refresh period</label>
				<Select value={step} options={stepOptions} onChange={onChangeStep} multi={false} clearable={false}/>
			</div>
			<div className="control">
				<label>History values count</label>
				<Select value={count} options={countOptions} onChange={onChangeCount} multi={false} clearable={false}/>
			</div>
		</div>
	)
};

DashboardControlPanel.propTypes = {
	roomId: PropTypes.number,
	count: PropTypes.number,
	step: PropTypes.number,
	changeHandler: PropTypes.func,
};

export default DashboardControlPanel;