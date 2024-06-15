import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const AboutUs = () => {
  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src="https://media.giphy.com/media/NF3zrD41FkGfLOBJhI/giphy.gif?cid=ecf05e47ba3tryiq9yy6y02i5iaepiv61h3lz3or0wslwdhv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="frineds"
          borderRadius="lg"
        />
        <Stack>
          <CardBody>
            <Stack direction="column" justifyContent="space-around">
              <Heading size={{ base: 'sm', md: 'md' }} fontWeight="normal">
                Jsme dvě mámy se spoustou energie. Máme velké plány a málo
                času...
              </Heading>
              <Heading
                size={{ base: 'sm', md: 'md' }}
                fontWeight="normal"
                mt={2}
              >
                My i naše rodiny milujeme lego, z čehož vznikl design celé
                aplikace i název ma-pa-go.
              </Heading>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        mt="2rem"
        justifyContent={{ base: 'center', md: 'space-evenly' }}
      >
        <Card maxW={{ base: '100%', md: '40%' }}>
          <CardHeader>
            <Heading
              size={{ base: 'lg', md: 'xl' }}
              fontFamily="Shadows Into Light, cursive"
            >
              Markéta
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack
              divider={<StackDivider borderColor="yellow.500" />}
              spacing="4"
            >
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Co mám ráda?
                </Heading>
                <Text pt="2" fontSize="sm">
                  Mám ráda všechny roční období, protože každé mi nabízí jiné
                  potěšení. Miluju sport, hlavně lyžování, plavání, běhání,
                  turistiku, tenis, dříve jsem hrála americký fotbal za Prague
                  Black Cats.
                </Text>
                <Text pt="2" fontSize="sm">
                  Moc ráda čtu, čtu téměř všechno, na střední škole byla má
                  oblíbená kniha Mistr a Markétka, v poslední době čtu spíše
                  současné české autory a autorky. Každý týden se těším na
                  podcast Neplecha ukončena, neboť Harry Potter je prostě
                  nejlepší. Dále poslouchám ráda Opravdové zločiny, Sekty CZ a
                  různé zpravodajské podcasty. A samozřejmě jsem velký závislák
                  na dobrých seriálech...{' '}
                </Text>
                <Text pt="2" fontSize="sm">
                  Nejvíc na světe však miluju svojí rodinu, děkuji mému
                  manželovi, že jen díky němu jsem mohla poznat svou vášen k
                  programování a že mi dal naše dvě nejúžasnější děti.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  A co naopak nemám ráda?
                </Heading>
                <Text pt="2" fontSize="sm">
                  Nemám ráda vysoké ponožky ke kraťasům, smradlavé lidi v MHD a
                  čekání ve frontách na lyžařský vlek. Nesním játra ani ledvinky
                  na žádný způsob. Neskutečně mě vytočí, když někdo podvádí u
                  kterékoli hry. Nesnáším nespravedlnost a když někdo lže. Jo a
                  ještě když jsem přesvědčená, že mám správně napsaný kód, ale
                  nedělá to, co má.
                </Text>
              </Box>
              <Box display="flex" justifyContent="end" gap="1rem">
                <a href="https://github.com/marketamusilkova">
                  <FaGithub fontSize="2em" />
                </a>
                <a href="https://www.linkedin.com/in/marketa-musilkova">
                  <FaLinkedin fontSize="2em" />
                </a>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card maxW={{ base: '100%', md: '40%' }}>
          <CardHeader>
            <Heading
              size={{ base: 'lg', md: 'xl' }}
              fontFamily="Shadows Into Light, cursive"
            >
              Pavlína
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack
              divider={<StackDivider borderColor="yellow.500" />}
              spacing="4"
            >
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Co mám ráda?
                </Heading>
                <Text pt="2" fontSize="sm">
                  Zde napiš, co máš ráda...
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  A co naopak nemám ráda?
                </Heading>
                <Text pt="2" fontSize="sm">
                  Zde napiš, co nemáš ráda...
                </Text>
              </Box>
              <Box display="flex" justifyContent="end" gap="1rem">
                <a href="https://github.com/PavShort">
                  <FaGithub fontSize="2em" />
                </a>
                <a href="http://linkedin.com/in/pavlína-krátká-66611b127">
                  <FaLinkedin fontSize="2em" />
                </a>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Card>
  );
};
