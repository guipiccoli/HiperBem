import React, { Component } from 'react';
import { Alert } from 'react-native';
import { HeaderButtonComponent } from '../Components';
import CreateCancelAlert from './CreateCancelAlert';
import { TextInputScreen } from '../Screens';
import { frequencyCodes } from '../Utils/frequencies';
import * as InputProducers from '../Utils/InputProducers';
import * as OutputFilters from '../Utils/OutputFilters';
import database from '../Database/Firebase';

export default class JournalEntryFormCoordinator extends Component {

    constructor(props) {
        super(props);

        this.journalEntry = props.navigation.getParam("journalEntry", {});

        // objetos que geram as entradas para as listagens no formato esperado
        this.inputProducers = {
            textInput: new InputProducers.TextInputInputProducer(),
            closedList: new InputProducers.ClosedListInputProducer(),
            subitemList: new InputProducers.SubitemListInputProducer()
        }

        // objetos que mapeiam as saídas das telas para formatos predefinidos
        this.outputFilters = {
            textInput: new OutputFilters.TextInputOutputFilter(),
            closedList: new OutputFilters.ClosedListOutputFilter(),
            subitemList: new OutputFilters.SubitemListOutputFilter()
        };

        this.defaultStressLevel = ["Baixo", "Médio", "Alto"];
        this.defaultSymptoms = ["Dor de cabeça", "Cansaço", "Falta de ar", "Desânimo", "Náusea", "Dor no peito"];
    }

    render (){
        const saveResult = (result) => {
            this.journalEntry.bloodPressure = result;
            this.props.navigation.setParams({ hasData: true });
        }

        const data = {
            callout: "Pressão Arterial",
            placeholder: "00/00 mmHg",
            progress: 0.20,
            required: true,
            content: this.journalEntry.bloodPressure,
            onComplete: composeSavePush(saveResult, this.pushStressLevel)
        }
        return (<TextInputScreen {...data}/>);
    }

    pushStressLevel = () => {
        const saveResult = (result) => {
            this.journalEntry.stressLevel = result;
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultStressLevel, this.journalEntry.stressLevel);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Nível de Stress",
            list: items,
            width: 0.4, //barra de progresso
            onComplete: composeSavePush(saveResult, this.pushSymptoms)
        })
    }

    pushSymptoms = () => {
        const saveResult = (result) => {
            this.journalEntry.symptoms = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected(this.defaultSymptoms, this.journalEntry.symptoms);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Sintomas",
            list: items,
            minSelected: 1,
            width: 0.6,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.pushMedicines),
        })
    }

    pushMedicines = () => {
        const saveResult = (result) => {
            this.journalEntry.medicines = this.outputFilters.closedList.allSelected(result);
        }

        const items = this.inputProducers.closedList.multipleSelected([], this.journalEntry.medicines);

        this.props.navigation.push("List", {
            ...this.defaultParams,
            titleText: "Medicamentos",
            list: items,
            minSelected: 1,
            width: 0.8,
            hasInput: true,
            onComplete: composeSavePush(saveResult, this.endFlow),
        })
    }

    endFlow = () => {
        this.journalEntry.creationDate = new Date();

        // const save = database.saveAnamnesis(this.getParam("userId"), this.anamnesisRecord)
        //     .then(() => this.props.navigation.navigate("Main"))
        //     .catch(() => {
        //         return { title: "Algo deu errado", description: "Tente novamente mais tarde." }
        //     })

        // this.props.navigation.push("Loading", {
        //     operation: save
        // });
    }
}

const composeSavePush = (save, push) => (result) => {
    save(result);
    push();
}