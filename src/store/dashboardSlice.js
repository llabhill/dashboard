import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: uuid(), title: "Cloud Accounts", type: "donut", data: [2, 2] },
        { id: uuid(), title: "Cloud Account Risk Assessment", type: "donut", data: [1689, 681, 36, 7253] }
      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        { id: uuid(), title: "Top 5 Namespace Specific Alerts", type: "empty", data: [] },
        { id: uuid(), title: "Workload Alerts", type: "empty", data: [] }
      ]
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        { id: uuid(), title: "Image Risk Assessment", type: "bar", data: [9, 150, 250, 90] },
        { id: uuid(), title: "Image Security Issues", type: "bar", data: [2, 15, 20, 30] }
      ]
    }
  ]
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({ id: uuid(), name: action.payload, widgets: [] });
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets.push({ id: uuid(), ...widget });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    }
  }
});

export const { addCategory, removeCategory, addWidget, removeWidget ,setTimeRange} = dashboardSlice.actions;
export default dashboardSlice.reducer;
