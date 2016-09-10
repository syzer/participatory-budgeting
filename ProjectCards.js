import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import State from './State'

class Card extends Component {
    render() {
        return (
            <View key={this.props.key || Math.random()} style={styles.card}>
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
        imageBad: './img/EducationProjectAfter.jpg',
        imageGood: './img/EducationProjectBefore.jpg'
    },
    {
        id: 1,
        caption: 'Football is booring, play chess!!',
        image: require('./img/FootballProjectBefore.jpg'),
        imageBad: './img/FootballProjectAfter.jpg',
        imageGood: './img/FootballProjectBefore.jpg'
    },
    {
        id: 2,
        caption: 'Education Projects are awesome!!',
        image: require('./img/HealthProjectBefore.jpg'),
        imageBad: './img/HealthProjectAfter.jpg',
        imageGood: './img/HealthProjectBefore.jpg'
    },
    {
        id: 3,
        caption: 'Hauses everywhere',
        image: require('./img/HousingProjectBefore.jpg'),
        imageGood: './img/HousingProjectBefore.jpg',
        imageBad: './img/HousingProjectBefore.jpg'
    },
    {
        id: 4,
        caption: 'Roads everywhere',
        image: require('./img/RoadProjectBefore.jpg'),
        imageBad: './img/RoadProjectAfter.jpg',
        imageGood: './img/RoadProjectBefore.jpg'
    },
]

export {Card, NoMoreCards}
export default React.createClass({
    getInitialState() {
        return {
            cards: Cards,
            outOfCards: false
        }
    },
    handleYup (card) {
        console.log("yup", card)
        State.projects.voted.push(card)
    },
    handleNope (card) {
        console.log("nope", card)
        State.projects.skipped.push(card)
    },
    cardRemoved (index) {
        console.log(`The index is ${index}`)

        let CARD_REFRESH_LIMIT = 3

        if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
            console.log(`There are only ${this.state.cards.length - index - 1} cards left.`)

            if (!this.state.outOfCards) {
                console.log(`Out of cards`)

                this.setState({
                    cards: this.state.cards,
                    outOfCards: true
                })
            }

        }

    },
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
})

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
