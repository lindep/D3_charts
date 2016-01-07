
# D3 charts

## Use as
```javascript
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
```

## Examples
Start node's http-server from root repo, this will start on localhost:8080 by default
```bash
http-server
```
From a browser open example
http://localhost:8080/examples/bar.html
