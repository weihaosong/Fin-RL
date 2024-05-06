import './App.css';
import perf_ov from './perf_overview.json'
import './styles.css'; // Import CSS file


import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Performance = () => {
  const svgRef = useRef(null);

  useEffect(() => {

    const parseDate = d3.timeParse('%Q');
    const data = perf_ov.map(d => ({
      date: parseDate(d.date),
      averageAction: d.averageaction
    }));

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averageAction)])
      .nice()
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.averageAction));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

  }, []);

  return (        
      <div className="App">
        <header className="App-header">
        <h1>Performance Overview:</h1>
        <svg ref={svgRef}></svg>
        </header>
      </div>) 
  
  
 
};

export default Performance;

