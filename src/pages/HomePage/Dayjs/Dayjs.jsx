import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

export const Dayjs = () => {
  const dnes = dayjs();
  const dnesNaformatovano = dnes.format('DD. MM. YYYY');
  const stedryDen = dayjs('2024-12-24');
  const zbyvaDoVanoc = stedryDen.diff(dnes, 'day');
  const galavecer = dayjs('2024-06-20');
  const zbyvaDoGalavecera = galavecer.diff(dnes, 'day');

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size="lg">Dnes je {dnesNaformatovano}.</Heading>
        </CardHeader>
        <Divider color="yellow.500"/>
        <CardBody>
          <Stack spacing="4">
            <Box>
              <Text pt="2" fontSize="lg">
                Do Vánoc zbývá ještě {zbyvaDoVanoc} dní.
              </Text>
            </Box>
            <Box>
              <Text pt="2" fontSize="lg">
                Do Galavečera DA web zbývá ještě {zbyvaDoGalavecera} dní.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};
