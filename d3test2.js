
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal([
    "hsl(0,50%,50%)", "hsl(20,50%,50%)", "hsl(40,50%,50%)", "hsl(60,50%,50%)",
    "hsl(80,50%,50%)", "hsl(100,50%,50%)", "hsl(120,50%,50%)", "hsl(140,50%,50%)",
    "hsl(160,50%,50%)", "hsl(180,50%,50%)", "hsl(200,50%,50%)", "hsl(220,50%,50%)",
    "hsl(240,50%,50%)", "hsl(260,50%,50%)", "hsl(280,50%,50%)", "hsl(300,50%,50%)",
    "hsl(320,50%,50%)", "hsl(340,50%,50%)"]);

var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.Students; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv("d3test2.csv", function (d) {
    d.Students = +d.Students;
    return d;
}, function (error, data) {
    if (error) throw error;

    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d) {
            //console.log(d);
            var xPosition = d3.event.pageX - 60;
            var yPosition = d3.event.pageY - 180;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(`${d.data.Faculty} \u2014 ${d.data.Students} students`);
        });

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) { return color(+d.data.Code - 1); });

    arc.append("text")
        .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function (d) { return d.data.Code; });


    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 260)
        .attr("height", 30)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 130)
        .attr("dy", "1.5em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
});