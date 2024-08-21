import { View, Text } from 'react-native'
import React from 'react';
import SectionTitle from './SectionTitle';
import BillsFlatList from './BillsFlatList';
import { HousingBills } from '@src/constants/data';
import { SectionTitleProps } from './SectionTitle';
import { QuicklinkProps } from "@src/constants/data";

const BillsList = ({title, data}:{title: SectionTitleProps, data: QuicklinkProps[]}) => {
  return (
    <View>
        <SectionTitle title={title} />
        <BillsFlatList data={data} />
    </View>
  )
}

export default BillsList;