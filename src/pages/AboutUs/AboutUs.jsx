import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Highlight,
  Image,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const AboutUs = () => {
  return (
    <Card bg="rgba(253, 251, 251, 0.8)" p={{ base: '1rem', md: '2rem' }}>
      <Stack justifyContent="center" alignItems="center">
        <Card
          direction={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          overflow="hidden"
          variant="outline"
          maxW={{ base: '100%', md: '90%', lg: '70%' }}
        >
          <Box m="1rem">
            <Image
              objectFit="cover"
              maxW={{ base: '100%', sm: '200px' }}
              src="https://media.giphy.com/media/NF3zrD41FkGfLOBJhI/giphy.gif?cid=ecf05e47ba3tryiq9yy6y02i5iaepiv61h3lz3or0wslwdhv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="frineds"
              borderRadius="lg"
            />
          </Box>
          <Stack>
            <CardBody>
              <Stack direction="column" justifyContent="space-around">
                <Heading size={{ base: 'sm', md: 'md' }} fontWeight="semibold">
                  Jsme dvě mámy se spoustou energie. Máme velké plány a málo
                  času...
                </Heading>

                <Heading
                  lineHeight="tall"
                  size={{ base: 'sm', md: 'md' }}
                  fontWeight="normal"
                  mt={2}
                >
                  <Highlight
                    query="ma-pa-go"
                    styles={{
                      px: '1',
                      rounded: 'full',
                      bg: 'yellow.500',
                    }}
                  >
                    My i naše rodiny milujeme lego, z čehož vznikl design celé
                    aplikace i název ma-pa-go.
                  </Highlight>
                </Heading>
              </Stack>
            </CardBody>
          </Stack>
        </Card>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        mt="2rem"
        justifyContent={{ base: 'center', md: 'space-evenly' }}
      >
        <Card maxW={{ base: '100%', md: '40%' }}>
          <CardHeader pb={0}>
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
          <CardHeader pb={0}>
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
                Pokud jste dočetli až ke mně, můžete si zkopírovat vedlejší odstavec jen americký fotbal vyměňte za cyklistiku, jinak platí většina věcí. Studovala jsem Rekreologii, takže sportovní činnosti mohu doplnit ještě o golf a lezení, ale zrovna tyto 2 činnosti se mi s dětmi zatím moc nedaří, tak se asi nepočítají :-). Nyní jsou nahrazeny výlety s dětmi vlakem, busem, na kolech, pěšky a přespávání pod širákem. 
                 V poslední době dělím všechen čas mezi rodinu, programování, stavbu domu a knihy, takže seriály a filmy mne míjí. Děkuji manželovi a zbytku rodiny za obrovskou podporu, díky níž jsem mohla nakouknout do jiného jazyka, tentokrát programovacího.
                </Text>
                <Text pt="2" fontSize="sm">
                S Markét máme mnoho věcí společných, věřím, že to je důvod proč jsme si padly do oka a vymyslely tento projekt, který nám usnadní život a pomůže nám mít důležité úkoly vždy u sebe.

                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  A co naopak nemám ráda?
                </Heading>
                <Text pt="2" fontSize="sm">
                Nespravedlnost mám na prvním místě, fronty na vlek už jsem dlouho nezažila a ledvinky a játra mi tolik nevadí. Též nesnáším, když mi někdo lže a doběla mě umí vytočit jen moje děti. Mráz mi běhá po zádech z loupání jablek a sledování hororů (oboje dělám jen s velkým sebezapřením). 
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
