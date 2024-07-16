import React from 'react';
import {Div, Tag, Text} from 'react-native-magnus';

const Editbox = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) => {
  return (
    <Div
      mt={20}
      flexDir="row"
      justifyContent="space-between"
      alignItems="center">
      <Div flexDir="row" alignItems="center">
        {icon}
        <Text ml={10} color="white" fontSize={24} lineHeight={28}>
          {title}
        </Text>
      </Div>
      <Tag bg={'#ffffff66'} py={12} px={24} color="white">
        {value}
      </Tag>
    </Div>
  );
};

export default Editbox;
