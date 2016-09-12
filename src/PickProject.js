import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Animated,
    PanResponder
} from 'react-native'
import ThumbnailCard from './ThumbnailCard'
import Card from './ProjectCard'
import {styles} from './PickProject.style'

class PickProject extends Component {

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
                        Expected cost: ${this.state.totalCost}
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

export default PickProject
