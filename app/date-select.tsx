import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Picker } from '@react-native-picker/picker';
import { DayWithTimeSlot, TimeSlot } from '@/dataObjects/interfaces';
import { getDaysWithTimeSlots } from '@/api/requests';
import { months } from '@/dataObjects/constants';

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Обов'язково"),
  timeSlot: Yup.string().required("Обов'язково"),
});

export default function DateSelect() {
  const params = useLocalSearchParams();
  const { serviceId, serviceCenter, description } = params;
  const [daysWithTimeSlots, setDaysWithTimeSlots] = React.useState<DayWithTimeSlot[]>([
    {
      datePart: new Date(0),
      isAllowed: true,
      exclude: 0,
      startTime: '00:00:00',
      stopTime: '00:00:00',
      hasScheduleBreak: false,
      breakStartTime: '00:00:00',
      breakStopTime: '00:00:00',
      jobCount: 0,
      allowedJobCount: 0,
      timeSlots: [
        {
          isAllowed: true,
          startTime: '00:00:00',
          stopTime: '00:00:00',
          jobCount: 0,
          allowedJobCount: 0,
        },
      ],
    },
  ]);
  const [day, setDay] = React.useState<Date>(new Date(0));

  async function handleDaysWithTimeslots() {
    const daysWithTimes = await getDaysWithTimeSlots(+serviceCenter, +serviceId);
    if (!!daysWithTimes?.length) {
      setDaysWithTimeSlots([...daysWithTimeSlots, ...daysWithTimes]);
    } else {
      console.log('no result');
    }
  }

  function prepareDayName(date: Date) {
    if (date.getTime() !== new Date(0).getTime()) {
      return `${months[date.getMonth()].toLowerCase()}, ${date.getDate()}`;
    } else {
      return 'Оберіть дату';
    }
  }

  function preparTimeSlotName(slot: TimeSlot) {
    if (slot.startTime === slot.stopTime && slot.stopTime === '00:00:00') {
      return 'Оберіть час';
    } else {
      return `${slot.startTime.slice(0, 5)} - ${slot.stopTime.slice(0, 5)}`;
    }
  }

  function prepareTimeSlots() {
    const targetDay = daysWithTimeSlots.find(
      (d) => new Date(d.datePart).getTime() === day.getTime()
    );
    if (targetDay) {
      return targetDay.timeSlots.filter((slot) => slot.isAllowed);
    } else {
      return [];
    }
  }

  useEffect(() => {
    handleDaysWithTimeslots();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Formik
        initialValues={{ date: new Date(0), timeSlot: '0' }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          const newDate = new Date(values.date);
          newDate.setUTCHours(+values.timeSlot.slice(0, 2));
          newDate.setUTCMinutes(+values.timeSlot.slice(3, 5));
          console.log(newDate);
          /* router.push({
            pathname: '/service-select',
            params: values,
          }); */
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Оберіть дату</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={values.date}
                placeholder="Оберіть дату"
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setFieldValue('date', itemValue);
                  setDay(new Date(itemValue));
                }}
                //enabled={props.values.length > 1}
              >
                {daysWithTimeSlots.map((value, index) => (
                  <Picker.Item
                    key={value.datePart.toString()}
                    label={prepareDayName(new Date(value.datePart))}
                    value={value.datePart}
                  />
                ))}
              </Picker>
            </View>
            {errors.date && <Text style={styles.errorText}>{'error'}</Text>}

            <View style={styles.input}>
              <Picker
                selectedValue={values.timeSlot}
                placeholder="Оберіть час"
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setFieldValue('timeSlot', itemValue);
                }}
                enabled={prepareTimeSlots().length > 1}
              >
                {prepareTimeSlots().map((value, index) => (
                  <Picker.Item
                    key={value.startTime.toString()}
                    label={preparTimeSlotName(value)}
                    value={value.startTime}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.errorText}>{errors.timeSlot}</Text>

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleSubmit()}
              textColor="black"
              buttonColor="rgb(253, 137, 10)"
            >
              Зареєструватись
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E1DFCC',
  },
  formContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  info: {
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 500,
  },
  picker: {
    height: 56,
    width: '100%',
    backgroundColor: 'transparent',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
  },
});
