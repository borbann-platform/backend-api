import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function PipelineExportData() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg">Export Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="format-1"
          >
            <AccordionItem value="format-1" className="border-0">
              <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                <AccordionTrigger className="py-1 px-2">
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <span>Export as JSON</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1 px-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="pretty-json"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <label htmlFor="pretty-json" className="text-sm">
                        Pretty print
                      </label>
                    </div>
                    <Button size="sm" className="w-full">
                      Download JSON
                    </Button>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="format-2" className="border-0">
              <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                <AccordionTrigger className="py-1 px-2">
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <span>Export as CSV</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1 px-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-headers"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <label htmlFor="include-headers" className="text-sm">
                        Include headers
                      </label>
                    </div>
                    <Button size="sm" className="w-full">
                      Download CSV
                    </Button>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="format-3" className="border-0">
              <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                <AccordionTrigger className="py-1 px-2">
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <span>Export as SQLite</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1 px-2">
                  <Button size="sm" className="w-full">
                    Download SQLite
                  </Button>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="format-4" className="border-0">
              <div className="border rounded-md p-2 hover:border-highlight-border transition-all duration-200">
                <AccordionTrigger className="py-1 px-2">
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <span>Export as YAML</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1 px-2">
                  <Button size="sm" className="w-full">
                    Download YAML
                  </Button>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
