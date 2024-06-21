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
        </Stack>
      </CardBody>
    </Card>
  );
};
