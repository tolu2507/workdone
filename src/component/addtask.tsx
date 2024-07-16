/* eslint-disable react-native/no-inline-styles */
// import categoryServices from '@/service/categoryservice';
import React, {createRef, useEffect, useState} from 'react';
import {Alert, FlatList, Pressable} from 'react-native';
import {Box, Button, Div, Icon, Input, Text} from 'react-native-magnus';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Flag from '../assets/svg/flag.svg';
import Clock from '../assets/svg/clock.svg';
import Category from '../assets/svg/category.svg';
import Send from '../assets/svg/send.svg';
import Tags from '../assets/svg/tag.svg';
import {generateRandomId} from '../util/datehelpers';
import encryptedDetails from '../util/storage';
import {useDispatch, useSelector} from 'react-redux';
import {createTask, getTask, updateTask} from '../store/features/task';

export interface Task {
  todo: string;
  description: string;
  date: string;
  priority: number;
  tags: {name: string; color: string};
  id: string;
  completed: boolean;
}

const AddTask = ({
  close,
  snackbarRef,
  setResponse,
  edit = false,
  editItem,
}: {
  close: () => void;
  setResponse: (val: {icon: string; color: string}) => void;
  snackbarRef: any;
  edit?: boolean;
  editItem?: Task;
}) => {
  const dispatch = useDispatch();
  const task: Task[] = useSelector(getTask);
  const [taskDetails, setTaskDetails] = useState<Task>({
    todo: edit ? editItem!.todo : '',
    description: edit ? editItem!.description : '',
    date: new Date().toISOString(),
    priority: edit ? editItem!.priority : 0,
    tags: {
      name: edit ? editItem!.tags.name : '',
      color: edit ? editItem!.tags.color : '',
    },
    id: edit ? editItem!.id : generateRandomId(12),
    completed: false,
  });
  const [show, setShow] = useState(false);
  const [space, setSpace] = useState<'add' | 'priority' | 'category'>('add');
  const category = [
    {name: 'Grocery', color: '#CCFF80'},
    {name: 'Work', color: '#FF9680'},
    {name: 'Sport', color: '#80FFFF'},
    {name: 'Design', color: '#80FFD9'},
    {name: 'University', color: '#809CFF'},
    {name: 'Social', color: '#FF80EB'},
    {name: 'Music', color: '#FC80FF'},
    {name: 'Health', color: '#80FFA3'},
    {name: 'Movies', color: '#80D1FF'},
    {name: 'Home', color: '#FFCC80'},
    {name: 'House work', color: '#809CFA'},
    {name: 'Chess', color: '#FF80ED'},
  ];
  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    console.log('A date has been picked: ', date);
    setTaskDetails({...taskDetails, date: date.toISOString()});
    hideDatePicker();
  };

  const handleClick = async () => {
    if (taskDetails.todo) {
      console.log('this is the task details ', taskDetails);
      let data: Task[] = [taskDetails, ...task];
      console.log('this is the task data ', data);
      dispatch(createTask(taskDetails));
      await encryptedDetails.setItems('tasks', data);
      setTaskDetails({
        todo: '',
        description: '',
        date: new Date().toISOString(),
        priority: 0,
        tags: {name: '', color: ''},
        id: generateRandomId(12),
        completed: false,
      });
      close();
      if (snackbarRef.current) {
        setResponse({icon: 'checkcircle', color: 'green700'});
        snackbarRef.current.show(
          'Successfully added the task to the task list',
        );
      }
    } else {
      setResponse({icon: 'closecircle', color: 'red700'});
      if (snackbarRef.current) {
        snackbarRef.current.show(
          'Failed, please ensure all details are complete filled before procceding',
        );
      }
    }
  };

  const handleEdit = async () => {
    if (taskDetails.todo) {
      console.log('this is the task data ', taskDetails);
      dispatch(updateTask(taskDetails));
      let response = task.map(item => {
        if (item.id === taskDetails.id) {
          return taskDetails;
        } else {
          return item;
        }
      });
      console.log(response);
      await encryptedDetails.setItems('tasks', response);
      close();
      if (snackbarRef.current) {
        setResponse({icon: 'checkcircle', color: 'green700'});
        snackbarRef.current.show(
          'Successfully added the task to the task list',
        );
      }
    } else {
      setResponse({icon: 'closecircle', color: 'red700'});
      if (snackbarRef.current) {
        snackbarRef.current.show(
          'Failed, please ensure all details are complete filled before procceding',
        );
      }
    }
  };

  //this is the different modal when adding a task

  return (
    <Div>
      {space === 'add' && (
        <Div>
          <Text
            mb={20}
            fontSize="2xl"
            fontWeight="400"
            color="white"
            letterSpacing={0.5}>
            {edit ? 'Edit Task' : 'Add Task'}
          </Text>
          <Input
            mb={20}
            placeholder="Enter task to be done .."
            focusBorderColor="white"
            placeholderTextColor="#fff"
            fontSize={18}
            color="white"
            bg="transparent"
            borderWidth={0.7}
            value={taskDetails.todo}
            onChangeText={(val: string) =>
              setTaskDetails({...taskDetails, todo: val})
            }
          />
          <Input
            mb={20}
            placeholder="Description"
            focusBorderColor="white"
            placeholderTextColor="#fff"
            fontSize={18}
            color="white"
            bg="transparent"
            borderWidth={0.7}
            value={taskDetails.description}
            onChangeText={(val: string) =>
              setTaskDetails({...taskDetails, description: val})
            }
          />
          <Div flexDir="row" justifyContent="space-between" alignItems="center">
            <Div flexDir="row" alignItems="center">
              <Button
                onPress={showDatePicker}
                bg="transparent"
                rounded="circle">
                <Clock width={22} height={22} />
              </Button>
              <Button
                onPress={() => setSpace('category')}
                bg="transparent"
                rounded="circle">
                <Tags width={22} height={22} />
              </Button>
              <Button
                onPress={() => setSpace('priority')}
                bg="transparent"
                rounded="circle">
                <Flag width={22} height={22} />
              </Button>
            </Div>
            <Button
              bg="transparent"
              rounded="circle"
              onPress={edit ? handleEdit : handleClick}>
              <Send width={22} height={22} />
            </Button>
          </Div>
        </Div>
      )}

      {space === 'priority' && (
        <Div maxH={600}>
          <Div borderBottomColor="white" borderBottomWidth={1} pb={16}>
            <Text
              color="white"
              textAlign="center"
              fontSize={20}
              lineHeight={24}>
              {edit ? 'Edit Task Priority' : 'Task Priority'}
            </Text>
          </Div>
          <Div py={16}>
            <FlatList
              numColumns={3}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              renderItem={({item}) => (
                <Pressable
                  style={{flex: 1}}
                  onPress={() =>
                    setTaskDetails({...taskDetails, priority: item})
                  }>
                  <Box
                    bg={taskDetails.priority === item ? '#8687E7' : '#272727'}
                    rounded={'lg'}
                    p={24}
                    flex={1}
                    mx={6}
                    alignItems="center">
                    <Flag width={22} height={22} />
                    <Text
                      color="white"
                      textAlign="center"
                      fontSize={18}
                      mt={12}>
                      {item}
                    </Text>
                  </Box>
                </Pressable>
              )}
              contentContainerStyle={{
                justifyContent: 'space-between',
                gap: 10,
              }}
              style={{}}
            />
          </Div>
          <Div flexDir="row" alignItems="center">
            <Button
              flex={1}
              mt="lg"
              ml="lg"
              px="xl"
              py="lg"
              bg="transparent"
              color="#8687E7"
              onPress={() => {
                setTaskDetails({...taskDetails, priority: 0});
                setSpace('add');
              }}>
              Cancel
            </Button>
            <Button
              flex={1}
              mt="lg"
              ml="lg"
              px="xl"
              py="lg"
              bg="#8687E7"
              color="white"
              onPress={() => {
                if (taskDetails.priority !== 0) {
                  setSpace('add');
                } else {
                  Alert.alert('Missing data ', 'please enter a valid priority');
                }
              }}>
              Save
            </Button>
          </Div>
        </Div>
      )}

      {space === 'category' && (
        <Div maxH={700}>
          <Div borderBottomColor="white" borderBottomWidth={1} pb={16}>
            <Text
              color="white"
              textAlign="center"
              fontSize={20}
              lineHeight={24}>
              {edit ? 'Edit Category' : 'Choose Category'}
            </Text>
          </Div>
          <Div py={16}>
            <FlatList
              numColumns={3}
              data={category}
              renderItem={({item}) => (
                <Pressable
                  style={{flex: 1}}
                  onPress={() =>
                    setTaskDetails({
                      ...taskDetails,
                      tags: {name: item.name, color: item.color},
                    })
                  }>
                  <Box
                    bg={
                      item.name === taskDetails.tags.name ? 'white' : item.color
                    }
                    rounded={'lg'}
                    p={24}
                    flex={1}
                    mx={6}
                    alignItems="center">
                    <Category width={32} height={32} />
                    <Text
                      numberOfLines={1}
                      color="black"
                      textAlign="center"
                      fontSize={16}
                      mt={12}>
                      {item.name}
                    </Text>
                  </Box>
                </Pressable>
              )}
              contentContainerStyle={{
                justifyContent: 'space-between',
                gap: 10,
              }}
            />
          </Div>
          <Div flexDir="row" alignItems="center">
            <Button
              flex={1}
              mt="lg"
              ml="lg"
              px="xl"
              py={18}
              bg="#8687E7"
              color="white"
              onPress={() => {
                if (taskDetails.tags.name !== '') {
                  setSpace('add');
                } else {
                  Alert.alert('Missing data ', 'please enter a valid category');
                }
              }}>
              Add Category
            </Button>
          </Div>
        </Div>
      )}

      <DateTimePickerModal
        isVisible={show}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={new Date()}
      />
    </Div>
  );
};

export default AddTask;
