import React, {Component} from "react"
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    PanResponder
} from "react-native"
import ThumbnailCard from "./ThumbnailCard"

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
        padding: 14,
        paddingTop: 0,
        fontSize: 28,
        lineHeight: 30,
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
        lineHeight: 20,
    }
}

export class Card extends Component {
    render() {
        const outerStyles = [cardStyles.card]
        if (this.props.isLifted) {
            switch (this.props.dragDirection[0]) {
                case 'up':
                    outerStyles.push(cardStyles.liftedUp)
                    break
                case 'down':
                    outerStyles.push(cardStyles.liftedDown)
                    break
                default:
                    break
            }
        }
        let imageSrc = this.props.image
        if (this.props.isLifted && this.props.dragDirection[0] === 'up') {
            imageSrc = this.props.imageBad
        }
        if (this.props.isLifted && this.props.dragDirection[0] === 'down') {
            imageSrc = this.props.imageGood
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
        )
    }
}

class ProjectCards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCardIndex: 0,
            pan: new Animated.ValueXY(),
            lifted: false,
            direction: [null, null],
            acceptedCards: [null, null, null],
            rejectedCards: [],
            totalCost: 0
        }
        this.isTransitioning = false
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
                    const directions = [null, null]
                    const newState = {
                        direction: directions
                    }
                    if (gesture.dy > 100) {
                        directions[0] = 'down'
                    } else if (gesture.dy < -100) {
                        directions[0] = 'up'
                    } else {
                        directions[0] = null
                    }
                    if (gesture.dx > 70) {
                        directions[1] = 'right'
                    } else if (gesture.dx < -70) {
                        directions[1] = 'left'
                    } else {
                        directions[1] = 'middle'
                    }
                    let totalCost = this.state.acceptedCards.reduce(
                        (prevVal, card) =>
                            card ? prevVal + card.cost : prevVal, 0)
                    if (directions[0] == 'down') {
                        totalCost += this.currentCard.cost
                        if (directions[1] == 'left' && this.state.acceptedCards[0]) {
                            totalCost -= this.state.acceptedCards[0].cost
                        } else if (directions[1] == 'middle' && this.state.acceptedCards[1]) {
                            totalCost -= this.state.acceptedCards[1].cost
                        } else if (directions[1] == 'right' && this.state.acceptedCards[2]) {
                            totalCost -= this.state.acceptedCards[2].cost
                        }
                    }
                    newState.totalCost = totalCost
                    this.setState(newState)
                }
            }),
            onPanResponderRelease: () => {
                this.isTransitioning = true
                Animated.spring(
                    this.state.pan,
                    {toValue: {x: 0, y: 0}, velocity: 5, bounciness: 0}
                ).start(() => {
                    this.isTransitioning = false
                    switch (this.state.direction[0]) {
                        case 'up':
                            this.handleResponse(false)
                            break
                        case 'down':
                            this.handleResponse(true)
                            break
                        default:
                            this.setState({
                                lifted: false,
                                direction: [null, null]
                            })
                            break
                    }
                })
            }
        })
    }

    get currentCard() {
        return this.props.cards[this.state.currentCardIndex]
    }

    handleResponse(response) {
        const newState = {
            lifted: false,
            direction: [null, null],
            rejectedCards: [...this.state.rejectedCards],
            acceptedCards: [...this.state.acceptedCards]
        }
        if (response) {
            switch (this.state.direction[1]) {
                case 'left':
                    if (this.state.acceptedCards[0]) {
                        newState.rejectedCards.push(this.state.acceptedCards[0])
                    }
                    newState.acceptedCards[0] = this.currentCard
                    break
                case 'middle':
                    if (this.state.acceptedCards[1]) {
                        newState.rejectedCards.push(this.state.acceptedCards[1])
                    }
                    newState.acceptedCards[1] = this.currentCard
                    break
                case 'right':
                    if (this.state.acceptedCards[2]) {
                        newState.rejectedCards.push(this.state.acceptedCards[2])
                    }
                    newState.acceptedCards[2] = this.currentCard
                    break
                default:
                    // Error
                    break
            }
        } else {
            newState.rejectedCards.push(this.currentCard)
        }
        if (this.state.currentCardIndex < this.props.cards.length - 1) {
            newState.currentCardIndex = this.state.currentCardIndex + 1
        } else {
            this.props.onEnd({
                accepted: newState.acceptedCards.filter(card => card),
                rejected: newState.rejectedCards
            })
        }
        this.setState(newState)
    }

    render() {
        const dropZoneStyles = [
            [styles.dropZone],
            [styles.dropZone],
            [styles.dropZone]
        ]
        if (this.state.direction[0] == 'down') {
            switch (this.state.direction[1]) {
                case 'left':
                    dropZoneStyles[0].push(styles.dropZoneAccept)
                    break
                case 'right':
                    dropZoneStyles[2].push(styles.dropZoneAccept)
                    break
                case 'middle':
                    dropZoneStyles[1].push(styles.dropZoneAccept)
                    break
                default:
                    break
            }
        }
        return (
            <View style={styles.projectContainer}>
                <View style={styles.costHeader}>
                    <Text style={styles.costLabel}>
                        Expected cost: USD${this.state.totalCost}
                    </Text>
                </View>
                <View style={{flex: 1}}/>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={this.state.pan.getLayout()}>
                    <Card {...this.currentCard}
                          isLifted={this.state.lifted}
                          dragDirection={this.state.direction}/>
                </Animated.View>
                <View style={{flex: 1}}/>
                <View style={styles.dropZoneHeader}>
                    <Text style={styles.selectedLabel}>
                        Selected projects
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
            </View>)
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
        fontSize: 24,
        flex: 1
    },
    costHeader: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'flex-end'
    },
    costLabel: {
        fontSize: 24
    }
})

export default ProjectCards
