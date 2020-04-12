/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Alert,
    AsyncStorage
} from 'react-native';

import { colors } from '../Constant/Color'

import Header from '../Components/Header'

import Icon from 'react-native-vector-icons/Ionicons';


export default class Counter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            First: null,
            Second: null,
            Third: null,
            ChangeFirst: null,
            ChangeSecond: null,
            ChangeThird: null,
            refresh: false,
        }
    }

    componentDidMount = async () => {
        const data1 = await AsyncStorage.getItem('First');
        const data2 = await AsyncStorage.getItem('Second');
        const data3 = await AsyncStorage.getItem('Third');
        if (data1 !== null && data2 !== null && data3 !== null) {
            console.log("-----item", JSON.parse(data1, data2, data3))
            this.setState({ First: JSON.parse(data1), Second: JSON.parse(data2), Third: JSON.parse(data3) });
        }

    }

    Configure = async () => {
        if (this.state.ChangeFirst && this.state.ChangeFirst != this.state.First) {
            console.log(this.state.First)
            try {
                AsyncStorage.removeItem('First');
                AsyncStorage.setItem('First', JSON.stringify(this.state.ChangeFirst));
                Alert.alert("Saved1")
                this.setState({ refresh: !this.state.refresh })

            } catch (error) {
                console.log(error)
            }
        }
        if (this.state.ChangeSecond && this.state.ChangeSecond != this.state.Second) {
            try {
                AsyncStorage.removeItem('Second');
                AsyncStorage.setItem('Second', JSON.stringify(this.state.ChangeSecond));
                Alert.alert("Saved2")
                this.setState({ refresh: !this.state.refresh })

            } catch (error) {
                console.log(error)
            }
        }
        if (this.state.ChangeThird && this.state.ChangeThird != this.state.Third) {
            try {
                AsyncStorage.removeItem('Third');
                AsyncStorage.setItem('Third', JSON.stringify(this.state.ChangeThird));
                Alert.alert("Saved3")
                this.setState({ refresh: !this.state.refresh })

            } catch (error) {
                console.log(error)
            }
        }

    }



    render() {
        return (
            <View style={styles.Container}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.Body}>
                        <Text style={styles.Title}>1-100 units</Text>
                        <View style={styles.Input}>
                            <TextInput
                                placeholder={this.state.First + ' Rs. /unit'}
                                keyboardType='numeric'
                                onChangeText={text => this.setState({ ChangeFirst: text })}
                            />
                        </View>
                        <Text style={styles.Title}>101 – 500 units</Text>
                        <View style={styles.Input}>
                            <TextInput
                                placeholder={this.state.Second + ' Rs. /unit'}
                                keyboardType='numeric'
                                onChangeText={text => this.setState({ ChangeSecond: text })}
                            />
                        </View>
                        <Text style={styles.Title}>> 500 units</Text>
                        <View style={styles.Input}>
                            <TextInput
                                placeholder={this.state.Third + ' Rs. /unit'}
                                keyboardType='numeric'
                                onChangeText={text => this.setState({ ChangeThird: text })}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.Configure()} style={styles.btn}>
                            <Text style={styles.btnText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.white
    },
    Body: {
        marginHorizontal: 20,
        marginVertical: 40,
        flex: 1,
    },
    Input: {
        borderWidth: 1,
        borderColor: colors.background,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    btn: {
        backgroundColor: colors.background,
        marginTop: 40,
        borderRadius: 10,
        paddingVertical: 14
    },
    btnText: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center'
    },
    Result: {
        position: 'absolute',
        top: 0
    },
    Title: {
        marginLeft: 5,
        fontWeight: 'bold',
        marginTop: 10
    }

});
