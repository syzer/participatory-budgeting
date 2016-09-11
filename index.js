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
import ProjectCards from './ProjectCards'
import BudgetSummary from './BudgetSummary'
import _ from 'lodash'

const allCards = [
    {
        id: 0,
        title: 'Scholarships for high education',
        shortTitle: 'Scholarships',
        cost: 40000,
        description: 'We will use $40,000 USD to provide scholarships to young adults of the neighbourhood, so they can have access to higher education and better job opportunities. In return, the young adults will give back to the neighbourhood social work hours.',
        image: require('./img/education/Neutral.jpg'),
        imageBad: require('./img/education/Bad.jpg'),
        imageGood: require('./img/education/Good.jpg'),
    },
    {
        id: 1,
        title: 'A football field for our kids',
        shortTitle: 'Football',
        cost: 50000,
        description: 'We will use $50,000 USD to build a football field in the neighbourhood so our kids have a safe space to play.',
        image: require('./img/football/Neutral.jpg'),
        imageBad: require('./img/football/Bad.jpg'),
        imageGood: require('./img/football/Good.jpg'),
    },
    {
        id: 2,
        title: 'A healthcare programme for the elderly',
        shortTitle: 'Healthcare',
        cost: 20000,
        description: 'We will use $20,000 USD to build a healthcare programme for the elderly.',
        image: require('./img/health/Neutral.jpg'),
        imageBad: require('./img/health/Bad.jpg'),
        imageGood: require('./img/health/Good.jpg'),
    },
    {
        id: 3,
        title: 'Improve the household conditions',
        shortTitle: 'Houses',
        cost: 80000,
        description: 'We will use $80,000 USD to improve the household conditions of the neighbourhood.',
        image: require('./img/housing/Neutral.jpg'),
        imageBad: require('./img/housing/Bad.jpg'),
        imageGood: require('./img/housing/Good.jpg'),
    },
    {
        id: 4,
        title: 'Building better roads for pedestrians',
        shortTitle: 'Roads',
        cost: 30000,
        description: 'We will use $30,000 to build a road for pedestrians.',
        image: require('./img/roads/Neutral.jpg'),
        imageBad: require('./img/roads/Bad.jpg'),
        imageGood: require('./img/roads/Good.jpg'),
    },
]


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
                component: <ProjectCards
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
                    component: <ProjectCards
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
        paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight
    }
})

AppRegistry.registerComponent('ParticipatoryBudgeting',
    () => ParticipatoryBudgeting)
