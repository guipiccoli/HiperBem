import React, {Component} from 'react';
import { View, TextInput } from "react-native";
import MyLabel from '../Components/myTextComponent';
import DefaultButton from '../Components/defaultButtonComponent';

export default class QuestionContainer extends Component {

    render(){
        
        return (
            <View style={{alignItems:"center"}}>
                <MyLabel text={"Como voce esta se sentindo hoje?"}/>
                <DefaultButton text={"Botão"}  action={this.action}></DefaultButton>
            </View>
        )
    }
}