import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import Card from './card';
import {Task} from './addtask';
import Empty from '../assets/svg/empty.svg';

export default function Body({task}: {task: Task[]}) {
  return (
    <Div flex={1} mt={20}>
      {task.length > 0 ? (
        <FlatList
          data={task}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={(it, index) => it.todo + index}
        />
      ) : (
        <Div
          flex={1}
          justifyContent="center"
          alignItems="center"
          flexDir="column">
          {/*  eslint-disable-next-line react-native/no-inline-styles */}
          <Empty width={300} height={300} style={{marginBottom: 32}} />
          <Text style={styles.text}>What do you want to do today</Text>
          <Text style={styles.text}>Tap + to add your tasks</Text>
        </Div>
      )}
    </Div>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.5,
  },
});
