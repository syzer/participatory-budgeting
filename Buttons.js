import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import Button from 'react-native-button'

class RetryButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    _handlePress() {
        console.log('Pressed!')
    }

    render() {
        return (
            <Button
                containerStyle={{
                    padding: 10,
                    height: 45,
                    overflow: 'hidden',
                    borderRadius: 4,
                    backgroundColor: 'green'
                }}
                style={{fontSize: 20, color: 'red'}}>
                Retry
            </Button>
        )
    }
}

//TODO logo
class ShareButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    _handlePress() {
        console.log('Pressed!')
    }

    render() {
        return (
            <Button
                containerStyle={{padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'blue'}}
                style={{fontSize: 20, color: 'green'}}>
                Share with Friends
            </Button>
        )
    }
}

export {RetryButton, ShareButton}
