import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ParamView from '../../components/param/ParamView.js';

const COLORS = {
	'temp': '#FA7151',
	'co2': '#9F82D5',
	'light': '#49B1D9',
};

const ICONS = {
	'temp': 'thermometer-half',
	'co2': 'braille',
	'light': 'lightbulb',
};

class ParamListContainer extends Component {
	render() {
		return (<div className="paramContainer">
			{this.props.values.map(param => (
				<ParamView 
					key={`param_${param.id}`}
					{...param}
					color={COLORS[param.id]}
					icon={ICONS[param.id]}
				/>
			))}
		</div>);
	}
};

ParamView.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ParamListContainer;