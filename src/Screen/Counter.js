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
    AsyncStorage,
    FlatList
} from 'react-native';

import { colors } from '../Constant/Color'

import Header from '../Components/Header'

import Icon from 'react-native-vector-icons/Ionicons';


export default class Counter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            meterReading: 0,
            SNumber: 0,
            answer: null,
            First: 5,
            Second: 8,
            Third: 10,
            newArray: [],
            History: [],
            isHistory: false,
        }
    }

    componentDidMount = async () => {
        try {
            const data1 = await AsyncStorage.getItem('First');
            const data2 = await AsyncStorage.getItem('Second');
            const data3 = await AsyncStorage.getItem('Third');
            if (data1 !== null && data2 !== null && data3 !== null) {
                this.setState({ First: JSON.parse(data1), Second: JSON.parse(data2), Third: JSON.parse(data3) });
            }
            const History = await AsyncStorage.getItem(this.props.route.params.id.toString());
            if (History !== null) {
                this.setState({ History: JSON.parse(History) });
            }
        } catch (error) {
            console.log(error)
        }
    }

    SaveHistory = async () => {
        try {
            const value = await AsyncStorage.getItem(this.props.route.params.id.toString());
            if (value !== null) {
                const item = {
                    id: this.props.route.params.id,
                    Result: this.state.answer,
                    Date: new Date()
                }
                var dummy = JSON.parse(value)

                try {
                    await AsyncStorage.removeItem(this.props.route.params.id.toString());
                }
                catch (exception) {
                    console.log("exception", exception)
                }
                dummy.push(item);
                AsyncStorage.setItem(this.props.route.params.id.toString(), JSON.stringify(dummy));
                Alert.alert("Saved")
            }
            else {
                const Array = this.state.newArray.slice();
                const item = {
                    id: this.props.route.params.id,
                    Result: this.state.answer,
                    Date: new Date()
                }
                console.log(item)
                Array.push(item)
                console.log("else", Array)
                AsyncStorage.setItem(this.props.route.params.id.toString(), JSON.stringify(Array));
            }
        } catch (error) {
            console.log(error)
        }
    }

    Result = async () => {
        this.setState({ answer: null })
        if (this.state.meterReading == 0 && this.state.SNumber == 0) {
            Alert.alert('Fill the form')
        }
        else if (Number(this.state.meterReading) && Number(this.state.SNumber) && (this.state.SNumber.toString()).length === 10) {
            if (this.state.meterReading <= 100) {
                let Count = this.state.First * this.state.meterReading;
                this.setState({ answer: Count }, () => this.SaveHistory())
            } else if (this.state.meterReading >= 100 && this.state.meterReading < 500) {
                let Count = this.state.First * 100;
                Count = Count + (this.state.Second * (this.state.meterReading - 100))
                this.setState({ answer: Count }, () => this.SaveHistory())
            } else if (this.state.meterReading >= 500) {
                let Count = this.state.First * 100;
                Count = Count + (this.state.Second * 400);
                Count = Count + (this.state.Third * (this.state.meterReading - 500))
                this.setState({ answer: Count }, () => this.SaveHistory())
            }
        }
        else {
            Alert.alert('Wrong Input')
        }
    }

    History = () => {
        console.log('working')
        this.setState({ isHistory: !this.state.isHistory })
    }

    render() {
        return (
            <View style={styles.Container}>
                <Header isHistory={this.state.isHistory} ShowHistory={this.History} history={this.props.route.params.id} navigation={this.state.navigation} Result={this.state.answer} />
                <View style={{ paddingVertical: 10 }} />

                {this.state.isHistory ? (
                    <FlatList
                        data={this.state.History}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Counter', item)} style={styles.ItemBtn}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.Address}>
                                            <Icon style={{ marginRight: 10 }} name='md-cash' size={15} color={colors.primary} />
                                            <Text style={styles.Title}>{item.Result}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: colors.gray, fontSize: 8 }}>{item.Date}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={styles.Body}>
                                <View style={styles.Input}>
                                    <TextInput
                                        // style={{ flex: 1 }}
                                        placeholder="Current meter reading"
                                        keyboardType='numeric'
                                        onChangeText={text => this.setState({ meterReading: text })}
                                    />
                                </View>
                                <View style={styles.Input}>
                                    <TextInput
                                        // style={{ flex: 1 }}
                                        placeholder="Service Number (Max 10)"
                                        keyboardType='numeric'
                                        maxLength={10}
                                        onChangeText={text => this.setState({ SNumber: text })}
                                    />
                                </View>

                                <TouchableOpacity onPress={this.Result} style={styles.btn}>
                                    <Text style={styles.btnText}>Result</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView >
                    )
                }

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
    item: {
        marginHorizontal: 20,
        marginVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.primary,
        paddingBottom: 16
    },
    Address: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    ItemBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Title: {
        fontSize: 17,
        fontWeight: 'bold'
    }

});
