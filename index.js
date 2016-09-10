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

class ParticipatoryBudgeting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ProjectCards/>
                <BudgetSummary width={300} height={300}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})

AppRegistry.registerComponent('ParticipatoryBudgeting', () => ParticipatoryBudgeting)
