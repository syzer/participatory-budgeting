import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

const thumbnailStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },
    image: {
        height: 60,
        width: 60,
        alignSelf: 'center'
    }
});

class ThumbnailCard extends Component {
    render() {
        const image = this.props.badImage ? this.props.image : this.props.imageGood;
        const containerStyle = this.props.containerStyle ? this.props.containerStyle : thumbnailStyles.container;
        const imageStyle = this.props.imageStyle ? this.props.imageStyle : thumbnailStyles.image;
        return (
            <View style={containerStyle}>
                <Text>{this.props.shortTitle}</Text>
                <Image
                    style={imageStyle}
                    source={image}/>
            </View>
        );
    }
}
export default ThumbnailCard;
