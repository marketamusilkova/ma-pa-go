import a from './1.jpg';
import b from './2.jpg';
import c from './3.jpg';
import d from './4.jpg';
import e from './5.jpg';
import f from './6.jpg';
import g from './7.jpg';
import h from './8.jpg';
import { Card, Grid, Image, Stack, Text } from '@chakra-ui/react';

export const AboutUs = () => {
  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Stack spacing="2rem" m={{ base: '0.5rem', md: '2rem' }}>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          templateRows={{ base: 'repeat(2, 1fr)', md: 'none' }}
          gap={2}
        >
          <Image src={a} borderRadius="50%" />
          <Image src={b} borderRadius="50%" />
          <Image src={c} borderRadius="50%" />
          <Image src={d} borderRadius="50%" />
        </Grid>

        <Text fontSize={{base: "medium", md:"large"}}>
          Jsme Markéta a Pavlína, dvě mámy se spoustou energie, zálibou ve
          čtení, sportu, cestování a programování...
        </Text>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          templateRows={{ base: 'repeat(2, 1fr)', md: 'none' }}
          gap={2}
        >
          <Image src={e} borderRadius="50%" />
          <Image src={f} borderRadius="50%" />
          <Image src={g} borderRadius="50%" />
          <Image src={h} borderRadius="50%" />
        </Grid>
      </Stack>
    </Card>
  );
};
