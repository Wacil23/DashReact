import React from 'react';

import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useStateContext } from '../../contexts/ContextProvider';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 270, pv: 2400, amt: 2400}, {name: 'Page A', uv: 100, pv: 2400, amt: 2400}, {name: 'Page C', uv: 200, pv: 2400, amt: 2400}]

const SparkLine = ({width, height }) => {
  const {currentColor } = useStateContext();
  return (

    <LineChart width={250} height={100} data={data}>
      <Line type="monotone" dataKey="uv" stroke={currentColor} strokeWidth={2} />
    </LineChart>

)};

export default SparkLine