
function graph1() {
    var margin = {top: 20, right: 30, bottom: 40, left: 180},
    width = 460 - margin.left - margin.right,
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

}


function graph2() {
    var margin = {top: 20, right: 30, bottom: 40, left: 180},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;
d3.select("body").append('p').text('Now that we have seen the cases in the United States and seen which type of cancers are most common, this graph shows the top 10 cancer types in terms of death counts on the y axis by the number of deaths in the United States on the x axis in a horizontal bar graph. The top number of deaths are for Lung and Bronchus cancer and Colon and Rectum cancer which are highlighted in the bright colors.');

var svg = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("death_rates.csv", function(data) {

    var x = d3.scaleLinear()
        .domain([5000, 150000])
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
        .append("text")
        .text("axis")
    
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([10994, 145849])


        var Tooltip = d3.select("#my_dataviz2")
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
        .html("Cancer Type: " + d.CancerType + " , Number of Deaths: " + d.CaseCount)
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
    .delay(function(d,i){console.log(i) ; return(i*100)})
        .attr("y", function(d) { return y(d.CancerType); })
        .attr("width", function(d) { return x(d.CaseCount); })
        .attr("height", y.bandwidth())
        .attr("fill", function(d) { return myColor(d.CaseCount)} )
        
});

}


function graph3() {
    var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 760 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
    d3.select("body").append('p').text('Now that we know how cancer affects humans, we can further explore its affects in the United States. This graph is a scatterplot which shows the population of each state in the US on the x axis by the number of cases of all kinds of cancers on the y axis.');
var svg = d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
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

//Add tooltip
// var tooltip = d3.select("#my_dataviz")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")


// var mouseover = function(d) {
//     tooltip
//       .style("opacity", 1)
//   }

// var mousemove = function(d) {
//     tooltip
//       .html("State: " + d.Area + "<br>Population: " + d.Population + "<br>Number of Cancer Cases: " + d.CaseCount)
//       .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }

//   // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
//   var mouseleave = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }



var clip = svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

var brush = d3.brushX()                 
    .extent( [ [0,0], [width,height] ] ) 
    .on("end", update)

var scatter = svg.append('g')
    .attr("clip-path", "url(#clip)")


scatter
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(2000)
      .attr("cx", function (d) { return x(d.Population); } )
      .attr("cy", function (d) { return y(d.CaseCount); } )
      .attr("r", 3)
      .attr("fill", "purple")
    // .on("mouseover", mouseover )
    // .on("mousemove", mousemove )
    // .on("mouseleave", mouseleave )

scatter.append("g")
    .attr("class", "brush")
    .call(brush);
    

var idleTimeout
    function idled() { idleTimeout = null; }


 function update() {

    extent = d3.event.selection

    
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
      x.domain([550000, 40000000])
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      scatter.select(".brush").call(brush.move, null) 
    }

    // Update axis and circle position
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    scatter
      .selectAll("circle")
      .transition().duration(1000)
      .attr("cx", function (d) { return x(d.Population); } )
      .attr("cy", function (d) { return y(d.CaseCount); } )

    }
    
});
}