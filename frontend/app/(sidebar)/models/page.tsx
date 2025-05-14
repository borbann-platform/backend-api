"use client";

// import { ModelCard } from "@/components/models/model-card";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useModelState } from "@/store/model-store";
import {
  AlertTriangle,
  BrainCircuit,
  Check,
  Database,
  Play,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ModelsPage() {
  const [activeTab, setActiveTab] = useState("my-models");
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const { models } = useModelState(
    useShallow((state) => ({
      models: state.models,
    }))
  );

  const dataPipelines = [
    {
      id: "pipeline-1",
      name: "Property Listings",
      records: 1240,
      lastUpdated: "2 hours ago",
    },
    {
      id: "pipeline-2",
      name: "Rental Market Data",
      records: 830,
      lastUpdated: "Yesterday",
    },
    {
      id: "pipeline-3",
      name: "Price Comparison",
      records: 1560,
      lastUpdated: "2 days ago",
    },
    {
      id: "pipeline-4",
      name: "Commercial Properties",
      records: 450,
      lastUpdated: "1 week ago",
    },
  ];

  const handleStartTraining = () => {
    if (!selectedPipeline || !modelName) return;

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Model Management"
        description="Train, manage, and deploy machine learning models for property analysis"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Models", href: "/models" },
        ]}
      />

      <Tabs
        defaultValue="my-models"
        className="mt-6"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="my-models">My Models</TabsTrigger>
            <TabsTrigger value="system-models">System Models</TabsTrigger>
            <TabsTrigger value="train-model">Train New Model</TabsTrigger>
          </TabsList>

          {activeTab !== "train-model" && (
            <Button
              onClick={() => setActiveTab("train-model")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Train New Model
            </Button>
          )}
        </div>

        <TabsContent value="my-models">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* {models} */}
          </div>

          {models && (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <BrainCircuit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Custom Models Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Train your first custom model to get started with personalized
                  property predictions.
                </p>
                <Button onClick={() => setActiveTab("train-model")}>
                  Train Your First Model
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="system-models">
          {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <ModelCard model={model} />
            ))}
          </div> */}
        </TabsContent>

        <TabsContent value="train-model">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Training Configuration</CardTitle>
                  <CardDescription>Configure your new model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input
                      id="model-name"
                      placeholder="e.g., My Custom Model v1.0"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-description">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="model-description"
                      placeholder="Describe the purpose of this model..."
                      rows={3}
                      value={modelDescription}
                      onChange={(e) => setModelDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Model Type</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="regression">Regression (Default)</option>
                      <option value="neural-network">Neural Network</option>
                      <option value="ensemble">Ensemble</option>
                      <option value="geospatial">Geospatial</option>
                      <option value="time-series">Time Series</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">
                      Advanced Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="feature-selection">
                            Automatic Feature Selection
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Let AI select the most relevant features
                          </p>
                        </div>
                        <Switch id="feature-selection" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="hyperparameter-tuning">
                            Hyperparameter Tuning
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Optimize model parameters automatically
                          </p>
                        </div>
                        <Switch id="hyperparameter-tuning" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="cross-validation">
                            Cross-Validation
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Use k-fold cross-validation
                          </p>
                        </div>
                        <Switch id="cross-validation" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Select Data Source</CardTitle>
                  <CardDescription>
                    Choose a data pipeline to train your model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataPipelines.map((pipeline) => (
                      <div
                        key={pipeline.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPipeline === pipeline.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedPipeline(pipeline.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Database className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-medium">{pipeline.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {pipeline.records.toLocaleString()} records •
                                Updated {pipeline.lastUpdated}
                              </p>
                            </div>
                          </div>
                          {selectedPipeline === pipeline.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Process</CardTitle>
                  <CardDescription>
                    Monitor and control the training process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isTraining ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Training Progress</span>
                          <span>{trainingProgress}%</span>
                        </div>
                        <Progress value={trainingProgress} className="h-2" />
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-medium">Current Step:</div>
                        <div className="text-sm">
                          {trainingProgress < 20
                            ? "Preparing data..."
                            : trainingProgress < 40
                            ? "Feature engineering..."
                            : trainingProgress < 60
                            ? "Training model..."
                            : trainingProgress < 80
                            ? "Evaluating performance..."
                            : trainingProgress < 100
                            ? "Finalizing model..."
                            : "Training complete!"}
                        </div>
                      </div>

                      {trainingProgress < 100 && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsTraining(false)}
                        >
                          Cancel Training
                        </Button>
                      )}

                      {trainingProgress === 100 && (
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md flex items-center gap-2">
                            <Check className="h-5 w-5" />
                            <span>Training completed successfully!</span>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              View Details
                            </Button>
                            <Button className="flex-1">Use Model</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border border-dashed rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <BrainCircuit className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-medium">Ready to Train</h3>
                            <p className="text-sm text-muted-foreground">
                              Configure your settings and start training
                            </p>
                          </div>
                        </div>

                        {!selectedPipeline && (
                          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md flex items-center gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Please select a data pipeline first</span>
                          </div>
                        )}

                        {!modelName && (
                          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md flex items-center gap-2 text-sm mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Please enter a model name</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setActiveTab("my-models")}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 gap-2"
                          onClick={handleStartTraining}
                          disabled={!selectedPipeline || !modelName}
                        >
                          <Play className="h-4 w-4" />
                          Start Training
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
