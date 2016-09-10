import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

export default class BudgetSummary extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./img/EducationProjectAfter.jpg')}/>
                <ProjectCards/>
            </View>
        )
    }
}
