import * as d3 from "d3";
import { uniqueId } from "lodash";

import { getRandomInt } from './data_helpers.js';

const getXCoord = zone => {
  switch(zone){
    case "TenantStore1":
      return getRandomInt(332, 342);
    case "TenantStore2":
      return getRandomInt(702, 712);
    case "TenantStore3":
      return getRandomInt(1392, 1402);
    case "TenantStore4":
      return getRandomInt(992, 1002);
    case "TenantStore5":
      return getRandomInt(632, 642);
    case "TenantStore6":
      return getRandomInt(296, 306);
    default:
      return getRandomInt(440, 1220);
  }
};

 const getYCoord = zone => {
  switch(zone){
    case "TenantStore1":
      return getRandomInt(222, 232);
    case "TenantStore2":
      return getRandomInt(242, 252);
    case "TenantStore3":
      return getRandomInt(522, 532);
    case "TenantStore4":
      return getRandomInt(662, 672);
    case "TenantStore5":
      return getRandomInt(528, 532);
    case "TenantStore6":
      return getRandomInt(528, 538);
    default:
      return getRandomInt(330, 490);
  }
};

const getDotColor = zone => {
  switch(zone){
    case "TenantStore1":
      return "#156ab3";
    case "TenantStore2":
      return "#ed1c24";
    case "TenantStore3":
      return "#7e6db1";
    case "TenantStore5":
      return "#f9aa1a";
    case "TenantStore4":
      return "#13984c";
    case "TenantStore6":
      return "#d83f7d";
    default:
      return "grey";
  }
};

export const removeDots = () => {
  d3.selectAll(".dot").remove();
};

export const clearZone = zone => {
  d3.selectAll(`.${zone.zone}-dot`).remove();
};

export const switchClassToCenter = zone => {
  d3.selectAll(`.${zone}-dot`)
  .classed(`${zone}-dot`, false)
  .classed("center-dot", true);
};

export const drawDot = (origin, index) => {
  const x = getXCoord(origin);
  const y = getYCoord(origin);

  d3.select("svg")
  .append("circle")
  .classed("dot", true)
  .classed(`${origin}-dot`, true)
  .attr("id", `${origin}-${origin === 'center' ? uniqueId() : index}`)
  .attr("visibility", `${origin === 'center' ? 'visible' : 'hidden'}`)
  .attr("r", 4)
  .attr("cx", x)
  .attr("cy", y)
  .style("fill",getDotColor(origin));
};

export const moveToCenter = (zone, index) => {
  d3.select(`#${zone}-${index}`)
  .transition()
  .delay(getRandomInt(0, 5000))
  .duration(5000)
  .attr("visibility", "visible")
  .attr("id", `center-${uniqueId()}`)
  .attr("cx", getXCoord("center"))
  .attr("cy", getYCoord("center"));
};

export const moveToExit = zone => {
  d3.select(`.center-dot`)
  .classed(`${zone}-dot`, true)
  .classed('center-dot', false)
  .transition()
  .delay(getRandomInt(0, 5000))
  .duration(5000)
  .style("fill", getDotColor(zone))
  .attr("cx", getXCoord(zone))
  .attr("cy", getYCoord(zone));
};
