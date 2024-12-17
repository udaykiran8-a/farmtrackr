import { DashboardLayout } from "@/components/DashboardLayout";
import Map from "@/components/Map";

const MapView = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Map View</h2>
        <Map />
      </div>
    </DashboardLayout>
  );
};

export default MapView;