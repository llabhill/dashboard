import React, { useState } from "react";
import { Layout, Button } from "antd";
import Dashboard from "./components/Dashboard";
import AddCategoryModal from "./components/AddCategoryModal";

const { Header, Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
        <div style={{ fontSize: "18px" }}>Dynamic Dashboard</div>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Category
        </Button>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Dashboard />
      </Content>
      <AddCategoryModal open={open} onClose={() => setOpen(false)} />
    </Layout>
  );
}

export default App;
