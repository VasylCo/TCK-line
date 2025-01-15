import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { getGroupsAndServices } from '@/api/requests';
import { Services } from '@/dataObjects/interfaces';
import Service from '@/components/Service';

export default function ServiceSelect() {
  const params = useLocalSearchParams();
  const [groupId, setGroupId] = useState(0);
  const [services, setServices] = useState<Services | undefined>(undefined);
  const { serviceCenter } = params;

  async function getServices() {
    setServices(undefined);
    const data = await getGroupsAndServices(+serviceCenter, groupId);
    setServices(data);
  }

  function handleBack() {
    if (groupId === 0) {
      router.push('/');
    } else {
      setGroupId(0);
    }
  }

  useEffect(() => {
    getServices();
  }, [groupId]);
  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.title}>Електронна черга</Text>
      {!!services && (
        <>
          {!!services &&
            services.groups.map((group, i) => (
              <Service
                text={group.description}
                key={group.groupId + i}
                onPress={() => setGroupId(group.groupId)}
              />
            ))}
          {!!services &&
            services.services.map((serv, i) => (
              <Service
                text={serv.description}
                key={serv.groupId + i}
                onPress={() => console.log(serv.groupId)}
              />
            ))}
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={handleBack}
              textColor="black"
              buttonColor="transparent"
            >
              Назад
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E1DFCC',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    marginTop: 50,
    marginBottom: 80,
    width: 150,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
