/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {createRef, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {
  Button,
  Div,
  Host,
  Overlay,
  Text,
  Portal,
  Snackbar,
  SnackbarRef,
  Tag,
  Box,
} from 'react-native-magnus';
import AddTask, {Task} from '../component/addtask';
import Close from '../assets/svg/close.svg';
import Edit from '../assets/svg/edit.svg';
import Flag from '../assets/svg/flag.svg';
import Clock from '../assets/svg/clock.svg';
import Delete from '../assets/svg/delete.svg';
import Tags from '../assets/svg/tag.svg';
import Editbox from '../component/editbox';
import {convertUTCToLocal} from '../util/datehelpers';
import {useSelector} from 'react-redux';
import {getTask} from '../store/features/task';
import encryptedDetails from '../util/storage';
import DeleteComponent from '../component/deletecomponent';

const snackbarRef = createRef<SnackbarRef | any>();

const DetailsScreen = ({navigation, route}: any) => {
  const task: Task[] = useSelector(getTask);
  const [isOverlay, setIsOverlay] = useState({status: false, passer: 'edit'});
  const [response, setResponse] = useState({icon: '', color: ''});
  const {item}: {item: Task} = route.params;
  let dat = new Date(item.date);
  let {time} = convertUTCToLocal(dat);

  {
    /* this is the function to delete the item from the local storage and redux */
  }

  async function deleted(id: string) {
    let resp = task.filter(items => items.id !== id);
    console.log(resp);
    await encryptedDetails.setItems('tasks', resp);
    setIsOverlay({status: false, passer: 'delete'});
    if (snackbarRef.current) {
      setResponse({icon: 'checkcircle', color: 'green700'});
      snackbarRef.current.show(
        'Successfully deleted the task from the task list',
      );
    }
    return navigation.navigate('Home');
  }

  {
    /* this is the function to mark a task as completed */
  }
  async function completed(id: string) {
    let resp = task.map(items => {
      if (items.id === id) {
        return {...items, completed: true};
      } else {
        return items;
      }
    });
    console.log(resp);
    await encryptedDetails.setItems('tasks', resp);
    if (snackbarRef.current) {
      setResponse({icon: 'checkcircle', color: 'green700'});
      snackbarRef.current.show(
        'Successfully resolved the task to the task list',
      );
    }
    return navigation.navigate('Home');
  }

  //this is the screen view for the individual task details

  return (
    <Host>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.input}>
            <Div>
              <Close
                onPress={() => navigation.goBack()}
                width={45}
                height={45}
              />

              <Div mt={20}>
                <Div
                  flexDir="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Text color="white" fontSize={30} lineHeight={34}>
                    {item.todo}
                  </Text>
                  <Edit
                    onPress={() =>
                      setIsOverlay({...isOverlay, status: true, passer: 'edit'})
                    }
                    width={60}
                    height={60}
                  />
                </Div>
                <Text color="#afafaf" fontSize={20} lineHeight={24}>
                  {item.description}
                </Text>
              </Div>

              <Editbox
                title={'Task Time :'}
                value={time}
                icon={<Clock width={30} height={30} />}
              />
              <Editbox
                title={'Task Category :'}
                value={item.tags.name}
                icon={<Tags width={30} height={30} />}
              />
              <Editbox
                title={'Task Priority :'}
                value={item.priority + ''}
                icon={<Flag width={30} height={30} />}
              />

              <View style={{marginTop: 32}}>
                <Delete
                  onPress={() =>
                    setIsOverlay({...isOverlay, status: true, passer: 'delete'})
                  }
                  width={150}
                  height={50}
                />
              </View>
            </Div>
          </View>

          {!item.completed && (
            <Button
              onPress={() => completed(item.id)}
              w={'100%'}
              mt="lg"
              px="xl"
              py={20}
              bg="#8687E7"
              color="white"
              underlayColor="#8687E7">
              Mark as completed
            </Button>
          )}
        </View>
        <Overlay
          onBackdropPress={
            isOverlay.passer === 'edit'
              ? () => setIsOverlay({status: false, passer: 'edit'})
              : () => setIsOverlay({status: false, passer: 'delete'})
          }
          visible={isOverlay.status}
          bg="#363636"
          py={20}
          w={'90%'}>
          {isOverlay.passer === 'edit' ? (
            <AddTask
              close={() => setIsOverlay({status: false, passer: 'edit'})}
              setResponse={setResponse}
              snackbarRef={snackbarRef}
              edit={true}
              editItem={item}
            />
          ) : (
            <DeleteComponent
              item={item}
              action={deleted}
              cancel={() => setIsOverlay({status: false, passer: 'delete'})}
            />
          )}
        </Overlay>
        <Portal>
          <Snackbar
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

export default DetailsScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  body: {
    flex: 1,
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
