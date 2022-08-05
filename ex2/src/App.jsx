import { Box, Button, Container, Flex, HStack, Input } from "@chakra-ui/react";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import SkeletonScreen from "./components/SkeletonScreen";

// madrid coordinates
const center = { lat: 40.4168, lng: -3.7038 };

const libraries = ["places"];

function App() {
  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [markers, setMarkers] = useState([]);
  const [search, setSearch] = useState({});
  const inputRef = useRef();
  const [inputText, setInputText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!search.lat) return;
    map.panTo(search);
  };

  const handlePlaceChanged = () => {
    const placeCoords =
      inputRef.current.gm_accessors_?.place.Qj.place?.geometry?.location ??
      null;
    if (!placeCoords) return;
    const lat = placeCoords.lat();
    const lng = placeCoords.lng();
    const placeName =
      inputRef.current.gm_accessors_.place.Qj.formattedPrediction;

    setSearch(() => ({ lat, lng }));
    setInputText(placeName);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <SkeletonScreen />;
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
      pt='4%'
    >
      <Box position='absolute' left='0' top='0' h='100%' w='100%'>
        <GoogleMap
          onLoad={map => setMap(map)}
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "99vw", height: "98vh" }}
          onClick={e =>
            setMarkers(initialState => [
              ...initialState,
              { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() },
            ])
          }
        >
          {markers.map(marker => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW={Container.md}
      >
        <Flex flexDirection='row' alignItems='center'>
          <form style={{ zIndex: "2" }} onSubmit={() => handleSubmit()}>
            <HStack spacing={4} h='40px' zIndex={2}>
              <Autocomplete
                onLoad={ref => {
                  inputRef.current = ref;
                }}
                onPlaceChanged={handlePlaceChanged}
                zIndex={5}
              >
                <Input
                  type='text'
                  h='28px'
                  zIndex={2}
                  placeholder='type a location'
                  name='location'
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                />
              </Autocomplete>
              <Button
                type='submit'
                colorScheme='whiteAlpha'
                color='black'
                h='34px'
                onClick={handleSubmit}
              >
                Search
              </Button>
              <Button p={8} onClick={() => map.panTo(center)}>
                <FontAwesomeIcon icon={faLocationCrosshairs} />
              </Button>
            </HStack>
          </form>
        </Flex>
      </Box>
      Google Maps clone
    </Flex>
  );
}

export default App;
