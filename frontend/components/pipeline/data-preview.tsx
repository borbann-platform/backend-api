import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export function PipelineDataPreview() {
  return (
    <Card className="border-2 hover:border-highlight-border transition-all duration-200">
      <CardHeader>
        <CardTitle>Data Preview</CardTitle>
        <CardDescription>Sample of the collected data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Bedrooms
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Bathrooms
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Sq. Ft.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 text-sm">P001</td>
                <td className="px-4 py-2 text-sm">Modern Apartment</td>
                <td className="px-4 py-2 text-sm">$350,000</td>
                <td className="px-4 py-2 text-sm">2</td>
                <td className="px-4 py-2 text-sm">2</td>
                <td className="px-4 py-2 text-sm">Downtown</td>
                <td className="px-4 py-2 text-sm">1,200</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">P002</td>
                <td className="px-4 py-2 text-sm">Luxury Villa</td>
                <td className="px-4 py-2 text-sm">$1,250,000</td>
                <td className="px-4 py-2 text-sm">5</td>
                <td className="px-4 py-2 text-sm">4</td>
                <td className="px-4 py-2 text-sm">Suburbs</td>
                <td className="px-4 py-2 text-sm">3,500</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">P003</td>
                <td className="px-4 py-2 text-sm">Cozy Studio</td>
                <td className="px-4 py-2 text-sm">$180,000</td>
                <td className="px-4 py-2 text-sm">1</td>
                <td className="px-4 py-2 text-sm">1</td>
                <td className="px-4 py-2 text-sm">City Center</td>
                <td className="px-4 py-2 text-sm">650</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}