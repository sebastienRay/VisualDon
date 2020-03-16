import * as d3 from "d3";
import {csv, select} from "d3";

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data =>{
    const x = d => parseInt(d.ratings);
    const y = d => d.gamename;
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, x)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(y))
        .range([0, height]);

    svg.selectAll('rect').data('data')
        .enter().append('rect')
            .attr('y', d => yScale(y(d)))
            .attr('width', d => xScale(x(d)))
            .attr('height', yScale.bandwidth());
};

csv('steam - Copie.csv').then(data=>{
        console.log(data);
        render(data)
    });



