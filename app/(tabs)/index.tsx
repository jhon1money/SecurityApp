import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Audio from "expo-av";
import { useSQLiteContext } from "expo-sqlite";

type Incident = {
    fecha: string;
    titulo: string;
    descripcion: string;
    foto: string;
    audio: string;
    id?: number;
};

type Mode = "Create" | "Update";

const Index = () => {
    const db = useSQLiteContext();

    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [mode, setMode] = useState<Mode>("Create");

    const [incidentInfo, setIncidentInfo] = useState<Incident>({
        fecha: "",
        titulo: "",
        descripcion: "",
        foto: "",
        audio: ""
    });

    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        async function createUserTable() {
            await db.execAsync(
                "CREATE TABLE IF NOT EXISTS incidents (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, titulo TEXT, descripcion TEXT, foto TEXT, audio TEXT);"
            );
        }
        createUserTable();
    }, []);

    const handleInputChange = (name: keyof Incident, value: string) => {
        setIncidentInfo({ ...incidentInfo, [name]: value });
    };

    const addValues = async () => {
        const { fecha, titulo, descripcion, foto, audio } = incidentInfo;
        try {
            await db.runAsync(
                `INSERT INTO incidents(fecha, titulo, descripcion, foto, audio) VALUES (?, ?, ?, ?, ?)`,
                [fecha, titulo, descripcion, foto, audio]
            );
            const incidentes = await db.getAllAsync<Incident>(`SELECT * FROM incidents`);
            console.log("all incidents", incidentes);
            setIncidents(incidentes);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Agregar Incidencia</Text>
            <TextInput
                style={styles.input}
                placeholder="Fecha"
                placeholderTextColor="#750E21"
                value={incidentInfo.fecha}
                onChangeText={(text) => handleInputChange('fecha', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#750E21"
                value={incidentInfo.titulo}
                onChangeText={(text) => handleInputChange('titulo', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#750E21"
                value={incidentInfo.descripcion}
                onChangeText={(text) => handleInputChange('descripcion', text)}
            />

            <TouchableOpacity style={styles.button} onPress={addValues}>
                <Text style={styles.buttonText}>Agregar Incidencia</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F1E5D1',
    },
    button: {
        backgroundColor: '#0C0C0C', 
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        margin: 10,
        padding: 5,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#191919',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
});

export default Index;
