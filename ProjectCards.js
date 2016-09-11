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
    liftedDown: {
        backgroundColor: '#8BC34A'
    },
    liftedUp: {
        backgroundColor: '#D50000'
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
        const outerStyles = [cardStyles.card];
        if (this.props.isLifted) {
            switch (this.props.dragDirection[0]) {
                case 'up':
                    outerStyles.push(cardStyles.liftedUp);
                    break;
                case 'down':
                    outerStyles.push(cardStyles.liftedDown);
                    break;
                default:
                    break;
            }
        }
        let imageSrc = this.props.imageGood;
        if (this.props.isLifted && this.props.dragDirection[0] == 'up') {
            imageSrc = this.props.image;
        }
        return (
            <View style={outerStyles}>
                <Text style={cardStyles.title}>
                    {this.props.title}
                </Text>
                <Image style={cardStyles.image}
                       source={imageSrc}/>
                <Text style={cardStyles.description}>
                    {this.props.description}
                </Text>
            </View>
        );
    }
}

const thumbnailStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },
    image: {
        flex: 1,
        height: 60,
        width: 60,
        alignSelf: 'center'
    }
});

class ThumbnailCard extends Component {
    render() {
        return (
            <View style={thumbnailStyles.container}>
                <Text>{this.props.shortTitle}</Text>
                <Image
                    style={thumbnailStyles.image}
                    source={this.props.imageGood}/>
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
        shortTitle: 'Scholarships',
        cost: 40000,
        description: 'We will use $40,000 USD to provide scholarships to young adults of the neighbourhood, so they can have access to higher education and better job opportunities. In return, the young adults will give back to the neighbourhood social work hours.',
        image: require('./img/EducationProjectBefore.jpg'),
        imageGood: require('./img/EducationProjectAfter.jpg'),
    },
    {
        id: 1,
        title: 'A football field for our kids',
        shortTitle: 'Football',
        cost: 40000,
        description: 'We will use $40,000 USD to build a football field in the neighbourhood so our kids have a safe space to play.',
        image: require('./img/FootballProjectBefore.jpg'),
        imageGood: require('./img/FootballProjectAfter.jpg'),
    },
    {
        id: 2,
        title: 'A healthcare programme for the elderly',
        shortTitle: 'Healthcare',
        cost: 20000,
        description: 'We will use $20,000 USD to build a healthcare programme for the elderly.',
        image: require('./img/HealthProjectBefore.jpg'),
        imageGood: require('./img/HealthProjectAfter.jpg'),
    },
    {
        id: 3,
        title: 'Improve the household conditions',
        shortTitle: 'Houses',
        cost: 80000,
        description: 'We will use $80,000 USD to improve the household conditions of the neighbourhood.',
        image: require('./img/HousingProjectBefore.jpg'),
        imageGood: require('./img/HousingProjectAfter.jpg'),
    },
    {
        id: 4,
        title: 'Building better roads for pedestrians',
        shortTitle: 'Roads',
        cost: 30000,
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
            currentCardIndex: 0,
            pan: new Animated.ValueXY(),
            lifted: false,
            direction: [null, null],
            acceptedCards: [null, null, null],
            totalCost: 0
        };
        this.isTransitioning = false;
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => !this.isTransitioning,
            onPanResponderStart: () => {
                this.setState({
                    lifted: true
                })
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }], {
                listener: (evt, gesture) => {
                    const directions = [null, null];
                    const newState = {
                        direction: directions
                    };
                    if (gesture.dy > 100) {
                        directions[0] = 'down';
                    } else if (gesture.dy < -100) {
                        directions[0] = 'up'
                    } else {
                        directions[0] = null;
                    }
                    if (gesture.dx > 70) {
                        directions[1] = 'right';
                    } else if (gesture.dx < -70) {
                        directions[1] = 'left';
                    } else {
                        directions[1] = 'middle';
                    }
                    let totalCost = this.state.acceptedCards.reduce(
                        (prevVal, card) => card ? prevVal + card.cost : prevVal,
                        0);
                    if (directions[0] == 'down') {
                        totalCost += allCards[this.state.currentCardIndex].cost;
                        if (directions[1] == 'left' && this.state.acceptedCards[0]) {
                            totalCost -= this.state.acceptedCards[0].cost;
                        } else if (directions[1] == 'middle' && this.state.acceptedCards[1]) {
                            totalCost -= this.state.acceptedCards[1].cost;
                        } else if (directions[1] == 'right' && this.state.acceptedCards[2]) {
                            totalCost -= this.state.acceptedCards[2].cost;
                        }
                    }
                    newState.totalCost = totalCost;
                    this.setState(newState);
                }
            }),
            onPanResponderRelease: () => {
                this.isTransitioning = true;
                Animated.spring(
                    this.state.pan,
                    {toValue: {x: 0, y: 0}, velocity: 5, bounciness: 0}
                ).start(() => {
                    this.isTransitioning = false;
                    switch (this.state.direction[0]) {
                        case 'up':
                            this.handleResponse(false);
                            break;
                        case 'down':
                            this.handleResponse(true);
                            break;
                        default:
                            this.setState({
                                lifted: false,
                                direction: [null, null]
                            });
                            break;
                    }
                });
            }
        });
    }

    handleResponse(response) {
        const newState = {
            lifted: false,
            direction: [null, null]
        };
        if (response) {
            const newAcceptedCards = [...this.state.acceptedCards];
            switch (this.state.direction[1]) {
                case 'left':
                    newAcceptedCards[0] = allCards[this.state.currentCardIndex];
                    break;
                case 'middle':
                    newAcceptedCards[1] = allCards[this.state.currentCardIndex];
                    break;
                case 'right':
                    newAcceptedCards[2] = allCards[this.state.currentCardIndex];
                    break;
                default:
                    // Error
                    break;
            }
            newState.acceptedCards = newAcceptedCards;
        }
        if (this.state.currentCardIndex < allCards.length - 1) {
            newState.currentCardIndex = this.state.currentCardIndex + 1;
        }
        this.setState(newState)
    }

    render() {
        const dropZoneStyles = [
            [styles.dropZone],
            [styles.dropZone],
            [styles.dropZone]
        ];
        if (this.state.direction[0] == 'down') {
            switch (this.state.direction[1]) {
                case 'left':
                    dropZoneStyles[0].push(styles.dropZoneAccept);
                    break;
                case 'right':
                    dropZoneStyles[2].push(styles.dropZoneAccept);
                    break;
                case 'middle':
                    dropZoneStyles[1].push(styles.dropZoneAccept);
                    break;
                default:
                    break;
            }
        }
        return (
            <View style={styles.projectContainer}>
                <View style={{flex: 1}}/>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={this.state.pan.getLayout()}>
                    <Card {...allCards[this.state.currentCardIndex]}
                          isLifted={this.state.lifted}
                          dragDirection={this.state.direction}/>
                </Animated.View>
                <View style={{flex: 1}}/>
                <View style={styles.dropZoneHeader}>
                    <Text style={styles.selectedLabel}>
                        Selected projects
                    </Text>
                    <Text style={styles.costLabel}>
                        Cost: USD${this.state.totalCost}
                    </Text>
                </View>
                <View style={styles.dropContainer}>
                    <View style={dropZoneStyles[0]}>
                        {this.state.acceptedCards[0]
                            ?
                            <ThumbnailCard {...this.state.acceptedCards[0]}/> : null}
                    </View>
                    <View style={dropZoneStyles[1]}>
                        {this.state.acceptedCards[1]
                            ?
                            <ThumbnailCard {...this.state.acceptedCards[1]}/> : null}
                    </View>
                    <View style={dropZoneStyles[2]}>
                        {this.state.acceptedCards[2]
                            ?
                            <ThumbnailCard {...this.state.acceptedCards[2]}/> : null}
                    </View>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    projectContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
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
        borderWidth: 4,
        borderColor: 'black',
        flex: 1
    },
    dropZoneAccept: {
        borderColor: '#8BC34A',
        borderWidth: 4
    },
    dropZoneHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    selectedLabel: {
        fontSize: 16,
        flex: 1
    },
    costLabel: {
        fontSize: 16
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
