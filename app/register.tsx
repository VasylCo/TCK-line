import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Обов'язково"),
  lasName: Yup.string().required("Обов'язково"),
  middleName: Yup.string().required("Обов'язково"),
  phoheNumber: Yup.string()
    .required("Обов'язково")
    .matches(/^(\+?1-?)?(\d{3})?[-. ]?\d{3}[-. ]?\d{4}$/, 'Некоректний формат'),
  email: Yup.string().required("Обов'язково").email('Некоректний формат'),
});

export default function Register() {
  const params = useLocalSearchParams();
  const { groupId, serviceCenter, description } = params;

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView style={styles.mainContainer}>
      <Formik
        initialValues={{ firstName: '', lasName: '', middleName: '', phoheNumber: '', email: '' }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          console.log(groupId);
          console.log(serviceCenter);
          /* router.push({
            pathname: '/service-select',
            params: values,
          }); */
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.info}>Інформація</Text>
            </Pressable>
            <Text style={styles.title}>{description}</Text>
            <Text style={styles.inputText}>Ім'я</Text>
            <TextInput
              placeholder="Ім'я"
              style={styles.input}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              keyboardType="default"
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <Text style={styles.inputText}>Прізвище</Text>
            <TextInput
              placeholder="Прізвище"
              style={styles.input}
              onChangeText={handleChange('lasName')}
              onBlur={handleBlur('lasName')}
              value={values.lasName}
              keyboardType="default"
            />
            {touched.lasName && errors.lasName && (
              <Text style={styles.error}>{errors.lasName}</Text>
            )}
            <Text style={styles.inputText}>По батькові</Text>
            <TextInput
              placeholder="По бвтькові"
              style={styles.input}
              onChangeText={handleChange('middleName')}
              onBlur={handleBlur('middleName')}
              value={values.middleName}
              keyboardType="default"
            />
            {touched.middleName && errors.middleName && (
              <Text style={styles.error}>{errors.middleName}</Text>
            )}
            <Text style={styles.inputText}>Номер телефону</Text>
            <TextInput
              placeholder="Номер телефону"
              style={styles.input}
              onChangeText={handleChange('phoheNumber')}
              onBlur={handleBlur('phoheNumber')}
              value={values.phoheNumber}
              keyboardType="phone-pad"
            />
            {touched.phoheNumber && errors.phoheNumber && (
              <Text style={styles.error}>{errors.phoheNumber}</Text>
            )}
            <Text style={styles.inputText}>Електронна адреса</Text>
            <TextInput
              placeholder="Електронна адреса"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleSubmit()}
              textColor="black"
              buttonColor="rgb(253, 137, 10)"
            >
              Підтвердити
            </Button>
            <Button
              mode="outlined"
              style={{ ...styles.button }}
              onPress={() => router.back()}
              textColor="black"
              buttonColor="transparent"
            >
              Назад
            </Button>
          </View>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={{ width: '100%' }} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ textAlign: 'right' }}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Вітаємо!</Text>
            <Text style={styles.modalText}>
              Тут ви можете зручно та легко записатись в електронну чергу до ТЦК та СП.
            </Text>
            <Text style={styles.modalText}>Без зайвих клопотів та довгого очікування.</Text>
            <Text style={styles.modalText}>
              1. Виберіть ТЦК та СП, в якому ви перебуваєте на обліку або за місцем вашої актуальної
              реєстрації.
            </Text>
            <Text style={styles.modalText}>
              2. Введіть ваші персональні дані для запису. Підтвердіть номер телефону.
            </Text>
            <Text style={styles.modalText}>
              3. Отримайте повідомлення з датою та часом вашого візиту.
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                mode="outlined"
                style={{ width: 120 }}
                onPress={() => setModalVisible(!modalVisible)}
                textColor="black"
              >
                Закрити
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E1DFCC',
  },
  formContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 50,
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
  inputText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
  },
});
