/* eslint-disable react-hooks/exhaustive-deps */
import React, {createRef, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Button,
  Div,
  Host,
  Icon,
  Input,
  Overlay,
  Portal,
  Snackbar,
  SnackbarRef,
  Text,
} from 'react-native-magnus';
import AddTask, {Task} from '../component/addtask';
import Header from '../component/header';
import Body from '../component/body';
import encryptedDetails from '../util/storage';
import {getTask, setTasks} from '../store/features/task';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const snackbarRef = createRef<SnackbarRef | any>();

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const task: Task[] = useSelector(getTask);
  const [isOverlay, setIsOverlay] = useState(false);
  const [tas, setTas] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState({icon: '', color: ''});

  async function getItems() {
    let res = await encryptedDetails.getSingleItem('tasks');
    let answer = JSON.parse(res);
    console.log(answer);
    if (answer === null) {
      console.log(answer);
      setTas([]);
      return dispatch(setTasks([]));
    }
    setTas(answer);
    return dispatch(setTasks(answer));
  }

  useEffect(() => {
    getItems();
    return () => {
      getItems();
    };
  }, [isFocused]);

  useEffect(() => {
    if (search !== '') {
      let searchTask: Task[] = tas.filter(item =>
        item.todo.toLowerCase().includes(search.toLowerCase()),
      );
      dispatch(setTasks(searchTask));
    } else {
      dispatch(setTasks(tas));
    }
  }, [search]);

  function changeText(val: string) {
    console.log(search, val);
    setSearch(val);
  }

  //this is the view for the home screen, it has both the empty state and the list of todos.
  return (
    <Host>
      <View style={styles.container}>
        <View style={styles.body}>
          <Header />
          <Input
            placeholder="Search..."
            p={10}
            focusBorderColor="blue700"
            borderWidth={4}
            color="black"
            fontSize={18}
            value={search}
            onChangeText={changeText}
          />
          <Body task={task} />
        </View>
        <Button
          onPress={() => setIsOverlay(true)}
          position="absolute"
          bottom={0}
          right={10}
          p="none"
          bg="white"
          justifyContent="flex-end"
          mb={32}
          rounded="2xl"
          w={60}
          h={60}>
          <Text color={'black'} fontSize={36} fontWeight="400">
            +
          </Text>
        </Button>
        <Overlay
          onBackdropPress={() => setIsOverlay(false)}
          visible={isOverlay}
          bg="#363636"
          py={20}
          w={'90%'}>
          <AddTask
            close={() => setIsOverlay(false)}
            setResponse={setResponse}
            snackbarRef={snackbarRef}
          />
        </Overlay>
        <Portal>
          <Snackbar
            //   onDismiss={() => {}}
            ref={snackbarRef}
            bg={response.color}
            color="white"
            duration={5000}
          />
        </Portal>
      </View>
    </Host>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  body: {
    flex: 1,
    // backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.5,
  },
  texts: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    fontWeight: '400',
  },
});
