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
    AsyncStorage,
} from 'react-native';

import { colors } from '../Constant/Color'

import Header from '../Components/Header'

import Icon from 'react-native-vector-icons/Ionicons';


export default class Home extends React.Component {

    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('First');
        if (!data) {
            try {
                AsyncStorage.setItem('First', JSON.stringify(5));
                AsyncStorage.setItem('Second', JSON.stringify(8));
                AsyncStorage.setItem('Third', JSON.stringify(10));
            } catch (error) {
                console.log(error)
            }
        }

    }

    render() {
        return (
            <View style={styles.Container}>
                <Header />
                <View style={styles.Body}>
                    <View style={styles.FirstRow}>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Configure')} style={styles.itemClick}>
                                <Icon name='ios-options' size={45} color={colors.primary} />
                                <Text style={styles.itemTitle}>Configuration</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserList')} style={styles.itemClick}>
                                <Icon name='ios-list' size={45} color={colors.primary} />
                                <Text style={styles.itemTitle}>USER LIST</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    FirstRow: {
        flexDirection: 'row'
    },
    itemTitle: {
        fontSize: 12,
        color: colors.primary,
        marginTop: 5
    },
    item: {
        flex: 1,
        alignItems: 'center',
    },
    itemClick: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        width: 110,
        height: 110,
        borderRadius: 15,
        borderTopRightRadius: 50
    }
});
