import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import ProjectCards from './ProjectCards'
import BudgetSummary from './BudgetSummary'
import {Scene, Router} from 'react-native-router-flux'

class ParticipatoryBudgeting extends Component {
    render() {
        return <Router>
            <Scene key="root">
                <Scene key="home" component={ProjectCards} title="Spend budget"/>
                <Scene key="login" component={BudgetSummary} title="Budget Outcome"/>
            </Scene>
        </Router>
    }
}

// TODO use flex
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
})

AppRegistry.registerComponent('ParticipatoryBudgeting', () => ParticipatoryBudgeting)
