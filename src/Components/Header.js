import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { colors } from '../Constant/Color'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
    console.log(props.isHistory)
    return (
        <View style={styles.HeaderHome}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            {props.Result && (
                <View style={styles.Result}>
                    <Text style={styles.Result}>Energy Cost: {props.Result}</Text>
                </View>
            )}
            {props.history && (
                <TouchableOpacity onPress={props.ShowHistory} style={{ alignSelf: 'flex-end', marginRight: 30, marginBottom: -32, backgroundColor: colors.primary, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                    <Icon name={props.isHistory ? 'ios-arrow-back' : 'md-time'} size={30} color={colors.background} />
                </TouchableOpacity>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    HeaderHome: {
        backgroundColor: colors.background,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    logo: {
        height: 120,
        width: 120,
    },
    Result: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginVertical: 10
    }
});