import React from "react";
import { Card, Button } from "antd";
import Widget from "./Widget";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";

export default function Category({ categoryId, widget, query }) {
  const dispatch = useDispatch();

  if (!widget.title.toLowerCase().includes(query.toLowerCase())) return null;

  return (
    <Card
      className="widget-card"
      title={widget.title}
      extra={
        <Button
          size="small"
          danger
          onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
        >
          ✖
        </Button>
      }
    >
      <Widget widget={widget} />
    </Card>
  );
}
