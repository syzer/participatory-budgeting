import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import Carousel from 'react-native-spring-carousel'
import State from './State'

const width = 300
const height = 300
const voted = State.projects.voted

export default class BudgetSummary extends Component {

    onPressSlide(index) {
        console.log(index)
    }

    render() {
        return (
            <Carousel
                width={width}
                height={height}
                pagerColor="#000"
                activePagerColor="#ff0000"
                pagerSize={10}
                pagerOffset={10}
                pagerMargin={2}
                speed={2000}
                onPress={this.onPressSlide}
            >

                <View style={{width: width, height: 300, backgroundColor: '#aaa',}}>
                    <Image style={styles.thumbnail} source={voted[0].image}/>
                    <Text style={styles.text}>{this.props.caption}</Text>
                </View>

                <View style={{width: width, height: 300, backgroundColor: '#bbb',}}>
                    <Text>Page 2</Text>
                </View>
                <View style={{width: width, height: 300, backgroundColor: '#ccc',}}>
                    <Text>Page 3</Text>
                </View>
            </Carousel>
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
