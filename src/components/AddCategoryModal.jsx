import React from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/dashboardSlice";

export default function AddCategoryModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      dispatch(addCategory(values.name));
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Add Category"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Enter category name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
