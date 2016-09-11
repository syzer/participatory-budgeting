import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
    materialButton: {
        elevation: 2,
        borderRadius: 2,
        padding: 8,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'space-around',
        backgroundColor: '#03A9F4'
    },
    materialButtonText: {
        color: '#FFF',
        fontSize: 14,
        lineHeight: 20
    }
});

class MaterialButton extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}
                                style={styles.materialButton}
                                underlayColor="#81D4FA">
                <Text style={styles.materialButtonText}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        )
    }
}
export default MaterialButton;
