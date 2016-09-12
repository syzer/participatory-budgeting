import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Navigator
} from 'react-native'
import PickProject from './PickProject'
import BudgetSummary from './BudgetSummary'
import _ from 'lodash'
import {allCards} from './State'

class ParticipatoryBudgeting extends Component {

    constructor() {
        super()
        this.getNavigator = () => null
        this.currentIndex = 0
    }

    onVotingFinished(votes) {
        this.currentIndex++
        const onRetry = () => {
            this.currentIndex++
            const sortedCards = _.shuffle(allCards)
            this.getNavigator().push({
                component: <PickProject
                    cards={sortedCards}
                    onEnd={this.onVotingFinished.bind(this)}/>,
                title: 'Project selection',
                index: this.currentIndex
            })
        }
        this.getNavigator().push({
            component: <BudgetSummary votes={votes}
                                      onRetry={onRetry}/>,
            title: 'Summary',
            index: this.currentIndex
        })
    }

    render() {
        const sortedCards = _.shuffle(allCards)
        return (
            <Navigator
                initialRoute={{
                    component: <PickProject
                        cards={sortedCards}
                        onEnd={this.onVotingFinished.bind(this)}/>,
                    title: 'Project selection',
                    index: 0
                }}
                renderScene={(route, navigator) => {
                    this.getNavigator = () => navigator
                    return (
                        <View style={styles.mainContainer}>
                            {route.component}
                        </View>)
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: () => null,
                            RightButton: () => null,
                            Title: route => <Text>{route.title}</Text>
                        }}
                    />}
            />)
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 0
    }
})

AppRegistry.registerComponent('ParticipatoryBudgeting',
    () => ParticipatoryBudgeting)
