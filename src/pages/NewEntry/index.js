import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel';

import {saveEntry} from '../../services/Entries';

const NewEntry = ({navigation}) => {
  const currentBalance = 2064.35;

  const entry = navigation.getParam('entry', {
    id: null,
    amount: '0.00',
    entryAt: new Date(),
  });

  const [amount, setAmount] = useState(`${entry.amount}`);

  const save = () => {
    const data = {
      amount: parseFloat(amount), //converting to float using parseFloat
    };
    console.log('NewEntry :: save ', data);
    saveEntry(data, entry);
  };

  return (
    <View style={styles.container}>
      <BalanceLabel currentBalance={currentBalance} />

      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
        <TextInput style={styles.input} />
        <Button title="GPS" />
        <Button title="Câmera" />
      </View>

      <View>
        <Button title="Adicionar" onPress={save} />
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default NewEntry;
