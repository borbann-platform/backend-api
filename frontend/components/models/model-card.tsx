// import {
//   ArrowRight,
//   Clock,
//   Database,
//   Info,
//   Link,
//   Settings,
//   Sliders,
//   Trash2,
// } from "lucide-react";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";

// interface ModelCardProps {
//   model: {
//     id: string;
//     name: string;
//     type: string;
//     // hyperparameters: {
//     //   [key: string]: string;
//     // };
//     // dataSource: string;
//     status: string;
//     // lastUpdated: string;
//     // isSystem: boolean;
//   };
// }

// export function ModelCard({ model }: ModelCardProps) {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex justify-between items-start">
//           <CardTitle className="text-lg">{model.name}</CardTitle>
//           <Badge variant={model.status === "active" ? "default" : "secondary"}>
//             {model.status === "active" ? "Active" : "Inactive"}
//           </Badge>
//         </div>
//         <CardDescription>{model.type} Model</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div>
//             <div className="flex items-center gap-1 mb-1">
//               <Database className="h-4 w-4 text-primary" />
//               <span className="text-sm font-medium">Data Source:</span>
//             </div>
//             {model.isSystem ? (
//               <div className="flex items-center gap-1 text-sm">
//                 <Badge variant="outline" className="bg-primary/5">
//                   System Base Model
//                 </Badge>
//                 <span title="This is a pre-trained system model">
//                   <Info className="h-4 w-4 text-muted-foreground cursor-help" />
//                 </span>
//               </div>
//             ) : (
//               <span className="text-sm">{model.dataSource}</span>
//             )}
//           </div>

//           <div>
//             <div className="flex items-center gap-1 mb-1">
//               <Sliders className="h-4 w-4 text-primary" />
//               <span className="text-sm font-medium">Hyperparameters:</span>
//             </div>
//             <div className="grid grid-cols-1 gap-1">
//               {Object.entries(model.hyperparameters).map(([key, value]) => (
//                 <div key={key} className="flex justify-between text-xs">
//                   <span className="text-muted-foreground">{key}:</span>
//                   <span>{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center text-sm">
//             <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
//             <span className="text-muted-foreground">Last updated:</span>
//             <span className="ml-1 font-medium">{model.lastUpdated}</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline" size="sm" asChild>
//           <Link
//             href={model.isSystem ? "/documentation/models" : "/models/details"}
//           >
//             View Details
//           </Link>
//         </Button>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8 text-primary border-primary/20 hover:border-primary"
//           >
//             <Settings className="h-4 w-4" />
//           </Button>
//           {!model.isSystem && (
//             <Button
//               variant="outline"
//               size="icon"
//               className="h-8 w-8 border-primary/20 hover:border-primary"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8 border-primary/20 hover:border-primary"
//           >
//             <ArrowRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
