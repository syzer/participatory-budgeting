import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import Carousel from 'react-native-spring-carousel'
import {Card} from './ProjectCards'
import State from './State'
import {RetryButton, ShareButton} from './Buttons'

const {voted, skipped} = State.projects

export default class BudgetSummary extends Component {
    constructor(props) {
        super(props)
        this.width = props.width || 400
        this.height = props.height || 300
    }

    onPressSlide(index) {
        console.log(index)
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    width={this.width}
                    height={this.height}
                    pagerColor="#000"
                    activePagerColor="#ff0000"
                    pagerSize={10}
                    pagerOffset={10}
                    pagerMargin={2}
                    speed={2000}
                    onPress={this.onPressSlide}
                >
                    {voted.map(card =>
                        <Card key={card.id} outcome="good" {...card}/>
                    ).concat(skipped.map(card =>
                        <Card key={card.id} image={card.image} {...card}/>
                    ))}
                </Carousel>
                <RetryButton/>
                <ShareButton/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
