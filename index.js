// The code and tutorial for the chart in this file was derived from 
// https://www.d3-graph-gallery.com/graph/barplot_horizontal.htm

  var margin = {top: 20, right: 30, bottom: 40, left: 180},
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
  d3.select("body").append('p').text('We have now seen where cancer is most common in the US and how many people it has affected. From this, now we can see which kinds of cancers are most common. This graph shows the top 10 cancer types in terms of cases on the y axis by the number of cases in the United States on the x axis in a horizontal bar graph. The top number of cases are for Female Breast cancer and Lung and Bronchus cancer which are highlighted in the bright colors. ');


  var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("types.csv", function(data) {    
  var x = d3.scaleLinear()
      .domain([40000, 260000])
      .range([ 0, width])
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
  
  var y = d3.scaleBand()
      .range([ 0, height ])
      .domain(data.map(function(d) { return d.CancerType; }))
      .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([49881, 250520])


    var Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
  Tooltip
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
  }
  var mousemove = function(d) {
  Tooltip
    .html("Cancer Type: " + d.CancerType + " , Number of Cases: " + d.CaseCount)
    .style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
  Tooltip
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
  }

  svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")

  // variable u: map data to existing bars
  var u = svg.selectAll("rect")
    .data(data)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

  u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(800)
          .attr("y", function(d) { return y(d.CancerType); })
          .attr("width", function(d) { return x(d.CaseCount); })
          .attr("height", y.bandwidth())
          .attr("fill", function(d) { return myColor(d.CaseCount)} )
          .delay(function(d,i){console.log(i) ; return(i*100)})
      });

