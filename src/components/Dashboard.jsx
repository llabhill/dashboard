import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Input, Typography, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { setTimeRange } from "../store/dashboardSlice";
import Category from "./Category";
import AddWidgetModal from "./AddWidgetModal";

const { Title } = Typography;

export default function Dashboard() {
  const categories = useSelector(state => state.dashboard.categories);
  const timeRange = useSelector(state => state.dashboard.timeRange);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const menuItems = [
    { key: "2days", label: "Last 2 Days" },
    { key: "10days", label: "Last 10 Days" },
    { key: "30days", label: "Last 30 Days" }
  ];

  const handleMenuClick = (e) => {
    dispatch(setTimeRange(e.key));
  };

  return (
    <div>
      <div className="dashboard-header">
        <Title level={3}>CNAPP Dashboard</Title>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input.Search
            placeholder="Search anything..."
            allowClear
            onChange={e => setQuery(e.target.value)}
            style={{ width: 300 }}
          />

          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Button>
              {timeRange === "2days"
                ? "Last 2 Days"
                : timeRange === "10days"
                ? "Last 10 Days"
                : "Last 30 Days"}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {categories.map(cat => (
          <div key={cat.id} className="category-section">
            <Title level={4}>{cat.name}</Title>
            <Row gutter={[16, 16]}>
              {cat.widgets.map(w => (
                <Col span={8} key={w.id}>
                  <Category categoryId={cat.id} widget={w} query={query} />
                </Col>
              ))}
              <Col span={8}>
                <div
                  className="add-widget-box"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setOpen(true);
                  }}
                >
                  + Add Widget
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>

      <AddWidgetModal
        open={open}
        onClose={() => setOpen(false)}
        categoryId={selectedCategory}
      />
    </div>
  );
}
