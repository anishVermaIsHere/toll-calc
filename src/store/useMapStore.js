import { create } from 'zustand';

const useMapStore = create((set) => ({
  position: [28.678465175760362, 77.31162772968865],
  zoom: 13,
  map: null,
  markers: [],
  selectedLocation: ['', ''],
  location: [],
  setSelectedLocation: (location)=>set({ selectedLocation: location }),
  setLocation: (location)=>set({ location }),
  setMarkers: (markers)=>set({ markers }),
  setMap: (map)=>set({ map }),
  setZoom: (zoom)=>set({ zoom }),
  setPosition: (position)=>set({ position })
}))

export default useMapStore;