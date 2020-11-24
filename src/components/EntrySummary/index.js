import React from 'react';
import {View, StyleSheet} from 'react-native';

import Container from '../Core/Container';

import EntrySummaryChart from './EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList';

import useBalanceSumByCategory from '../../hooks/useBalanceSumByCategory';

const EntrySummary = ({days = 7, onPressActionButton}) => {
  const [balanceSum] = useBalanceSumByCategory();

  return (
    <Container
      title="Categorias"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver Mais"
      onPressActionButton={onPressActionButton}>
      <View style={styles.inner}>
        <EntrySummaryChart data={balanceSum} />
        <EntrySummaryList data={balanceSum} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

export default EntrySummary;
