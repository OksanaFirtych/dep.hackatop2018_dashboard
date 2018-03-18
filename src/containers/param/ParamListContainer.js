import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ParamView from '../../components/param/ParamView.js';

const COLORS = {
	'tmp': '#FA7151',
	'co2': '#9F82D5',
	'light': '#49B1D9',
};

const ICONS = {
	'tmp': 'thermometer-half',
	'co2': 'braille',
	'light': 'lightbulb',
};

class ParamListContainer extends Component {
	
	render() {
		console.log(this.props.values);
		
		return (
			<div className="paramContainer">
				{this.props.settings.map(param => (
					<ParamView 
						key={`param_${param.id}`}
						{...param}
						color={COLORS[param.id]}
						icon={ICONS[param.id]}
						value={this.props.values[param.id]}
					/>
				))}
			</div>
		);
	}
};

ParamView.propTypes = {
	settings: PropTypes.array,
	values: PropTypes.object,
};

export default ParamListContainer;