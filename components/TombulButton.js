import React from 'react';
import {View, Button, TouchableOpacity, StyleSheet, Text, ActivityIndicator} from 'react-native';
import * as WebBrowser from "expo-web-browser";


export default class TombulButton extends React.Component {
     openInBrowser = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        // setResult(result);
    };

    render() {
        return (
            <View style={{alignItems: 'center'}}>
                {this.props.loading ? (<ActivityIndicator/>) : (
                <TouchableOpacity onPress={this.props.link ? this.props.link : this.props.url ? ()=>this.openInBrowser(this.props.url) : this.props.onPress}
                                  activeOpacity={0.6}
                                  style={styles.touchable}>
                    <View
                        style={[styles.touchableView, this.props.style, {backgroundColor: this.props.color ? this.props.color : '#3D7FBF'}]}>
                        {this.props.icon && <Text>{this.props.icon} </Text>}
                        <Text {...this.props} style={styles.text}/>
                    </View>
                </TouchableOpacity>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    touchableView: {
        // borderStyle: 'solid',
        //borderColor: '#ccc',
        //borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        padding: 5,
        backgroundColor: '#3D7FBF',
        textAlign: 'center',
        flex: 1,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        shadowColor: "#888",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,

        elevation: 1,
        height: 56,
        maxHeight: 56
    },
    text: {
        color: '#fff',
        fontFamily: 'Oxygen',
        fontSize: 16,
        paddingHorizontal: 15,
        textAlign: 'center'
    }
});
