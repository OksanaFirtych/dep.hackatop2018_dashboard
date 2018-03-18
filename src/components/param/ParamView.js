import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const ParamView = ({
                       name,
                       value,
                       measure,
                       color,
                       icon,
                   }) => {
	return (
		<div className="param">
			<div className="icon" style={{backgroundColor: color}}>
				<FontAwesome
					name={icon}
					size="2x"
					style={
						{
							color: '#fff',
							fontWeight: 'bold',
						}
					}
				/>
			</div>
			<div className="text">
				<div className="paramTitle" style={{color: color}}>{name}</div>
				<div>{value} {!!measure ? (measure) : null}</div>
			</div>
		</div>
	);
};

ParamView.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.number,
	measure: PropTypes.string,
	color: PropTypes.string,
	icon: PropTypes.string.isRequired,
};

export default ParamView;