import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import {
    AnamnesesRecordsScreen, AnamnesisDetailScreen,
    JournalsScreen,
    ListSubitemsScreen, ListScreen, TextInputScreen,
    LoadingScreen, CreateTabBarIcon
} from '../Screens';
import AnamnesisFormCoordinator from './AnamnesisFormCoordinator';
import AppStyle from '../styles';

//
// ANAMNESE
//

// FORM
const AnamnesisForm = createStackNavigator({
    // uma entrada para o coordinator (rota inicial)
    Coordinator: AnamnesisFormCoordinator,

    // demais entradas para os tipos de telas do form (entrada de texto, listagem fechada, ...)
    TextInput: TextInputScreen,
    List: ListScreen,
    SubitemsList: ListSubitemsScreen
}, {
    initialRouteName: "Coordinator",
    defaultNavigationOptions: {
        headerBackTitle: "Voltar",
        headerTintColor: AppStyle.colors.main,
        headerTitleStyle: {
            color: AppStyle.colors.darkText
        },
        headerStyle: {
            borderBottomWidth: 0
        }
    }
})

// TAB
const AnamnesisTab = createStackNavigator({
    AnamnesesRecords: AnamnesesRecordsScreen,
    AnamnesisDetail: AnamnesisDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            borderBottomWidth: 0
        }
    }
});

AnamnesisTab.navigationOptions = {
    title: "Ficha",
    tabBarIcon: CreateTabBarIcon(require("../Resources/anamnesesTabBarIcon.png"))
}

//
// DIÁRIO
//

// TAB
const JournalsTab = createStackNavigator({
    JournalsHistory: JournalsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            borderBottomWidth: 0
        }
    }
});

JournalsTab.navigationOptions = {
    title: "Diário",
    tabBarIcon: CreateTabBarIcon(require("../Resources/journalsTabBarIcon.png"))
}

//
// APP
//

const TabNavigator = createBottomTabNavigator({
    Anamnesis: AnamnesisTab,
    Journals: JournalsTab,
    // TODO: exames
}, {
    tabBarOptions: {
        activeTintColor: AppStyle.colors.main
    }
});

// todo o app está dentro de um stack navigator para ter a animação e comportamento do botão
// "Voltar" corretos quando abre um fluxo de cadastro/edição (anamnese, exames ou diário)
// se não fizer isso, quando o usuário navegar para um fluxo de cadastro/edição, a tabbar
// continuaria sendo exibida por cima das telas desses fluxos
const AppNavigator = createStackNavigator({
    // a primeira rota é a tabbar do app
    Main: TabNavigator,

    // as demais são os fluxos de cadastro/edição
    AnamnesisForm: AnamnesisForm,

    // tela de carregamento
    Loading: LoadingScreen
}, {
    // esconder header e apresentar com animação de modal (de baixo para cima)
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Main",
    transparentCard: true
});

export default createAppContainer(AppNavigator);
