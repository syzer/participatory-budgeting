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
        padding: 8,
        paddingTop: 4
    },
    image: {
        height: 80,
        width: 100,
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
                <Text numberOfLines={1} adjustsFontSizeToFit={true}>{this.props.shortTitle}</Text>
                <Image
                    style={imageStyle}
                    source={image}/>
            </View>
        );
    }
}
export default ThumbnailCard;
