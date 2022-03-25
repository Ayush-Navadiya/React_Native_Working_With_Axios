import React from 'react';
import {StyleSheet, ScrollView, ImageBackground, View} from 'react-native';
import { Button, Divider, Icon, Input, Layout, TopNavigationAction, Radio, Text, RadioGroup } from '@ui-kitten/components';
import axios from "axios";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useValidation } from 'react-native-form-validator';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

export const AddUserScreen = ({ navigation }) => {

    const [fname, setfname] = React.useState('');
    const [lname, setlname] = React.useState('');
    const [phone_no, setphone_no] = React.useState('');
    const [email, setemail] = React.useState('');
    const [city, setcity] = React.useState('');
    const [address,setaddress] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    var gender = '';


    const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid  } = useValidation({
        state: { fname, lname, phone_no, email, city, address },
    });



    if(selectedIndex == 0)
    {
        gender = 'm';
    } else if(selectedIndex == 1)
    {
        gender = 'f';
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const adduser = () => {
        validate({
            fname: {required: true},
            lname: {required: true},
            email: {email: true},
            city: {required: true},
            address: {required: true},
            phone_no: { required: true, max:13},
        });

        if(isFormValid()) {
            axios({
                method: "post",
                url: "http://192.168.29.233:3000/api/user-new",
                data: {"fname": fname,"lname": lname,"mno": phone_no,"email": email,"city": city,"address": address,"gender": gender},
                cache: false,
                processData: false,
                contentType: false,
            }).then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                    console.log("User Added Successfully");
                    navigation.navigate('viewUser');
                } else {
                    alert("Something went wrong");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} style={{backgroundColor: '#D89489'}}/>
    );

    return (
        <ImageBackground source={require('../assets/authbg.png')} resizeMode="cover" style={styles.image}>
            <SafeAreaProvider style={{ flex: 1}}>
                <ScrollView style={{height: '100%'}}>
                    <Divider/>
                    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
                        <Layout style={[styles.container, {marginTop: 30}]} level='1'>
                            <Input
                                style={{flex: 1,marginRight: 2, backgroundColor: '#fff6',}}
                                value={fname}
                                placeholder='First name'
                                placeholderTextColor="#606060"
                                onChangeText={setfname}
                                caption={isFieldInError('fname') ? (
                                    <View style={styles.captionContainer}>
                                        <Text style={styles.captionText}>Invalid First Name</Text>
                                    </View>
                                ) : ( <></> )
                                }
                            />
                            <Input
                                style={{flex: 1, marginLeft: 2, backgroundColor: '#fff6',}}
                                value={lname}
                                placeholder='Last Name'
                                placeholderTextColor="#606060"
                                onChangeText={setlname}
                                caption={ isFieldInError('lname') ? (
                                    <View style={styles.captionContainer}>
                                        <Text style={styles.captionText}>Invalid Last Name</Text>
                                    </View> ) : ( <></> )
                                }
                            />
                        </Layout>
                        <Input
                            placeholder='Phone no'
                            value={phone_no}
                            onChangeText={setphone_no}
                            style={styles.input}
                            placeholderTextColor="#606060"
                            caption={isFieldInError('phone_no') ? (
                                <View style={styles.captionContainer}>
                                    <Text style={styles.captionText}>Invalid Phone no</Text>
                                </View> ) : (<></>)
                            }
                        />
                        <Input
                            placeholder='Mail'
                            value={email}
                            onChangeText={setemail}
                            style={styles.input}
                            placeholderTextColor="#606060"
                            caption={isFieldInError('email') ? (
                                <View style={styles.captionContainer}>
                                    <Text style={styles.captionText}>Invalid Email Id</Text>
                                </View> ): ( <></> )
                            }
                        />
                        <Input
                            placeholder='City'
                            value={city}
                            onChangeText={setcity}
                            style={styles.input}
                            placeholderTextColor="#606060"
                            caption={isFieldInError('city') ? (
                                <View style={styles.captionContainer}>
                                    <Text style={styles.captionText}>Invalid City</Text>
                                </View> ) : ( <></> )
                            }
                        />
                        <Input
                            placeholder='Address'
                            value={address}
                            onChangeText={setaddress}
                            style={styles.input}
                            placeholderTextColor="#606060"
                            caption={isFieldInError('address') ? (
                                <View style={styles.captionContainer}>
                                    <Text style={styles.captionText}>Invalid Address</Text>
                                </View> ) : ( <></> )
                            }
                        />
                        <RadioGroup
                            selectedIndex={selectedIndex}
                            onChange={index => setSelectedIndex(index)} style={styles.container}>
                            <Radio><Text style={styles.text}>Male</Text></Radio>
                            <Radio><Text style={styles.text}>Female</Text></Radio>
                        </RadioGroup>
                        <Button style={{marginTop: 25, paddingHorizontal: 30}} onPress={adduser} size="large">Add Customer</Button>
                    </Layout>
                </ScrollView>
            </SafeAreaProvider>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        margin: 1,
        color: '#fff'
    },
    input: {
        margin: 10,
        marginHorizontal: 30,
        backgroundColor: '#fff6',
        color: '#ffffff'
    },
    container: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#ff3333",
    },
});