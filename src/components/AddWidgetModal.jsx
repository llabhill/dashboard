import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/dashboardSlice";

export default function AddWidgetModal({ open, onClose, categoryId }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      const dataArray =
        values.data && values.data.trim().length > 0
          ? values.data.split(",").map(n => Number(n.trim()))
          : [];

      const labelsArray =
        values.labels && values.labels.trim().length > 0
          ? values.labels.split(",").map(l => l.trim())
          : [];

      dispatch(
        addWidget({
          categoryId,
          widget: {
            title: values.title,
            type: values.type,
            data: dataArray,
            labels: labelsArray
          }
        })
      );
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Add Widget"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Add"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Widget Name"
          name="title"
          rules={[{ required: true, message: "Enter widget name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Widget Type"
          name="type"
          rules={[{ required: true, message: "Select widget type" }]}
        >
          <Select>
            <Select.Option value="donut">Donut Chart</Select.Option>
            <Select.Option value="bar">Bar Chart</Select.Option>
            <Select.Option value="empty">Empty / Placeholder</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Data (comma-separated numbers)" name="data">
          <Input placeholder="e.g. 10,20,30" />
        </Form.Item>

        <Form.Item label="Labels (comma-separated)" name="labels">
          <Input placeholder="e.g. Connected,Not Connected" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
