import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { nameDays } from '../../../library/api';
import { useEffect, useState } from 'react';

export const Dayjs = () => {
  const [nDays, setNDays] = useState(null);

  const dnes = dayjs();
  const dnesNaformatovano = dnes.format('DD. MM. YYYY');
  const stedryDen = dayjs('2024-12-24');
  const zbyvaDoVanoc = stedryDen.diff(dnes, 'day');
  const galavecer = dayjs('2024-06-20');
  const zbyvaDoGalavecera = galavecer.diff(dnes, 'day');
  const odevzdaniProjektu = dayjs('2024-06-17');
  const zbyvaDoOdevzdaniProjektu = odevzdaniProjektu.diff(dnes, 'day');

  useEffect(() => {
    const fetchName = async () => {
      const data = await nameDays();
      setNDays(data.nameday.cz);
    };

    fetchName();
  }, []);

  let vanoce;
  if (zbyvaDoVanoc + 1 === 1) {
    vanoce = `Do Vánoc zbývá ještě ${zbyvaDoVanoc + 1} den.`;
  } else if (zbyvaDoVanoc + 1 >= 2 && zbyvaDoVanoc + 1 <= 4) {
    vanoce = `Do Vánoc zbývají ještě ${zbyvaDoVanoc + 1} dny.`;
  } else if (zbyvaDoVanoc === 0) {
    vanoce = 'Dneska je Štědrý den!';
  } else {
    vanoce = `Do Vánoc zbývá ještě ${zbyvaDoVanoc + 1} dní.`;
  }

  let galavecerDAweb;
  if (zbyvaDoGalavecera + 1 === 1) {
    galavecerDAweb = `Do galavečera DA web zbývá ještě ${
      zbyvaDoGalavecera + 1
    } den.`;
  } else if (zbyvaDoGalavecera + 1 >= 2 && zbyvaDoGalavecera + 1 <= 4) {
    galavecerDAweb = `Do galavečera DA web zbývají ještě ${
      zbyvaDoGalavecera + 1
    } dny.`;
  } else if (zbyvaDoGalavecera === 0) {
    galavecerDAweb = 'Dneska je galavečer DA web!';
  } else {
    galavecerDAweb = `Do galavečera DA web zbývá ještě ${
      zbyvaDoGalavecera + 1
    } dní.`;
  }

  let odevzdani;
  if (zbyvaDoOdevzdaniProjektu + 1 === 1) {
    odevzdani = `Do odevzdání zbývá ještě ${zbyvaDoOdevzdaniProjektu + 1} den.`;
  } else if (
    zbyvaDoOdevzdaniProjektu + 1 >= 2 &&
    zbyvaDoOdevzdaniProjektu + 1 <= 4
  ) {
    odevzdani = `Do odevzání zbývají ještě ${
      zbyvaDoOdevzdaniProjektu + 1
    } dny.`;
  } else if (zbyvaDoOdevzdaniProjektu === 0) {
    odevzdani = 'Dneska je odevzdání!';
  } else {
    odevzdani = `Do odevzdání zbývá ještě ${zbyvaDoOdevzdaniProjektu + 1} dní.`;
  }

  return (
    <Card>
      <CardHeader>
        {nDays ? (
          <Heading size={{ base: 'md', md: 'lg' }}>
            Dneska je {dnesNaformatovano} a svátek slaví {nDays}.
          </Heading>
        ) : null}
      </CardHeader>
      <Divider color="yellow.500" />
      <CardBody>
        <Stack spacing="4">
          <Box>
            <Text pt="2" fontSize={{ base: 'md', lg: 'xl' }}>
              {vanoce}
            </Text>
          </Box>
          <Box>
            <Text pt="2" fontSize={{ base: 'md', lg: 'xl' }}>
              {galavecerDAweb}
            </Text>
          </Box>
          <Box>
            <Text pt="2" fontSize={{ base: 'md', lg: 'xl' }}>
              {odevzdani}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
