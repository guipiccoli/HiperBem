import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View } from "react-native";

/**
 * @author Pâmela Mendonça, Felipe Boff, Gabriel Sutério, Ardel Junior 
 * @param emoji String do emoji
 * @param text Descrição do emoji
 *  
 * 
 * Uso do StyleSheet: StyleSheet.create({ ... });
 * 
 * Exemplo de uso: <CardEmojiComponent text="Raiva" emoji=":)"/>
 */

export default class CardEmojiComponent extends Component {
    render(){
        return (
            <TouchableOpacity style={styles.shadow}>
                <View>
                    <Text style={styles.centerEmoji}> {this.props.emoji} </Text>
                    <Text style={styles.centerText}> {this.props.text} </Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles=StyleSheet.create({
    shadow:{
        shadowColor: '#000', 
        borderColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 2,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#fff",
        margin: 5
    },
    centerText:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        padding: 16
    },
    centerEmoji:{
        textAlign: "center",
        fontSize: 50,
        paddingBottom: "8%",
        padding: 16
    },
})