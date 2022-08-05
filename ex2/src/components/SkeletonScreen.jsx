import { Skeleton, Stack } from "@chakra-ui/react";

const SkeletonScreen = () => {
  return (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  );
};

export default SkeletonScreen;
