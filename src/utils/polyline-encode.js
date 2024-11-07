/**
 * @author Anish Verma
 * @description polylincecodec function 
 * @version 1.0
 */

import { decode, encode } from "@googlemaps/polyline-codec";

const PolylineCodec = {
  polyEncode(decodedPolylines, number = 5) {
    return encode(decodedPolylines, number);
  },
  polyDecode(encodedPolylines, number = 5) {
    return decode(encodedPolylines, number);
  },
};


export default PolylineCodec;