import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  Play,
  Sliders,
  ArrowRight,
  Info,
  AlertTriangle,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function ModelsDocumentationPage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Models Documentation"
        description="Learn how to use and train AI models for property analysis"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Documentation", href: "/documentation" },
          { title: "Models", href: "/documentation/models" },
        ]}
      />

      <div className="flex mb-6">
        <Link href="/documentation">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Models</CardTitle>
              <CardDescription>Learn about the different types of models available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                BorBann uses machine learning models to analyze property data and make predictions. These models are
                trained on historical property data and can be used to predict property prices, identify trends, and
                provide insights.
              </p>

              <h3 className="text-lg font-medium mt-4">Types of Models</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium flex items-center gap-2">
                    Regression Models
                    <Badge variant="outline">Standard ML Model v2.4</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Used for predicting continuous values like property prices. These models analyze various features to
                    estimate a property's value.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium flex items-center gap-2">
                    Neural Networks
                    <Badge variant="outline">Enhanced Neural Network v1.8</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Deep learning models that can capture complex patterns in property data. Ideal for analyzing
                    multiple factors simultaneously.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium flex items-center gap-2">
                    Geospatial Models
                    <Badge variant="outline">Geospatial Regression v3.1</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Specialized models that incorporate location data and spatial relationships between properties.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium flex items-center gap-2">
                    Time Series Models
                    <Badge variant="outline">Time Series Forecast v2.0</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models designed to analyze property price trends over time and make future predictions.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border mt-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">System vs. Custom Models</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>System Models</strong> are pre-trained models provided by BorBann. They are regularly
                      updated and maintained by our team.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Custom Models</strong> are models that you train using your own data pipelines. These can
                      be tailored to your specific needs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Models</CardTitle>
              <CardDescription>How to select and use models for property analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Selecting a Model</h3>
              <p className="text-sm text-muted-foreground">
                You can select different models when using the Maps or Price Prediction features. Look for the model
                selector dropdown in the interface.
              </p>

              <div className="border rounded-md p-4 mt-2">
                <h4 className="font-medium mb-2">Step-by-Step Guide</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>Navigate to the Maps or Price Prediction page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>Look for the model selector dropdown in the top navigation bar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>Click on the dropdown to see available models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <span>Select the model that best suits your analysis needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <span>The page will update to use the selected model for analysis</span>
                  </li>
                </ol>
              </div>

              <h3 className="text-lg font-medium mt-4">Understanding Model Results</h3>
              <p className="text-sm text-muted-foreground">
                Different models may produce slightly different results. Here's how to interpret them:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Price Predictions</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models provide a predicted price along with a confidence level. The higher the confidence, the more
                    reliable the prediction.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Feature Importance</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models show which features (location, size, etc.) have the most impact on the property price.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Price Range</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models provide a range of possible prices based on the confidence level.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models analyze how environmental factors affect property values in the area.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Custom Models</CardTitle>
              <CardDescription>Learn how to create and train your own models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You can train custom models using your own data pipelines. This allows you to create models tailored to
                your specific needs.
              </p>

              <div className="border rounded-md p-4 mt-2">
                <h4 className="font-medium mb-2">Step-by-Step Guide</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-medium">Navigate to the Models page</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Go to the Models section from the sidebar navigation
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-medium">Click "Train New Model"</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        This will take you to the model training interface
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-medium">Configure your model</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Enter a name, description, and select the model type
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <span className="font-medium">Select a data pipeline</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Choose which data pipeline to use for training the model
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <span className="font-medium">Start training</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Click the "Start Training" button to begin the training process
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <span className="font-medium">Monitor training progress</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        The system will show you the training progress and notify you when it's complete
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md flex items-start gap-2 mt-4">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Important Notes</h4>
                  <ul className="text-sm mt-1 space-y-1 list-disc list-inside">
                    <li>Training a model requires a data pipeline with sufficient data</li>
                    <li>The training process may take several minutes depending on the data size</li>
                    <li>You can cancel training at any time if needed</li>
                    <li>Models with more data generally produce more accurate results</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link
                  href="#understanding-models"
                  className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted"
                >
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <span>Understanding Models</span>
                </Link>
                <Link href="#using-models" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
                  <Play className="h-4 w-4 text-primary" />
                  <span>Using Models</span>
                </Link>
                <Link
                  href="#training-custom-models"
                  className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted"
                >
                  <Database className="h-4 w-4 text-primary" />
                  <span>Training Custom Models</span>
                </Link>
                <Link
                  href="#model-parameters"
                  className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted"
                >
                  <Sliders className="h-4 w-4 text-primary" />
                  <span>Model Parameters</span>
                </Link>
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Related Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href="/documentation/price-prediction"
                  className="block p-3 border rounded-md hover:border-primary/50 transition-colors"
                >
                  <h4 className="font-medium">Price Prediction</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Learn how to use models for property price prediction
                  </p>
                </Link>
                <Link
                  href="/documentation/data-pipeline"
                  className="block p-3 border rounded-md hover:border-primary/50 transition-colors"
                >
                  <h4 className="font-medium">Data Pipelines</h4>
                  <p className="text-xs text-muted-foreground mt-1">Set up data pipelines for model training</p>
                </Link>
                <Link
                  href="/documentation/maps"
                  className="block p-3 border rounded-md hover:border-primary/50 transition-colors"
                >
                  <h4 className="font-medium">Maps & Geospatial</h4>
                  <p className="text-xs text-muted-foreground mt-1">Use models with the interactive map</p>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button className="w-full" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/documentation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/documentation/price-prediction">
            Next: Price Prediction
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

