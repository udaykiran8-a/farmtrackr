import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    console.log('Map component mounted');
    if (!mapContainer.current || !mapboxToken) return;

    console.log('Initializing map with token:', mapboxToken);
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      zoom: 12,
      center: [-96.7970, 32.7767], // Default center - can be adjusted
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      console.log('Cleaning up map');
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleAddDevice = () => {
    if (!map.current) return;
    
    toast({
      title: "Add Device Mode",
      description: "Click on the map to place your device",
    });

    const addDeviceClick = (e: mapboxgl.MapMouseEvent) => {
      console.log('Adding device at:', e.lngLat);
      
      new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current!);

      toast({
        title: "Device Added",
        description: `Device placed at ${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`,
      });

      map.current?.off('click', addDeviceClick);
    };

    map.current.on('click', addDeviceClick);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {!mapboxToken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10 p-4">
          <h3 className="text-lg font-semibold mb-4">Enter your Mapbox Token</h3>
          <input
            type="text"
            className="w-full max-w-md p-2 border rounded mb-2"
            placeholder="pk.eyJ1..."
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Visit mapbox.com, create an account, and find your public token in the Tokens section of your dashboard.
          </p>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      <Button
        onClick={handleAddDevice}
        className="absolute top-4 left-4 z-10"
        variant="secondary"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Device
      </Button>
    </div>
  );
};

export default Map;