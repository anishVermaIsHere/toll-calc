import axios from "axios";

export const mapAPI = {
    async fetchLocation (lat, lng) {
        const URL= process.env.NEXT_PUBLIC_REVERSE_GEOCODING_SERVICE_URL;
        const response = await axios.get(`${URL}/reverse?format=json&lat=${lat}&lon=${lng}`);
        return response.data.display_name;
    },
    async searchLocation(locationName){
        const URL = process.env.NEXT_PUBLIC_SEARCH_LOCATION_URL;
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const response = await axios.get(`${URL}/search/geocode/v6/forward?q=${locationName}&proximity=ip&country=in&&access_token=pk.eyJ1Ijoid2lraWNpeDE3MCIsImEiOiJjbTIxajhmMXQwdXB6MnBvb29hM2s1azhlIn0.wMrD48_35hn4B_7mz3MIJg`);
        console.log('reposne', response);

        return response.data.features;
    }
}

// without coordinates
// `${URL}/search/searchbox/v1/suggest?q=${locationName}&access_token=${accessToken}&session_token=07197db8-27b7-4bb0-996b-0787cbf996a2&language=en&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&proximity=-98%2C%2040`

// https://tollguru.com/api/trpc/calc.autocompletePlaces?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22query%22%3A%22Mumbai%22%2C%22center%22%3A%7B%22lat%22%3A23.16697%2C%22lng%22%3A79.95006%7D%2C%22filters%22%3A%7B%22in%22%3A%22countryCode%3AIND%22%2C%22politicalView%22%3A%22IND%22%7D%7D%7D%7D

// Note:
// React Leaflet is primarily a library for mapping functionality, like rendering maps, layers, and markers, 
// but it doesn't natively support geocoding (converting coordinates into location names). 
// so, that we rely on external services like OpenStreetMap's Nominatim or Google Geocoding API for reverse geocoding
// because they offer detailed geographical information from coordinates, including street addresses and place names.