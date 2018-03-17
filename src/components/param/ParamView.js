import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const ParamView = ({
                       title,
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
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                    }}
                />
            </div>
            <div className="text">
                <div>{title}</div>
                <div>{`${value}${!!measure ? (measure) : null}`}</div>
            </div>
        </div>
    );
};

ParamView.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    measure: PropTypes.string,
    color: PropTypes.string,
};

export default ParamView;