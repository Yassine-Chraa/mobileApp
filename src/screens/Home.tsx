import { FlatList, Text, Touchable, TouchableOpacity, View } from "react-native"
import { Tache } from "../types/Tache"
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { fetchTachesFromDB } from "../api";

const Home = ({ navigation }: any) => {
    const [value,setValue]= useState(false);
    const [taches, setTaches] = useState<Array<Tache>>([]);

    const fetchFromDB = async ()=>{
        const {data}:any = await fetchTachesFromDB();
        console.log(data);
        setTaches(data);
    }
    const getTaches = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('taches');
            const temp = jsonValue != null ? JSON.parse(jsonValue) : null;
            setTaches(temp);
        } catch (e) {
            console.log(e);
        }
    }
    const toggle = async (done: boolean, id: number) => {

        const jsonValue = await AsyncStorage.getItem('taches');
        let taches = jsonValue != null ? JSON.parse(jsonValue) : null;
       
        if (taches !== null) {
            const index = taches.findIndex((tache: Tache) => {
                return tache.id == id;
            })
            console.log(index)
            taches[index] = { ...taches[index], done }
        }
        const updatedValue = JSON.stringify(taches);
        await AsyncStorage.setItem('taches', updatedValue);
        setValue(!value);
        getTaches();
    }
    const deleteTaches = () => {
        AsyncStorage.clear();
    }

    useFocusEffect(useCallback(() => {
        getTaches();
        //fetchFromDB();
    }, []))
    return (
        <View style={{ marginTop: 24, marginHorizontal: 12 }}>
            <Text
                style={{
                    fontSize: 32,
                    color: '#22092C',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 24
                }}>Taches</Text>
            <FlatList
                data={taches}
                renderItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 4 }}>
                            <Text style={{
                                fontSize: 24,
                                color: '#000',
                                fontWeight: 'bold',
                            }}>{item.id}</Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                fontWeight: '500'
                            }}>Titre: <Text style={{ fontWeight: '300' }}>{item.titre}</Text></Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                fontWeight: '500'
                            }}>Description: <Text style={{ fontWeight: '300' }}>{item.description}</Text></Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                fontWeight: '500'
                            }}>State: <Text style={{ fontWeight: '300' }}>{item.done?"Done": "In progress"}</Text></Text>
                            <CheckBox
                                disabled={false}
                                value={value}
                                onValueChange={(v) => toggle(v, item.id!)}
                            />
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => navigation.navigate('addTache')}
                style={{ marginRight: 'auto', marginLeft: "auto", backgroundColor: '#265073', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}
            >
                <Text style={{ color: '#FDF7E4' }}>Ajouter une nouvelle tache</Text></TouchableOpacity>

        </View>
    )
}

export default Home;