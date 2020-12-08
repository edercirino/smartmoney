import {Alert} from 'react-native';

import moment from '../vendors/moment';

import {getRealm} from './Realm';
import firestore from '@react-native-firebase/firestore';

export const getEntries = async (days, category) => {
  let querySnapshot;

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();

    querySnapshot = await firestore()
      .collection('entries')
      .orderBy('entryAt')
      .startAt(date)
      .get();
  } else {
    querySnapshot = await firestore()
      .collection('entries')
      .orderBy('entryAt')
      .get();
  }

  let entries = querySnapshot.docs.map((documentSnapshot) => {
    return {...documentSnapshot.data(), id: documentSnapshot.id};
  });

  if (category && category.id) {
    entries = entries.filter((entry) => entry.category.id === category.id);
  }

  return entries;
};

export const addEntry = async (entry) => {
  // const realm = await getRealm();
  let data = {};

  try {
    data = {
      amount: entry.amount,
      entryAt: entry.entryAt || new Date(),
      description: entry.category.name,
      photo: entry.photo,
      address: entry.address,
      latitude: entry.latitude,
      longitude: entry.longitude,
      isInit: entry.isInit || false,
      category: entry.category,
    };

    await firestore().collection('entries').add(data);
  } catch (error) {
    // console.error('addEntry :: error on save object: ', JSON.stringify(data));
    console.error(error.message);
    Alert.alert('Erro', 'Houve um erro ao salvar os dados de lançamento.');
  }

  return data;
};

export const updateEntry = async (entry) => {
  let data = {};

  try {
    data = {
      amount: entry.amount,
      entryAt: entry.entryAt || new Date(),
      description: entry.category.name,
      photo: entry.photo,
      address: entry.address,
      latitude: entry.latitude,
      longitude: entry.longitude,
      isInit: entry.isInit || false,
      category: entry.category,
    };

    await firestore().collection('entries').doc(entry.id).update(data);
  } catch (error) {
    console.error(error.message);
    Alert.alert('Erro', 'Houve um erro ao atualizar os dados de lançamento.');
  }

  return data;
};

export const deleteEntry = async (entry) => {
  try {
    await firestore().collection('entries').doc(entry.id).delete();
  } catch (error) {
    console.error(error.message);
    Alert.alert('Erro', 'Houve um erro ao deletar um lançamento.');
  }
};
