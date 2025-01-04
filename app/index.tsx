import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { City, Region, ServiceCenter } from '@/dataObjects/interfaces';
import {
  getCities,
  getOrganisationGuid,
  getRegions,
  getServiceCentersByCity,
} from '@/api/requests';
import FormSelect from '@/components/FormSelect';

const validationSchema = Yup.object().shape({
  region: Yup.number().required("Обов'язково").positive("Обов'язково").integer("Обов'язково"),
  city: Yup.number().required("Обов'язково").positive("Обов'язково").integer("Обов'язково"),
  serviceCenter: Yup.number()
    .required("Обов'язково")
    .positive("Обов'язково")
    .integer("Обов'язково"),
});

export default function Index() {
  const [regions, setRegions] = React.useState<Region[]>([
    { name: 'Оберіть область', regionId: 0 },
  ]);
  const [cities, setCities] = React.useState<City[]>([{ name: 'Оберіть місто', cityId: 0 }]);
  const [serviceCenters, setServiceCenters] = React.useState<ServiceCenter[]>([
    {
      serviceCenterId: 0,
      building: '',
      cityId: 0,
      cityName: '',
      regionId: 0,
      regionName: '',
      serviceCenterName: 'Оберіть ТЦК',
      street: '',
    },
  ]);
  const [modalVisible, setModalVisible] = React.useState(false);

  async function handleRegions() {
    const id = await getOrganisationGuid();
    await AsyncStorage.setItem('organisationId', id);
    const regions = await getRegions(id);
    if (regions) setRegions([{ name: 'Оберіть область', regionId: 0 }, ...regions]);
  }

  async function handleCities(region: number) {
    const cities = await getCities(region.toString());
    if (cities) setCities([{ name: 'Оберіть місто', cityId: 0 }, ...cities]);
  }

  async function handleServiceCenters(city: number) {
    const serviceCenters = await getServiceCentersByCity(city);
    if (serviceCenters)
      setServiceCenters([
        {
          serviceCenterId: 0,
          building: '',
          cityId: 0,
          cityName: '',
          regionId: 0,
          regionName: '',
          serviceCenterName: 'Оберіть ТЦК',
          street: '',
        },
        ...serviceCenters,
      ]);
  }

  useEffect(() => {
    handleRegions();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Formik
        initialValues={{ region: 0, city: 0, serviceCenter: 0 }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.info}>Інформація</Text>
            </Pressable>
            <Text style={styles.title}>Вибір ТЦК</Text>
            <FormSelect
              title="Область"
              selectedValue={values.region}
              onChange={(itemValue) => {
                setFieldValue('region', itemValue);
                handleCities(itemValue);
              }}
              values={regions}
              idName="regionId"
              nameName="name"
              error={(touched.region && errors.region) || ''}
            />

            <FormSelect
              title="Місто"
              selectedValue={values.city}
              onChange={(itemValue) => {
                setFieldValue('city', itemValue);
                handleServiceCenters(itemValue);
              }}
              values={cities}
              idName="cityId"
              nameName="name"
              error={(touched.city && errors.city) || ''}
            />

            <FormSelect
              title="ТЦК і СП"
              selectedValue={values.serviceCenter}
              onChange={(itemValue) => {
                setFieldValue('serviceCenter', itemValue);
              }}
              values={serviceCenters}
              idName="serviceCenterId"
              nameName="serviceCenterName"
              error={(touched.serviceCenter && errors.serviceCenter) || ''}
            />

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => handleSubmit()}
              textColor="black"
              buttonColor="rgb(253, 137, 10)"
            >
              Далі до е-Черги
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
});
