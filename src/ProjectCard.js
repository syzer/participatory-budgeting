import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Animated,
    PanResponder
} from 'react-native'
import {cardStyles} from './ProjectCard.style'

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
                <Text style={cardStyles.description} ellipsizeMode={'tail'} numberOfLines={5}>
                    {this.props.description}
                </Text>
            </View>
        )
    }
}

export default Card
