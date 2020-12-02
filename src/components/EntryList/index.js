import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Container from '../Core/Container';
import EntryListItem from './EntryListItem';

import useEntries from '../../hooks/useEntries';

const EntryList = ({days = 7, category, onEntryPress, onPressActionButton}) => {
  const [entries] = useEntries(days, category);

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
