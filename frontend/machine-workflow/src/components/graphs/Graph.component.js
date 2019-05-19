import React, { Component } from 'react';

import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import './Graph.style.css'

class Graph extends Component {

  render() {

    const data = [
      { x: '06-09', y: 2.978 },
      { x: '06-10', y: 2.973 },
      { x: '06-11', y: 2.964 },
      { x: '06-12', y: 2.955 },
      { x: '06-13', y: 2.937 },
      { x: '06-14', y: 2.919 },
      { x: '06-15', y: 2.902 },
    ]

    return (
      <div className='graphContainer' >
        <ResponsiveContainer
          width="100%"
        >
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 25 }}>
            <XAxis
              dataKey="x"
              fontFamily="sans-serif"
              tickSize
              dy='25'
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              ticks={[2.882, 2.905, 2.928, 2.951, 2.974, 2.997]}
            />
            <CartesianGrid
              vertical={false}
              stroke="#ebf3f0"
            />
            <Tooltip />
            <Line dataKey="y" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export { Graph };