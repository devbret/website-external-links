const width = 1900,
  height = 1000;

const svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(
    d3.zoom().on("zoom", function (event) {
      container.attr("transform", event.transform);
    })
  );

const container = svg.append("g");
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute");

const simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance(100)
  )
  .force("charge", d3.forceManyBody().strength(-400))
  .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("external_links.json").then(function (data) {
  const links = [];
  const nodes = {};

  Object.keys(data).forEach((parentUrl) => {
    if (!nodes[parentUrl]) {
      nodes[parentUrl] = {
        id: parentUrl,
        label: parentUrl,
        type: "external",
        parentUrl: parentUrl,
      };
    }

    data[parentUrl].forEach((childUrl) => {
      if (!nodes[childUrl]) {
        nodes[childUrl] = {
          id: childUrl,
          label: childUrl,
          type: "internal",
          parentUrl: parentUrl,
        };
      }
      links.push({ source: childUrl, target: parentUrl });
    });
  });

  const graph = { nodes: Object.values(nodes), links: links };

  const link = container
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .attr("stroke", (d) =>
      d.source.type === "external"
        ? "url(#gradient-external)"
        : "url(#gradient-internal)"
    );

  const node = container
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", (d) => (d.type === "external" ? "magenta" : "aqua"))
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut)
    .on("click", (event, d) => {
      const urlToOpen = d.type === "external" ? d.parentUrl : d.id;

      if (urlToOpen && isValidURL(urlToOpen)) {
        window.open(urlToOpen, "_blank");
      } else {
        console.error("Invalid URL:", urlToOpen);
      }
    });

  const linkedByIndex = {};
  graph.links.forEach((d) => {
    linkedByIndex[d.source.id + "," + d.target.id] = 1;
    linkedByIndex[d.target.id + "," + d.source.id] = 1;
  });

  function isConnected(a, b) {
    return (
      linkedByIndex[a.id + "," + b.id] ||
      linkedByIndex[b.id + "," + a.id] ||
      a.id === b.id
    );
  }

  function mouseOver(event, d) {
    const connectedLinks = graph.links.filter(
      (l) => l.source.id === d.id || l.target.id === d.id
    ).length;

    tooltip.transition().duration(300).style("opacity", 1);
    tooltip
      .html(`${d.id} - ${connectedLinks} Connections`)
      .style("left", event.pageX + 5 + "px")
      .style("top", event.pageY - 28 + "px");

    node.classed("dimmed", true);
    link.classed("dimmed", true);

    node
      .filter(
        (n) =>
          n === d ||
          links.some(
            (l) =>
              (l.source === d && l.target === n) ||
              (l.target === d && l.source === n)
          )
      )
      .classed("dimmed", false)
      .classed("highlight", true);
    link
      .filter((l) => l.source === d || l.target === d)
      .classed("dimmed", false)
      .classed("highlight", true);
  }

  function mouseOut(event, d) {
    tooltip.transition().duration(300).style("opacity", 0);
    node.classed("dimmed", false).classed("highlight", false);
    link.classed("dimmed", false).classed("highlight", false);
  }

  simulation.nodes(graph.nodes).on("tick", ticked);
  simulation.force("link").links(graph.links);

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  }
});
