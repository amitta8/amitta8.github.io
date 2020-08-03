// The code and tutorial for the chart in this file was derived from 
// https://www.d3-graph-gallery.com/graph/scatter_basic.html
// https://www.d3-graph-gallery.com/graph/interactivity_brush.html

//     var margin = {top: 10, right: 30, bottom: 60, left: 60},
//     width = 1360 - margin.left - margin.right,
//     height = 650 - margin.top - margin.bottom;
//     d3.select("body").append('p').text('Now that we know how cancer affects humans, we can further explore its affects in the United States. This graph is a scatterplot which shows the population of each state in the US on the x axis by the number of cases of all kinds of cancers on the y axis.');
// var svg = d3.select("#my_dataviz3")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
          
//     d3.csv("by_state.csv", function(data) {

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([550000, 40000000])
//     .range([ 0, width ]);
//   var xAxis = svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
   

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([2500, 175000])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));





// var clip = svg.append("defs").append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("width", width )
//     .attr("height", height )
//     .attr("x", 0)
//     .attr("y", 0);

// var brush = d3.brushX()                 
//     .extent( [ [0,0], [width,height] ] ) 
//     .on("end", update)

// var scatter = svg.append('g')
//     .attr("clip-path", "url(#clip)")


// scatter
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//     .transition()
//     .delay(function(d,i){return(i*3)})
//     .duration(2000)
//       .attr("cx", function (d) { return x(d.Population); } )
//       .attr("cy", function (d) { return y(d.CaseCount); } )
//       .attr("r", 3)
//       .attr("fill", "purple")
//     // .on("mouseover", mouseover )
//     // .on("mousemove", mousemove )
//     // .on("mouseleave", mouseleave )

// scatter.append("g")
//     .attr("class", "brush")
//     .call(brush);
    

// var idleTimeout
//     function idled() { idleTimeout = null; }


//  function update() {

//     extent = d3.event.selection

    
//     if(!extent){
//       if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
//       x.domain([550000, 40000000])
//     }else{
//       x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
//       scatter.select(".brush").call(brush.move, null) 
//     }

//     // Update axis and circle position
//     xAxis.transition().duration(1000).call(d3.axisBottom(x))
//     scatter
//       .selectAll("circle")
//       .transition().duration(1000)
//       .attr("cx", function (d) { return x(d.Population); } )
//       .attr("cy", function (d) { return y(d.CaseCount); } )

//     }
    
// });

var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1360 - margin.left - margin.right,
    height = 570 - margin.top - margin.bottom;
    d3.select("body").append('p').text('Now that we know how cancer affects humans, we can further explore its affects in the United States. This graph is a scatterplot which shows the population of each state in the US on the x axis by the number of cases of all kinds of cancers on the y axis. By hovering over each data point, you can see the state' +
    ' and its exact population and total cancer case count for the year 2017. California, Texas, New York, and Florida stand as important points having both a high case count and population.');
var svg = d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
    d3.csv("by_state.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([550000, 40000000])
    .range([ 0, width ]);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
   

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([2500, 175000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")



  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
    .style("opacity", 1)
    d3.select(this)
      .style("opacity", 0.5)
  }

  var mousemove = function(d) {
    tooltip
      .html("State: " + d.Area + "<br>Population: " + d.Population + "<br>Number of Cancer Cases: " + d.CaseCount)
      .style("left", (d3.mouse(this)[0]+90) + "px") 
      .style("top", (d3.mouse(this)[1]) + "px")
  }


  
  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
  }

  var myColor = d3.scaleSequential()
  .interpolator(d3.interpolateViridis)
  .domain([0, 160000])

  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("circle")
  
    var u = svg.selectAll("circle")
      .data(data)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

  // Add dots
  u
    .enter()
    .append("circle")
    .merge(u)
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(2000)
      .attr("cx", function (d) { return x(d.Population); } )
      .attr("cy", function (d) { return y(d.CaseCount); } )
      .attr("r", 3.5)
      .attr("fill", function(d) { return myColor(d.CaseCount)} )

})

