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
const {voted, skipped} = State.projects

//TODO componentWillMount
//TODO use ProjectCard.Card
export default class BudgetSummary extends Component {
    constructor(props) {
        super(props)
        this.width = props.width
        this.height = props.height
    }
    onPressSlide(index) {
        console.log(index)
    }

    render() {
        return (
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
                    <View key={card.id}
                          style={{
                              width: this.width,
                              height: 300,
                              backgroundColor: '#aaa',
                          }}>
                        <Image style={styles.thumbnail} source={card.image}/>
                        <Text style={styles.text}>{card.caption}</Text>
                    </View>
                ).concat(skipped.map(card =>
                    <View key={card.id}
                          style={{
                              width: this.width,
                              height: 300,
                              backgroundColor: '#aaa',
                          }}>
                        <Image style={styles.thumbnail} source={card.image}/>
                        <Text style={styles.text}>{card.caption}</Text>
                    </View>
                ))}
            </Carousel>
        )
    }
}

const styles = StyleSheet.create({
    width: 300,
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
