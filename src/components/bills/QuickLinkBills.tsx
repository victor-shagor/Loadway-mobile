import { View, Text } from 'react-native'
import React from 'react';
import SectionTitle from './SectionTitle';
import BillsFlatList from './BillsFlatList';
import { SectionTitleProps } from './SectionTitle';
import { QuicklinkProps } from "@src/constants/data";

const QuickLinkBills = ({title, data}:{title: SectionTitleProps, data: QuicklinkProps[]}) => {
  return (
    <View>
        <SectionTitle title={title} />
        <BillsFlatList data={data} />
    </View>
  )
}

export default QuickLinkBills;