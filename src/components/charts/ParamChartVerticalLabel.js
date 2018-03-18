import React from 'react';

const ParamChartVerticalLabel = ({x, y, payload, ...props}) => {
	return (
		<g transform={`translate(${x},${y})`}>
			<text className="xTick" x={0} y={0} dy={16} textAnchor="end"  transform="rotate(-35)">{payload.value}</text>
		</g>
	);
};

export default ParamChartVerticalLabel;
