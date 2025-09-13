import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Empty } from "antd";
import { useSelector } from "react-redux";

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"];

export default function Widget({ widget }) {
  const timeRange = useSelector(state => state.dashboard.timeRange);

  // scaling factor based on range
  const factor =
    timeRange === "2days" ? 1 : timeRange === "10days" ? 5 : 15;

  const scaledData = widget.data.map(v => v * factor);

  if (widget.type === "donut" && widget.data.length > 0) {
    const labels =
      widget.labels && widget.labels.length === widget.data.length
        ? widget.labels
        : widget.data.map((_, i) => `Slice ${i + 1}`);

    const data = scaledData.map((value, i) => ({
      name: labels[i],
      value
    }));

    return (
      <div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={60} label>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ marginTop: "10px" }}>
          {data.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "4px"
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: COLORS[i % COLORS.length],
                  marginRight: "6px",
                  borderRadius: "2px"
                }}
              ></div>
              <span style={{ fontSize: "13px" }}>
                {d.name}: <strong>{d.value}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (widget.type === "bar" && widget.data.length > 0) {
    const labels =
      widget.labels && widget.labels.length === widget.data.length
        ? widget.labels
        : widget.data.map((_, i) => `Item ${i + 1}`);

    const data = scaledData.map((value, i) => ({
      name: labels[i],
      value
    }));

    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#fa541c" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return <Empty description="No Graph data available" />;
}
