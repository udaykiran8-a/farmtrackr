import { DashboardLayout } from "@/components/DashboardLayout";
import { VehicleStatusCard } from "@/components/VehicleStatusCard";

const Index = () => {
  const vehicles = [
    {
      name: "Drone 1",
      type: "Survey Drone",
      fuelLevel: 85,
      batteryLevel: 90,
      status: "active",
    },
    {
      name: "Tractor 1",
      type: "Sprayer Tractor",
      fuelLevel: 45,
      batteryLevel: 100,
      status: "idle",
    },
    {
      name: "Drone 2",
      type: "Mapping Drone",
      fuelLevel: 20,
      batteryLevel: 30,
      status: "maintenance",
    },
  ] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Vehicle Status</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleStatusCard key={vehicle.name} {...vehicle} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;