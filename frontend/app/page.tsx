import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Building, Database, LineChart, MapPin, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            Property Analytics Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Data-Driven Property Intelligence</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Leverage AI and machine learning to analyze property data, predict prices, and gain valuable insights for
            better decision making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/maps">
                Explore Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/data-pipeline">Manage Data Pipelines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Analytics Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools to analyze property data from multiple angles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Geospatial Visualization</CardTitle>
                <CardDescription>
                  Interactive maps with property data overlays and environmental factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize properties on an interactive map with customizable overlays for flood risk, air quality, and
                  more. Analyze properties within a specific radius.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/maps">
                    Explore Maps <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Price Prediction</CardTitle>
                <CardDescription>AI-powered price prediction with explainable features</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Understand how different factors affect property prices with our explainable AI models. Adjust
                  parameters to see how they impact predictions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/price-prediction">
                    View Predictions <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Data Pipelines</CardTitle>
                <CardDescription>Automated data collection and processing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set up automated data collection from multiple sources. Our AI-powered pipelines clean, normalize, and
                  prepare data for analysis.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/data-pipeline">
                    Manage Pipelines <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Property Analytics</CardTitle>
                <CardDescription>Comprehensive property data analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analyze property details, historical price trends, and environmental factors. Generate reports and
                  export data for further analysis.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/properties">
                    Browse Properties <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Real-time market analysis and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track property market trends over time. Identify emerging patterns and make data-driven investment
                  decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/maps">
                    View Trends <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom ML Models</CardTitle>
                <CardDescription>Train and deploy custom machine learning models</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create and train custom machine learning models using your own data. Deploy models for specific
                  analysis needs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1" asChild>
                  <Link href="/models">
                    Manage Models <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our platform and discover how data-driven property analytics can transform your decision making.
          </p>
          <Button size="lg" asChild>
            <Link href="/maps">
              Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
