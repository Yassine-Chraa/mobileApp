import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native"
import { Tache } from "../types/Tache";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const AddTache = ({ navigation }: any) => {
    const [tache, setTache] = useState<Tache>({
        titre: "",
        description: "",
        done: false
    })

    const ajouter = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('taches');
            let taches = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (taches !== null) {
                taches = [...taches, { ...tache, id: taches.length  + 2 }];
            } else {
                taches = [{ ...tache, id: 1 }];
            }
            const updatedValue = JSON.stringify(taches);
            await AsyncStorage.setItem('taches', updatedValue);

            navigation.navigate('home');

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={{ marginTop: 24, marginHorizontal: 12 }}>
            <Text style={{
                fontSize: 32,
                color: '#22092C',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 24
            }}>Add Tache</Text>
            <View>
                <TextInput
                    style={{ backgroundColor: '#DED0B6', marginBottom: 12, borderRadius: 3 }}
                    placeholderTextColor={'#000'}
                    placeholder="Titre"
                    value={tache.titre}
                    onChangeText={(v) => setTache((prev: Tache) => {
                        return { ...prev, titre: v }
                    })} />

                <TextInput placeholder="Description" value={tache.description}
                    style={{ backgroundColor: '#DED0B6', marginBottom: 12, borderRadius: 3 }}
                    placeholderTextColor={'#000'}
                    onChangeText={(v) => setTache((prev: Tache) => {
                        return { ...prev, description: v }
                    })} />

                <Button title="ajouter" onPress={ajouter} />
            </View>
        </View>
    )
}

export default AddTache;