/*
 * example HTML
 *
 var dataSet = [77, 71, 82, 87, 84, 78, 80, 84, 86, 72, 71, 68, 75, 73, 80, 85, 86, 80];
 dataSet = dataSet.map(function(d){return {y:d};});
 var barChart = wi.charts.barChart()
   .width(800)
   .height(200)
   .data(dataSet);

 // Update chart
 barChart
   .height(300)
   .width(300)
   .data(dataSet.map(function(d) {return {y:d - Math.random() * 30};}));
 */

"use strict";

var wi = wi || {};
if (wi === null || typeof(wi) !== 'object') { wi = {}; }
if (wi.charts === null || typeof(wi.charts) !== 'object') { wi.charts = {}; }
wi.charts.barChart = function barChart() {

    var dispatch = d3.dispatch('mouseover','click');

    // All options that should be accessible to caller
    var margin = {top: 5, right: 5, bottom: 5, left: 51};
    var width = 500;
    var height = 300;
    var chartWidth = width - margin.left - margin.right;
    var chartHeight = height - margin.top - margin.bottom;
    var extent = [];
    var ticks = 7;

    //var width = 500;
    //var height = 300;
    var barPadding = 0;
    var fillColor = 'coral';
    var colorRange = ["#99e6fe", '#bc001f'];

    //var barSpacing = height / data.length;
    //var barHeight = barSpacing - barPadding;
    //var widthScale = width / maxValue;
    //var heightScale = height / maxValue;

    var data = [];

    var updateWidth;
    var updateHeight;
    var updateFillColor;
    var updateData;

    function chart(selection){
        selection.each(function () {

            var barSpacing = chartHeight / data.length;
            var barHeight = barSpacing - barPadding;
            var minValue = d3.min(data, function(d){return +d.y});
            var maxValue = d3.max(data, function(d){return +d.y});
            var widthScale = chartWidth / maxValue;
            var heightScale = chartHeight / maxValue;
            var barWidth = chartWidth / data.length;

            extent = [minValue, maxValue];

            var color = d3.scale.linear().range(colorRange)
    		      .domain([minValue, maxValue])

            var y = d3.scale.linear()
              .range([chartHeight, margin.top])
              .domain([minValue-1, maxValue]);

            var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left").ticks(ticks);

            var dom = d3.select(this);
            var svg = dom.append('svg')
                //.attr('class', 'bar-chart')
                .attr('height', height)
                .attr('width', width);
                //.style('fill', fillColor);

            var barchart = svg
                .append("g")
                .attr("class","barchart")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

            barchart.append("g")         // Add the Y Axis
              .attr("class", "y axis")
              .call(yAxis);

            var barsGroup = barchart
              .append('g')
              .attr('class',"bars")
              .attr("transform","translate(2,0)");

            var barGroup = barsGroup.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("class","bar")
              .attr("transform",
                function(d, i) { return "translate(" + i * barWidth + ",0)";
               });

            barGroup.append("rect")
              .attr("class","display-bar")
              .attr("y", function(d) { return y(d.y); })
              .attr("fill",function(d) { return color(d.y); })
              .attr("height", function(d) { return chartHeight - y(d.y); })
              .attr("width", barWidth - barPadding)
              .on("click", function(d) {
                dispatch.click(d);
              })
              .on("mouseover", function(d) {
                //dispatch.mouseover(d);
                var point = d3.mouse(this);
                var o = {'mousex': point[0], 'mousey': point[1] , 'data':d};
                dispatch.mouseover(o);
                d3.select(this).attr('stroke-width',1).attr('stroke','black')
              })
              .on("mouseout", function(d) {
                d3.select(this).attr('stroke-width',0)
              });

            // update functions
            updateWidth = function() {
                widthScale = width / maxValue;
                chartWidth = width - margin.left - margin.right;
                barWidth = chartWidth / data.length;

                svg
                //.transition().duration(250)
                .attr('width', width);

                barGroup
                .transition().duration(250)
                .attr("transform",
                  function(d, i) { return "translate(" + i * barWidth + ",0)";
                 });

                barGroup.selectAll('rect.display-bar')
                .attr('width', barWidth - barPadding);

            };

            updateHeight = function() {
                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                chartHeight = height - margin.top - margin.bottom;
                //updateData(data);
                var y = d3.scale.linear()
                  .range([chartHeight, margin.top])
                  .domain([minValue-1, maxValue]);

                svg
                //.transition().duration(250)
                .attr('height', height);

                var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left").ticks(ticks);

                svg.selectAll("g.y.axis").transition().duration(250)
                  .call(yAxis);

                barGroup.selectAll('rect.display-bar')
                .transition()
                .duration(250)
                .attr("y", function(d) { return y(d.y); })
                //.attr("fill",color)
                .attr("height", function(d) { return chartHeight - y(d.y); });

            };

            updateFillColor = function() {
                barGroup.selectAll('rect').transition().duration(1000).style('fill', fillColor);
            };

            updateData = function() {
              barSpacing = chartHeight / data.length;
              barHeight = barSpacing - barPadding;
              minValue = d3.min(data, function(d){return +d.y});
              maxValue = d3.max(data, function(d){return +d.y});
              widthScale = chartWidth / maxValue;
              heightScale = chartHeight / maxValue;
              barWidth = chartWidth / data.length;

              extent = [minValue,maxValue];

              var color = d3.scale.linear().range(colorRange)
              .domain([minValue, maxValue])

              var y = d3.scale.linear()
                .range([chartHeight, margin.top])
                .domain([minValue-1, maxValue]);

              var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left").ticks(ticks);

              svg.selectAll("g.y.axis")
              .call(yAxis);

              //var barGroup = d3.selectAll('svg g.barchart g.bars').selectAll('g.bar').data(data, function(d,i){return i+""+d});
              barGroup = barsGroup.selectAll('g.bar')
                .data(data,function(d,i){return i+""+d.y});

              barGroup
                //.transition().duration(1000)
                .enter()
                .append('g')
                .attr("class","bar")
                .attr("transform",
                  function(d, i) { return "translate(" + i * barWidth + ",0)";
                 })
                .append("rect")
                .attr("class","display-bar")
                .attr("y", function(d) { return y(d.y); })
                .attr("fill",function(d) { return color(d.y); })
                .attr("height", function(d) { return chartHeight - y(d.y); })
                .attr("width", barWidth - barPadding)
                .on("click", function(d) {
                  dispatch.click(d);
                })
                .on("mouseover", function(d) {
                  //dispatch.mouseover(d);
                  var point = d3.mouse(this);
                  var o = {'mousex': point[0], 'mousey': point[1] , 'data':d};
                  dispatch.mouseover(o);
                  d3.select(this).attr('stroke-width',1).attr('stroke','black')
                })
                .on("mouseout", function(d) {
                  d3.select(this).attr('stroke-width',0)
                });

              barGroup.transition()
                .duration(1000)
                .attr("transform",
                  function(d, i) {
                    return "translate(" + i * barWidth + ",0)";
                 })
                .selectAll('rect')
                .attr("y", function(d) { return y(d.y); })
                .attr("fill",function(d) { return color(d.y); })
                .attr("height", function(d) { return chartHeight - y(d.y); })
                .attr("width", barWidth - barPadding);



              //var bars = barGroup.selectAll('g.bar').data(data, function(d,i){return i+""+d});

            barGroup.exit()
                      .transition()
                      .duration(250)
                      //.delay(function(d, i) { return (data.length - i) * 20; })
                      //.style('opacity', 0)
                      //.attr('height', 0)
                      //.attr('y', chartHeight)
                      //.attr('width', 0)
                      .remove();


             /*barGroup.selectAll('rect.display-bar')
                .transition()
                .duration(500)
                .attr("y", function(d) { return y(d.y); })
                .attr("fill",function(d) { return color(d.y); })
                .attr("height", function(d) { return chartHeight - y(d.y); })
                .attr("width", barWidth - barPadding);    */

          }

        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        chartWidth = width - margin.left - margin.right;
        if (typeof updateWidth === 'function') updateWidth();
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        chartHeight = height - margin.top - margin.bottom;
        if (typeof updateHeight === 'function') updateHeight();
        return chart;
    };

    chart.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        if (typeof updateFillColor === 'function') updateFillColor();
        return chart;
    };

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };
    chart.extent = function(value) {
        return extent;
        return chart;
    };
    chart = d3.rebind(chart, dispatch, 'on');
    return chart;
}
