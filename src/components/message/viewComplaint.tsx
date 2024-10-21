import { appColors } from '@src/constants/colors';
import { timestampDisplay } from '@src/utils/helper';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';

const TimelineItem = ({ status, response, timestamp }:any) => {
    const { formattedDate, formattedTime } = timestampDisplay(timestamp);
    return(
  <View style={styles.itemContainer}>
    <View style={styles.itemDotContainer}>
      <View style={styles.circle} />
      <View style={styles.verticalLine} />
    </View>
    <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center'}}>
    <View style={{marginLeft: 10}}>
      <Text style={styles.title}>{status}</Text>
      <Text style={styles.description}>{response}</Text>
    </View>
    <View style={{alignItems: 'flex-end', marginRight: 50}}>
    <Text style={styles.time}>{formattedDate}</Text>
    <Text style={[styles.time, {color: appColors.black}]}>{formattedTime}</Text>
    </View>
    </View>
    
  </View>)
};

const ViewComplaint = ({complaint}:any)=> {
  return (
    <ScrollView style={styles.container}>
      <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 50}}>
        {complaint?.title}
      </Text>
      {complaint?.statusHistory?.map((item:any, index:number) => (
        <TimelineItem
          key={index}
          status={item.status}
          response={item.response}
          timestamp={item.timestamp}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 40,
    marginTop: 10,
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemDotContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'red',
  },
  itemContent: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: 600,
  },
  description: {
    fontSize: 11,
    width: 250,
  },
  time: {
    fontSize: 12,
    color: 'grey',
  }
});


export default ViewComplaint;