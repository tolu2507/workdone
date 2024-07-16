import React from 'react';
import {Div, Icon, Tag, Text} from 'react-native-magnus';
import {Task} from './addtask';
import {convertUTCToLocal} from '../util/datehelpers';
import Flag from '../assets/svg/flag.svg';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function moveToScreen(navigation: any, screen: string, option?: {}) {
  return navigation.navigate(screen, option && option);
}

export default function Card({item}: {item: Task}) {
  const navigation = useNavigation();
  let dat = new Date(item.date);
  let {time, date} = convertUTCToLocal(dat);

  return (
    <Pressable
      onPress={() => moveToScreen(navigation, 'Details', {item: item})}>
      <Div
        mb={20}
        justifyContent="space-between"
        flexDir="row"
        rounded={'lg'}
        bg="#363636"
        p={18}>
        <Div>
          <Text color="white" fontSize={16} lineHeight={21} mb={6}>
            {item.todo}
          </Text>
          <Text color="#afafaf" fontSize={14} lineHeight={21}>
            {date} At {time}
          </Text>
        </Div>
        <Div flexDir="column" justifyContent="flex-end">
          <Div flexDir="row">
            <Tag bg={item.tags.color} color="white">
              {item.tags.name + ''}
            </Tag>
            <Tag
              ml={'lg'}
              bg="#363636"
              borderColor="#8687E7"
              borderWidth={1}
              color="white"
              prefix={<Flag width={22} height={22} />}>
              {'  ' + item.priority}
            </Tag>
          </Div>
        </Div>
      </Div>
    </Pressable>
  );
}
