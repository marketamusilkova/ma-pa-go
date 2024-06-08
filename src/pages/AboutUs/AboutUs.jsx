import './AboutUs.css';
import a from './1.jpg';
import b from './2.jpg';
import c from './3.jpg';
import d from './4.jpg';
import e from './5.jpg';
import f from './6.jpg';
import g from './7.jpg';
import h from './8.jpg';
import { Img, Text } from '@chakra-ui/react';

export const AboutUs = () => {
  return (
    <div className="background_aboutus">
      <div className="img_container1">
        <Img src={a} className="img" />
        <Img src={b} className="img" />
        <Img src={c} className="img" />
        <Img src={d} className="img" />
      </div>
      <Text>
        Jsme dvě mámy, Markéta a Pavlína, se spoustou energie, zálibou ve čtení,
        sportu, cestování a programování...
      </Text>
      <div className="img_container2">
        <Img src={e} className="img" />
        <Img src={f} className="img" />
        <Img src={g} className="img" />
        <Img src={h} className="img" />
      </div>
    </div>
  );
};
