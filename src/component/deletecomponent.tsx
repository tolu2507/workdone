import React from 'react';
import {Button, Div, Text} from 'react-native-magnus';
import {Task} from './addtask';

const DeleteComponent = ({
  item,
  cancel,
  action,
}: {
  item: Task;
  action: (val: string) => void;
  cancel: () => void;
}) => {
  return (
    <Div maxH={600}>
      <Div borderBottomColor="white" borderBottomWidth={1} pb={16}>
        <Text color="white" textAlign="center" fontSize={20} lineHeight={24}>
          Delete Task
        </Text>
      </Div>
      <Div py={16}>
        <Text textAlign="center" color="white" fontSize={20}>
          Are You sure you want to delete this task?
        </Text>
        <Text textAlign="center" color="white" fontSize={20}>
          Task title : {item.todo}
        </Text>
      </Div>
      <Div flexDir="row" alignItems="center">
        <Button
          flex={1}
          mt="lg"
          ml="lg"
          px="xl"
          py="lg"
          bg="transparent"
          color="red700"
          onPress={cancel}>
          Cancel
        </Button>
        <Button
          flex={1}
          mt="lg"
          ml="lg"
          px="xl"
          py="lg"
          bg="red700"
          color="white"
          onPress={() => action(item.id)}>
          Delete
        </Button>
      </Div>
    </Div>
  );
};

export default DeleteComponent;
