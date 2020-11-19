import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Container from '../Core/Container';
import EntryListItem from './EntryListItem';

import {getEntries} from '../../services/Entries';

const EntryList = ({days = 7, onEntryPress, onPressActionButton}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data);
    }

    loadEntries();

    console.log('EntryList :: useEffect');
  }, []);

  return (
    <View style={styles.container}>
      <Container
        title="Últimos Lançamentos"
        actionLabelText={`Últimos ${days} dias`}
        actionButtonText="Ver mais"
        onPressActionButton={onPressActionButton}>
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <EntryListItem
              entry={item}
              isFirstItem={index === 0}
              isLastItem={index === entries.lenght - 1}
              onEntryPress={onEntryPress}
            />
          )}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
});

export default EntryList;
