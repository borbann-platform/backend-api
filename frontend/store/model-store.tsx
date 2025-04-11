import { create } from "zustand";

type ModelState = {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: string[];
  setModels: (models: string[]) => void;
};

export const useModelState = create<ModelState>((set) => ({
  selectedModel: "Standard ML Model v2.4",
  setSelectedModel: (model) => set({ selectedModel: model }),
  models: [
    "Standard ML Model v2.4",
    "Enhanced Neural Network v1.8",
    "Geospatial Regression v3.1",
    "Time Series Forecast v2.0",
    "Custom Model (User #1242)",
  ],
  setModels: (models) => set({ models }),
}));
