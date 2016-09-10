import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'

export default React.createClass({
    getInitialState() {
        return {
            cards: Cards,
            outOfCards: false
        }
    },
    handleYup (card) {
        console.log("yup")
    },
    handleNope (card) {
        console.log("nope")
    },
    cardRemoved (index) {
        console.log(`The index is ${index}`)

        let CARD_REFRESH_LIMIT = 3

        if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
            console.log(`There are only ${this.state.cards.length - index - 1} cards left.`)

            if (!this.state.outOfCards) {
                console.log(`Adding ${Cards2.length} more cards`)

                this.setState({
                    cards: this.state.cards.concat(Cards2),
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
