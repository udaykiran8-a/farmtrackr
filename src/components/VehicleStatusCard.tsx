import { Battery, Fuel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleStatusCardProps {
  name: string;
  type: string;
  fuelLevel: number;
  batteryLevel: number;
  status: "active" | "idle" | "maintenance";
}

export const VehicleStatusCard = ({
  name,
  type,
  fuelLevel,
  batteryLevel,
  status,
}: VehicleStatusCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "idle":
        return "text-yellow-500";
      case "maintenance":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">{type}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              <span>{fuelLevel}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              <span>{batteryLevel}%</span>
            </div>
          </div>
          <div className={cn("text-sm font-medium", getStatusColor(status))}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};