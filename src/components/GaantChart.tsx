import { ITask } from "@/types/projectTypes";
import "bootstrap-icons/font/bootstrap-icons.scss";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface Task {
  task: string;
  start: Date;
  end: Date;
  status: number;
}

interface GanttChartProps {
  tasks: ITask[];
  setChartHeight: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTask: (task: ITask | null) => void;
}

const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  setChartHeight,
  setSelectedTask,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 90, right: 40, bottom: 30, left: 0 };
    const taskHeight = 60;
    const taskGap = 10;
    const width = window.innerWidth - margin.left - margin.right - 560;
    const height = tasks.length * (taskHeight + taskGap) - taskGap;

    setChartHeight(height + margin.top + margin.bottom);

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove();

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartArea = g.append("g").attr("clip-path", "url(#clip)");

    const xScale = d3
      .scaleTime()
      .domain([
        //@ts-ignore
        d3.min(tasks, (d) => new Date(d.start)) as Date,
        //@ts-ignore
        d3.max(tasks, (d) => new Date(d.end)) as Date,
      ])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(tasks.map((d) => d.name))
      .range([0, height])
      .padding(0.1);

    const xAxis = d3.axisBottom(xScale);

    const xAxisGroup = g
      .append("g")
      .attr("transform", `translate(0,${-20})`)
      .call(xAxis);
    xAxisGroup
      .selectAll("text")
      .attr("fill", "#ffffff")
      .attr("font-size", "12px");

    xAxisGroup
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1);

    const getColor = (status: string) => {
      switch (status) {
        case "NOT_STARTED":
          return "#f1faee";
        case "IN_PROGRESS":
          return "#ee964b";
        case "COMPLETED":
          return "#80ed99";
        case "FAILED":
          return "#e63946";
        default:
          return "#f1faee";
      }
    };

    const taskRects = chartArea
      .selectAll("rect")
      .data(tasks)
      .enter()
      .append("rect")
      //@ts-ignore
      .attr("x", (d) => xScale(new Date(d.start)))
      .attr("y", (d) => yScale(d.name) as number)
      //@ts-ignore
      .attr("width", (d) => xScale(new Date(d.end)) - xScale(new Date(d.start)))
      .attr("height", yScale.bandwidth() * 0.8)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", (d) => getColor(d.status))
      .on("click", (_event, d) => {
        setSelectedTask(d);
      });

    const taskLabels = g.append("g");

    taskLabels
      .selectAll("text")
      .data(tasks)
      .enter()
      .append("text")
      //@ts-ignore
      .attr("x", (d) => xScale(new Date(d.start)) + 5)
      .attr("y", (d) => (yScale(d.name) as number) + yScale.bandwidth() / 2)
      .attr("text-anchor", "start")
      .text((d) => d.name)
      .attr("fill", "black")
      .attr("font-size", "17px")
      .attr("font-weight", "600");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 200])
      .translateExtent([
        [-width, -Infinity],
        [2 * width, Infinity],
      ])
      .on("zoom", (event) => {
        const newXScale = event.transform.rescaleX(xScale);
        xAxisGroup.call(xAxis.scale(newXScale));
        taskRects
          //@ts-ignore
          .attr("x", (d) => newXScale(new Date(d.start)))
          .attr(
            "width",
            //@ts-ignore
            (d) => newXScale(new Date(d.end)) - newXScale(new Date(d.start))
          );

        taskLabels
          .selectAll<SVGTextElement, Task>("text")
          .attr("x", (d) => newXScale(new Date(d.start)));
      });

    svg.call(zoom);
  }, [tasks, setChartHeight, setSelectedTask]);

  return <svg ref={chartRef}></svg>;
};

export default GanttChart;
