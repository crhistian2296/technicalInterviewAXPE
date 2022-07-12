import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// const key = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const center = { lat: 48.8584, lng: 2.2945 };

// const libraries = ["places"];

function App() {
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
        ></GoogleMap>
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
          <HStack spacing={4}>
            <Input type='text' zIndex={1} placeholder='type a location' />
            <Button type='submit' color='black'>
              Search
            </Button>
            <IconButton
              icon={<FontAwesomeIcon icon={faLocationCrosshairs} />}
              p={2}
            ></IconButton>
          </HStack>
        </Flex>
      </Box>
      Google Maps clone
    </Flex>
  );
}

export default App;
