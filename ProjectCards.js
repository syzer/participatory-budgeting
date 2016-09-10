import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    PanResponder
} from 'react-native'
import State from './State'

const cardStyles = {
    card: {
        alignItems: 'stretch',
        borderRadius: 2,
        backgroundColor: 'white',
        elevation: 2,
        width: 320
    },
    title: {
        padding: 16,
        fontSize: 24,
        lineHeight: 40,
        fontWeight: '700'
    },
    image: {
        width: 320,
        height: 180
    },
    smallImage: {
        width: 160,
        height: 90
    },
    description: {
        padding: 16,
        fontSize: 14,
        lineHeight: 20
    }
};

class Card extends Component {
    render() {
        return (
            <View style={cardStyles.card}>
                <Text style={cardStyles.title}>
                    {this.props.title}
                </Text>
                <Image style={cardStyles.image}
                       source={this.props.imageGood}/>
                <Text style={cardStyles.description}>
                    {this.props.description}
                </Text>
            </View>
        );
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

const allCards = [
    {
        id: 0,
        title: 'Scholarships for high education',
        description: 'We will use $40,000 USD to provide scholarships to young adults of the neighbourhood, so they can have access to higher education and better job opportunities. In return, the young adults will give back to the neighbourhood social work hours.',
        image: require('./img/EducationProjectBefore.jpg'),
        imageGood: require('./img/EducationProjectAfter.jpg'),
    },
    {
        id: 1,
        title: 'A football field for our kids',
        description: 'We will use $40,000 USD to build a football field in the neighbourhood so our kids have a safe space to play.',
        image: require('./img/FootballProjectBefore.jpg'),
        imageGood: require('./img/FootballProjectAfter.jpg'),
    },
    {
        id: 2,
        title: 'A healthcare programme for the elderly',
        description: 'We will use $20,000 USD to build a healthcare programme for the elderly.',
        image: require('./img/HealthProjectBefore.jpg'),
        imageGood: require('./img/HealthProjectAfter.jpg'),
    },
    {
        id: 3,
        title: 'Improve the household conditions',
        description: 'We will use $80,000 USD to improve the household conditions of the neighbourhood.',
        image: require('./img/HousingProjectBefore.jpg'),
        imageGood: require('./img/HousingProjectAfter.jpg'),
    },
    {
        id: 4,
        title: 'Building better roads for pedestrians',
        description: 'We will use $30,000 to build a road for pedestrians.',
        image: require('./img/RoadProjectBefore.jpg'),
        imageGood: require('./img/RoadProjectAfter.jpg'),
    },
];

export {Card, NoMoreCards}
export default class ProjectCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCard: allCards[4],
            pan: new Animated.ValueXY(),
            lifted: false
        };
        this.cardRemoved = this.cardRemoved.bind(this);
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart: () => {
                this.setState({
                    lifted: true
                })
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(
                    this.state.pan,
                    {toValue: {x: 0, y: 0}}
                ).start();
                this.setState({
                    lifted: false
                });
            }
        });
    }

    handleYup(card) {
        console.log("yup", card)
        State.projects.voted.push(card)
    }

    handleNope(card) {
        console.log("nope", card)
        State.projects.skipped.push(card)
    }

    cardRemoved(index) {
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
            <View style={styles.projectContainer}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={this.state.pan.getLayout()}>
                    <Card {...this.state.currentCard}
                          isLifted={this.state.lifted}/>
                </Animated.View>
                <View style={{flex: 1}}/>
                <Text style={styles.selectedLabel}>
                    Selected projects
                </Text>
                {this.state.lifted ? <Text>Lifted</Text> : null}
                <View style={styles.dropContainer}>
                    <View style={styles.dropZone}></View>
                    <View style={styles.dropZone}></View>
                    <View style={styles.dropZone}></View>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    projectContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    dropContainer: {
        flexDirection: 'row',
        height: 132,
        borderRadius: 2,
        paddingTop: 8,
        paddingBottom: 8
    },
    dropZone: {
        borderWidth: 1,
        borderColor: 'black',
        flex: 1
    },
    selectedLabel: {
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
