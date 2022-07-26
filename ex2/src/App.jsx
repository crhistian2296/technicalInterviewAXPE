import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import useForm from "./hooks/useForm";

// const key = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

// madrid coordinates
const center = { lat: 40.4168, lng: -3.7038 };

// const libraries = ["places"];

function App() {
  const [markers, setMarkers] = useState([]);
  const { formValues, handleInputChange, reset } = useForm({
    location: "",
  });

  const { location } = formValues;

  const handleSubmit = e => {
    e.preventDefault();
    return formValues.location;
    // reset();
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    // libraries,
  });

  if (!isLoaded) {
    return (
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    );
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
          <HStack spacing={4} h='40px'>
            <Input
              type='text'
              h='28px'
              zIndex={1}
              placeholder='type a location'
              name='location'
              value={location}
              onChange={handleInputChange}
            />
            <Button
              type='submit'
              colorScheme='whiteAlpha'
              color='black'
              h='34px'
              onSubmit={() => {
                handleSubmit();
                reset();
              }}
            >
              Search
            </Button>
            <Button p={8}>
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </Button>
          </HStack>
        </Flex>
      </Box>
      Google Maps clone
    </Flex>
  );
}

export default App;
