import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

interface ServiceProps {
  text: string;
  onPress: () => void;
}

export default function Service(props: ServiceProps) {
  return (
    <Pressable style={styles.containaer} onPress={props.onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <View style={styles.circleContainer}>
        <Text style={styles.circle}>&#x276F;</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  containaer: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
    borderRadius: 8,
    padding: 21,
    height: 142,
    backgroundColor: '#fff',
  },
  textContainer: { width: '95%' },
  text: {
    lineHeight: 20,
  },
  circleContainer: {
    height: 110,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  circle: {
    height: 13,
    width: 13,
    fontSize: 8,
    borderRadius: 25,
    color: '#fff',
    backgroundColor: '#000',
    textAlign: 'center',
  },
});
