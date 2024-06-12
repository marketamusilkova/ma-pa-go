import { Card, Grid, Image, Stack, Text } from '@chakra-ui/react';

export const AboutUs = () => {
  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p="1rem">
      <Stack spacing="2rem" m={{ base: '0.5rem', md: '2rem' }}>
        <Text fontSize={{ base: 'medium', md: 'large' }}>
          Jsme Markéta a Pavlína a máme rády lego (z toho název ma-pa-go). Dvě mámy se spoustou energie, zálibou ve čtení, sportu, cestování a programování...
        </Text>
        <Image
          src="https://media.giphy.com/media/NF3zrD41FkGfLOBJhI/giphy.gif?cid=ecf05e47ba3tryiq9yy6y02i5iaepiv61h3lz3or0wslwdhv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="partners"
          borderRadius="lg"
        />
      </Stack>
    </Card>
  );
};
