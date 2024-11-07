"use client";
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Tooltip , Marker, Popup, MapConsumer, useMapEvents } from 'react-leaflet';
import { icon, marker, popup, Control } from 'leaflet';
import { useMap } from 'react-leaflet/hooks';
import "leaflet/dist/leaflet.css";
import useMapStore from '@/store/useMapStore';
import { v4 as uuidv4 } from 'uuid';
import { mapAPI } from '@/services/api/map';
import L from 'leaflet'
import { useFormContext } from 'react-hook-form';


const markerIcon = icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});


function LocationMarker({ position, setPosition }) {
    const [markerPosition, setMarkerPosition] = useState(position);
    const [draggable, setDraggable] = useState(true);
    const { markers, setLocation, setMarkers} =  useMapStore(state=>state);
    const markerRef = useRef(null);
    const { setValue, watch } = useFormContext();

    const selectedLocation = watch('location');

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
              setMarkerPosition(marker.getLatLng());
              // setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    );

    const toggleDraggable = useCallback((id) => {
      // setDraggable((d) => !d);

      // setMarkers(markers.filter((mk)=>mk))
    }, []);

    const map = useMapEvents({
      // click() {
      //   map.locate();
      // },
      click: async(e) => {
        const { lat, lng } = e.latlng;
        let location={};
      //  const ss = map.getLatLng;
        const locationName = await mapAPI.fetchLocation(lat,lng)
        setMarkers([
          ...markers,
          {
            id: uuidv4(),
            lat,
            lng,
            location: locationName,
            icon: markerIcon,
            isDraggable: false,
            eventHandlers,
            pop: {
              lat,
              lng,
              content: `${locationName}` || `Location not found`
            }
          }
        ]);

        const newSelectedLocation = [...selectedLocation];

        if (!newSelectedLocation[0]) {
          newSelectedLocation[0] = locationName;
          setValue('location[0]', locationName); 
        } else if (!newSelectedLocation[1]) {
          newSelectedLocation[1] = locationName;
          setValue('location[1]', locationName); 
        }

        if(newSelectedLocation[0] && newSelectedLocation[1]){
          setValue(`location`, [...selectedLocation, locationName])
        } else setValue(`location`, selectedLocation)
  
        console.log(newSelectedLocation);
        //   e.latlng,
        //   map.options.crs.scale(map.getZoom()),
        //   results => {
        //     var r = results[0];
        //     if (r) {
        //       if (marker) {
        //         marker
        //           .setLatLng(r.center)
        //           .setPopupContent(r.html || r.name)
        //           .openPopup();
        //       } else {
        //         marker = L.marker(r.center)
        //           .bindPopup(r.name)
        //           .addTo(map)
        //           .openPopup();
        //       }
        //     }
        //   }
        // );
        // marker([lat, lng], { icon: markerIcon, draggable, eventHandlers }).addTo(map);
        // popup([lat, lng], {content: '<p>Hello world!<br />This is a nice popup.</p>'}).openOn(map);
      },
      locationfound(e) {
        console.log('eee',e);
        setMarkerPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      } 
    });

  
    return markerPosition === null ? null : (
      <>
      {/* <Marker ref={markerRef} draggable={draggable} position={markerPosition} eventHandlers={eventHandlers} icon={markerIcon}>
        <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
        </Popup>
        <Tooltip>Tooltip</Tooltip>
      </Marker> */}

      {markers.map((mk,index)=>(
          <Marker key={index} draggable={mk.isDraggable} position={[mk.lat, mk.lng]} eventHandlers={eventHandlers} icon={markerIcon}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable ? mk.pop.content : "Marker is draggable"}
              </span>
            </Popup>
            {/* <Tooltip style={{ maxWidth: '80px' }}>{mk.location}</Tooltip> */}
        </Marker>
      ))}
      </>)
  }

  


const TollMap = () => {
    const [position, setPosition] = useState([24.4279, 80.6620]);
    const [ map, setMap] = useState(null);
    const [zoom, setZoom] = useState(5);

    const onReset = useCallback(() => {
      if (map) {
        map.setView([24.4279, 80.6620], zoom);
      }
    }, [map, position, zoom]);

    const onMove = useCallback(() => {
      if (map) {
        const { lat, lng} = map.getCenter();
        setPosition([lat, lng]);
      }
    }, [map, setPosition]);


    useEffect(() => {
      if (map) {
        map.on('move', onMove);
        return () => {
          map.off('move', onMove);
        };
      }
    }, [map, onMove]);


    return (
      <>
      <div className='flex items-center justify-between p-2'>
        <p>
        <span className='font-semibold'>latitude:</span> {position[0]?.toFixed(4)} <span className='font-semibold'>longitude: </span>  {position[1]?.toFixed(4)}
        </p>
        <button onClick={onReset} className="px-5 py-1 text-white bg-indigo-500 rounded ms-4 my-4">Reset view</button>
      </div>
       
        <MapContainer 
          draggable 
          ref={setMap} 
          center={position} 
          zoom={zoom} 
          scrollWheelZoom 
          style={{ height: '100vh', width: '100%'}}
        >
            <TileLayer 
              className='flex'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            />
            <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
        </>
    )
}

export default TollMap;