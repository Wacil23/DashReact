import React from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useStateContext } from '../../contexts/ContextProvider';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 270, pv: 2400, amt: 2400}, {name: 'Page A', uv: 100, pv: 2400, amt: 2400}, {name: 'Page C', uv: 200, pv: 2400, amt: 2400}]

const Stacked = ({width, height }) => {
  const {currentColor } = useStateContext();
  return (

  <LineChart width={320} height={360} data={data}>
    <Line  tooltipType='true' type="monotone" dataKey="uv" stroke={currentColor} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend wrapperStyle={{ position: null }}/>
  </LineChart> 

)};

export default Stacked