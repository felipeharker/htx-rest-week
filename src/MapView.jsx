import React, { useMemo, useRef, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapView({ data, selectedRestaurant, onSelectRestaurant }) {
  const mapRef = useRef(null);

  // Filter out those without valid coords
  const validData = useMemo(() => {
    return data.filter(d => d.lat && d.lon && !isNaN(d.lat) && !isNaN(d.lon));
  }, [data]);

  useEffect(() => {
    if (selectedRestaurant && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedRestaurant.lon, selectedRestaurant.lat],
        zoom: 14,
        duration: 2000
      });
    } else if (!selectedRestaurant && mapRef.current) {
       mapRef.current.flyTo({
          center: [-95.3698, 29.7604], // Houston roughly
          zoom: 10,
          duration: 2000
        });
    }
  }, [selectedRestaurant]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full h-[60vh] border border-black relative">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -95.3698,
            latitude: 29.7604,
            zoom: 10
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          {validData.map((restaurant, idx) => {
            const isSelected = selectedRestaurant?.['restaurant name'] === restaurant['restaurant name'];
            const markerColorClass = isSelected ? 'text-black z-10 scale-150 relative' : 'text-gray-500 hover:opacity-80';

            return (
              <Marker
                key={idx}
                longitude={restaurant.lon}
                latitude={restaurant.lat}
                anchor="bottom"
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  onSelectRestaurant(restaurant);
                }}
              >
                <div className={`cursor-pointer transition-all ${markerColorClass}`}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="3" fill="white" />
                  </svg>
                </div>
              </Marker>
            );
          })}
        </Map>
      </div>

      {/* Selected Restaurant Detail */}
      {selectedRestaurant && (
        <div className="border-2 border-black p-4 md:p-6 bg-black text-white flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold font-serif mb-2">{selectedRestaurant['restaurant name']}</h2>
          <p className="font-mono text-sm text-gray-300">{selectedRestaurant['restaurant address']}</p>
        </div>
      )}
      {!selectedRestaurant && validData.length > 0 && (
         <div className="border border-black p-4 text-center font-mono text-gray-500">
           Select a marker on the map to view details.
         </div>
      )}
    </div>
  );
}
