import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import State from './State'
import {Actions} from 'react-native-router-flux'

class Card extends Component {
    render() {
        return (
            <View key={this.props.id} style={styles.card}>
                <Image style={styles.thumbnail} source={this.props.image}/>
                <Text style={styles.text}>{this.props.caption}</Text>
            </View>
        )
    }
}

class NoMoreCards extends Component {
    render() {
        return (
            <View style={styles.noMoreCards}>
                <Text>No more cards</Text>
            </View>
        )
    }
}

const Cards = [
    {
        id: 0,
        caption: 'Education Projects are awesome!!',
        image: require('./img/EducationProjectBefore.jpg'),
        imageGood: require('./img/EducationProjectAfter.jpg'),
    },
    {
        id: 1,
        caption: 'Football is booring, play chess!!',
        image: require('./img/FootballProjectBefore.jpg'),
        imageGood: require('./img/FootballProjectAfter.jpg'),
    },
    {
        id: 2,
        caption: 'Education Projects are awesome!!',
        image: require('./img/HealthProjectBefore.jpg'),
    },
    {
        id: 3,
        caption: 'Hauses everywhere',
        image: require('./img/HousingProjectBefore.jpg'),
        imageGood: require('./img/HousingProjectAfter.jpg'),
    },
    {
        id: 4,
        caption: 'Roads everywhere',
        image: require('./img/RoadProjectBefore.jpg'),
        imageGood: require('./img/RoadProjectAfter.jpg'),
    },
]

export {Card, NoMoreCards}
export default class ProjectCards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: Cards,
            outOfCards: false
        }
        this.cardRemoved = this.cardRemoved.bind(this)
    }

    handleYup (card) {
        console.log("yup", card)
        State.projects.voted.push(card)
    }

    handleNope (card) {
        console.log("nope", card)
        State.projects.skipped.push(card)
    }

    cardRemoved (index) {
        console.log(`The index is ${index}`)

        let cardsInDeck = 5 - index - 1
        if (!cardsInDeck) {
            if (!this.state.outOfCards) {
                this.setState({
                    cards: this.state.cards,
                    outOfCards: true
                })
            }
            Actions.outcome()
        }
    }

    render() {
        return (
            <SwipeCards
                cards={this.state.cards}
                loop={false}

                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={true}
                showNope={true}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                cardRemoved={this.cardRemoved}
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
        elevation: 1,
    },
    thumbnail: {
        flex: 1,
        width: 300,
        height: 300,
    },
    text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
