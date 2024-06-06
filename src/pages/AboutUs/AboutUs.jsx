import './AboutUs.css';
import a from './1.jpg';
import b from './2.jpg';
import c from './3.jpg';
import d from './4.jpg';
import e from './5.jpg';
import f from './6.jpg';
import g from './7.jpg';
import h from './8.jpg';
import { Text } from '@chakra-ui/react';

export const AboutUs = () => {
  return (
    <div className="background_aboutus">
      <div className="img_container1">
        <img src={a} className="img" />
        <img src={b} className="img" />
        <img src={c} className="img" />
        <img src={d} className="img" />
      </div>
      <Text>
        Jsme dvě mámy, Markéta a Pavlína, se spoustou energie, zálibou ve čtení,
        sportu, cestování a programování...
      </Text>
      <div className="img_container2">
        <img src={e} className="img" />
        <img src={f} className="img" />
        <img src={g} className="img" />
        <img src={h} className="img" />
      </div>
    </div>
  );
};
