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

  useEffect(() => {
    const fetchName = async () => {
      const data = await nameDays();
      setNDays(data.nameday.cz);
    };

    fetchName();
  }, []);

  return (
    <Card>
      <CardHeader>
        {nDays ? (
          <Heading size="lg">
            Dnes je {dnesNaformatovano} a svátek slaví {nDays}.
          </Heading>
        ) : null}
      </CardHeader>
      <Divider color="yellow.500" />
      <CardBody>
        <Stack spacing="4">
          <Box>
            <Text pt="2" fontSize="xl">
              Do Vánoc zbývá ještě {zbyvaDoVanoc} dní.
            </Text>
          </Box>
          <Box>
            <Text pt="2" fontSize="xl">
              Do Galavečera DA web zbývá ještě {zbyvaDoGalavecera} dní.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
