
# D3 charts
Bar chart based on the **Updatable chart pattern** described in this article [Towards Updatable D3.js Charts](http://www.toptal.com/d3-js/towards-reusable-d3-js-charts)
## Use as
```javascript
var dataSet = [77, 71, 82, 87, 84, 78, 80, 84, 86, 72, 71, 68, 75, 73, 80, 85, 86, 80];
dataSet = dataSet.map(function(d){return {y:d};});
var barChart = wi.charts.barChart()
  .width(800)
  .height(200)
  .data(dataSet);
// Bind chart to DOM element
d3.select('#chart')
      .call(barChart);
// Update chart
barChart
  .height(300)
  .width(300)
  .data(dataSet.map(function(d) {return {y:d - Math.random() * 30};}));
```

## Examples
To run example clone repo and run node http-server from root of repo.  
This is just an easy way to run the examples.
```bash
git clone https://github.com/lindep/D3_charts.git d3_charts
cd d3_charts
http-server
```
From a browser open example
http://localhost:8080/examples/bar.html
