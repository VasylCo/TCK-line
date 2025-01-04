import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FormSelectProps<T extends { [key: string]: any }> {
  title: string;
  selectedValue: number;
  values: T[];
  idName: string;
  nameName: string;
  onChange: (itemValue: number) => void;
  error?: string;
}

export default function FormSelect<T extends { [key: string]: any }>(props: FormSelectProps<T>) {
  return (
    <>
      <Text style={styles.label}>{props.title}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={props.selectedValue}
          placeholder="Оберіть область"
          style={styles.picker}
          onValueChange={(itemValue) => {
            props.onChange(itemValue);
          }}
          enabled={props.values.length > 1}
        >
          {props.values.map((value, index) => (
            <Picker.Item
              key={value[props.idName] || index}
              label={value[props.nameName]}
              value={value[props.idName]}
            />
          ))}
        </Picker>
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 500,
  },
  input: {
    height: 46,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgb(149, 148, 133)',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 56,
    width: '100%',
    backgroundColor: 'transparent',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
  },
});
