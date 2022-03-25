import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Alert } from 'react-native';
import { Icon } from "@ui-kitten/components";
import Spinner from 'react-native-loading-spinner-overlay';

export const ViewUserScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([]);
    const [spinnerState, setSpinnerState] = useState(false);

    useEffect(async () => {
        await axios({
            method: 'get',
            url: "http://192.168.29.233:3000/api/get_users",
        }).then((response) => {
            let obj = response.data;
            console.log(obj);
            if (obj.status === "success") {
                setUsers(obj.data);
                setRefreshing(false);
            } else {
                alert("Something Went Wrong!");
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        axios({
            method: 'get',
            url: "http://192.168.29.233:3000/api/get_users",
        }).then((response) => {
            let obj = response.data;
            console.log(obj);
            if (obj.status === "success") {
                setUsers(obj.data);
                setRefreshing(false);
            } else {
                alert("Something Went Wrong!");
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const addcustomer = () => {
        navigation.navigate('addUser');
    }

    return (
        <ImageBackground source={require('../assets/authbg.png')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={{ flex: 2, backgroundColor: 'transparent'}}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Spinner
                        visible={spinnerState}
                        textContent={'Loading...'}
                        textStyle={{color: '#fff'}}
                    />
                    {users.map((users) => (
                        <TouchableOpacity
                            style={styles.userCard}
                        >
                            <Icon style={styles.userImage} fill='#000' name='person'/>
                            <View style={styles.userCardRight}>
                                <Text
                                    style={{ fontSize: 18, fontWeight: '500', color: '#000' }}
                                >{`${users.fname}` + ' ' + `${users.lname}`}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.noticecard} onPress={addcustomer}>
                        <Text style={styles.noticetext}>Click to add Customer</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 10,
    },
    noticecard: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        backgroundColor: '#fff6',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'
    },
    noticetext: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#3a3a3a'
    },
    userCard: {
        backgroundColor: '#fff6',
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        color: '#fff'
    },
    userCardRight: {
        paddingHorizontal: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});