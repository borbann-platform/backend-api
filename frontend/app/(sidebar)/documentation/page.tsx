import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Map,
  Database,
  BrainCircuit,
  BarChart2,
  Building,
  Search,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Zap,
  Video,
  FileQuestion,
  Play,
} from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Documentation"
        description="Learn how to use BorBann's property analytics platform"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Documentation", href: "/documentation" },
        ]}
      />

      <div className="mt-6 mb-10">
        <div className="bg-muted/50 p-6 rounded-lg border">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Welcome to BorBann Documentation</h2>
              <p className="text-muted-foreground mb-4">
                This documentation will help you get the most out of our property analytics platform. No coding
                experience is required to use our tools.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="#getting-started">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#tutorials">View Tutorials</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <BookOpen className="h-24 w-24 text-primary/20" />
            </div>
          </div>
        </div>
      </div>

      <section id="getting-started" className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Getting Started
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Maps & Geospatial
              </CardTitle>
              <CardDescription>Learn how to use the interactive map</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore properties on our interactive map, apply filters, and analyze environmental factors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Navigating the map interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Applying filters and radius search</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Understanding property markers</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/maps">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                Price Prediction
              </CardTitle>
              <CardDescription>Understand property price predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how our AI models predict property prices and how to interpret the results.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Understanding prediction factors</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Adjusting parameters</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Generating and using reports</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/price-prediction">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Pipelines
              </CardTitle>
              <CardDescription>Set up automated data collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to create and manage data pipelines for property data collection.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Creating your first pipeline</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Configuring data sources</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Scheduling and automation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/data-pipeline">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Models
              </CardTitle>
              <CardDescription>Work with AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Understand how to use and train custom AI models for property analysis.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Selecting the right model</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Training custom models</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Understanding model parameters</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/models">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Property Listings
              </CardTitle>
              <CardDescription>Browse and analyze properties</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to browse property listings and analyze property details.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Filtering and sorting properties</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Understanding property analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Exporting property data</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/properties">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search & Filters
              </CardTitle>
              <CardDescription>Find exactly what you need</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Master the search and filtering capabilities across the platform.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Advanced search techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Creating and saving filters</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Combining multiple filters</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documentation/search">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section id="tutorials" className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          Video Tutorials
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="aspect-video bg-muted/50 rounded-t-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-primary/30" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Getting Started with BorBann</CardTitle>
              <CardDescription>5:32 • Beginner</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A complete overview of the platform and its main features.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                Watch Tutorial
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="aspect-video bg-muted/50 rounded-t-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-primary/30" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Creating Your First Data Pipeline</CardTitle>
              <CardDescription>8:45 • Beginner</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Step-by-step guide to setting up automated data collection.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                Watch Tutorial
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="aspect-video bg-muted/50 rounded-t-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-primary/30" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Advanced Map Analysis</CardTitle>
              <CardDescription>12:20 • Intermediate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to use advanced map features for property analysis.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                Watch Tutorial
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" asChild>
            <Link href="/documentation/tutorials">
              View All Tutorials <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How accurate are the price predictions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our price predictions typically have an accuracy of 85-95% depending on the model used and the data
                available. System models are regularly updated to maintain accuracy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I export data for use in other tools?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes, you can export data in various formats including CSV, JSON, and PDF reports. Look for the export
                options in the property details and analytics pages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Do I need coding experience to use this platform?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No, our platform is designed to be user-friendly for non-technical users. All features can be accessed
                through the intuitive user interface without any coding.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">How often is the property data updated?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Data update frequency depends on your data pipeline configuration. System data is typically updated
                daily, while custom pipelines can be scheduled according to your needs.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" asChild>
            <Link href="/documentation/faq">
              View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-primary" />
                  Need More Help?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button asChild>
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Zap className="h-20 w-20 text-primary/20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

