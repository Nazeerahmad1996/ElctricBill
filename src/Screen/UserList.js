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
    Image,
    Alert,
    FlatList
} from 'react-native';

import { colors } from '../Constant/Color'

import Header from '../Components/Header'

import Icon from 'react-native-vector-icons/Ionicons';
const axios = require('axios');


export default class Home extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }


    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                console.log(response);
                this.setState({ user: response.data });
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('User list fetching error')
            });
    }

    render() {
        return (
            <View style={styles.Container}>
                <Header />
                <View style={{paddingVertical:10}}>
                    <FlatList
                        data={this.state.user}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Counter', item)} style={styles.ItemBtn}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.Title}>{item.name}</Text>
                                        <View style={styles.Address}>
                                            <Icon style={{ marginRight: 10 }} name='ios-pin' size={15} color={colors.primary} />
                                            <Text style={{ color: colors.gray }}>{item.address.street}, {item.address.suite}</Text>
                                        </View>
                                    </View>
                                    <Icon style={{ marginRight: 10 }} name='ios-arrow-forward' size={18} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.white,
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
