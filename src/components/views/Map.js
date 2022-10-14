import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";

export default function Map() {
  const { lat, log} = useParams();
  

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        // console.log(e.latlng)
        setPosition({ lat: lat, lng: log })
        map.flyTo({ lat: lat, lng: log }, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  
  return(
    <div className="container mx-auto px-10">
      <MapContainer
        center={{ lat: lat, lng: log }}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}
