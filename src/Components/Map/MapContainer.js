import React from 'react';
import GoogleMapReact from "google-map-react";


const MapContainer = () => {
  return (
    <div style={{ height: '70vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyA0WJMCMWyQfTlGIwt3tg7qAI7kEw9jmxY",
          language: "en",
          region: "US"
        }}
        defaultCenter={{ lat: 23.810331, lng: 90.412521 }}
        defaultZoom={15}
      >
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;