import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

type Incident = {
  id: number;
  fecha: string;
  titulo: string;
  descripcion: string;
  foto: string;
  audio: string;
};

const Listado = () => {
  const db = useSQLiteContext();
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const result = await db.getAllAsync<Incident>(`SELECT * FROM incidents`);
        setIncidents(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIncidents();
  }, []);

  const renderItem = ({ item }: { item: Incident }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.fecha}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.titulo}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}>Título</Text>
        <Text style={styles.headerText}>Descripción</Text>
        
      </View>
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1E5D1',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#EEEDEB',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#0C0C0C',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0C0C0C',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
  },
});

export default Listado;
