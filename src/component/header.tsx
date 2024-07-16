import React from 'react';
import {Avatar, Div, Text} from 'react-native-magnus';
import Logo from '../assets/svg/icon.svg';

export default function Header() {
  return (
    <Div row mt={12} mb={32} flexDir="row" alignItems="center">
      <Logo width={50} height={50} />
      <Div h={40} flex={1} mx="md" alignItems="center" justifyContent="center">
        <Text color="white" fontSize={24} fontWeight="700">
          Todo App
        </Text>
      </Div>
      <Avatar
        size={50}
        bg="white"
        shadow={1}
        source={{
          uri: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133887.jpg?t=st=1721145816~exp=1721149416~hmac=615d4d69fa30dbc148ea5ab497f58a741160cc0058c3d3c85c6c2e684d664d8e&w=1480',
        }}
      />
    </Div>
  );
}
