import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native'
import MaterialButton from './MaterialButton'
import ThumbnailCard from './ThumbnailCard'

export default class BudgetSummary extends Component {
    render() {
        const acceptedCost = this.props.votes.accepted.reduce((prevVal, card) => prevVal + card.cost, 0)
        const rejectedCost = this.props.votes.rejected.reduce((prevVal, card) => prevVal + card.cost, 0)
        return (
            <View style={styles.budgetContainer}>
                <View>
                    <Text style={styles.rowLabel}>Selected Projects</Text>
                    <Text style={styles.rowSubLabel}>
                        Total cost:
                        USD$ {acceptedCost}
                    </Text>
                    <ScrollView horizontal={true}>
                        {this.props.votes.accepted.map(card =>
                            <ThumbnailCard {...card}
                                           containerStyle={styles.thumbnailCard}
                                           imageStyle={styles.thumbnailImage}
                                           key={card.id}/>)}
                    </ScrollView>
                </View>
                <View>
                    <Text style={styles.rowLabel}>Rejected Projects</Text>
                    <Text style={styles.rowSubLabel}>
                        Total savings: USD$ {rejectedCost}
                    </Text>
                    <ScrollView horizontal={true}>
                        {this.props.votes.rejected.map(card =>
                            <ThumbnailCard badImage={true}
                                           containerStyle={styles.thumbnailCard}
                                           imageStyle={styles.thumbnailImage}
                                           {...card} key={card.id}/>)}
                    </ScrollView>
                </View>
                <View style={styles.actionRow}>
                    <MaterialButton onPress={this.props.onRetry}
                                    text="SHOW TOP PROJECTS"/>
                    <MaterialButton onPress={this.props.onRetry}
                                    text="TRY AGAIN"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    budgetContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between'
    },
    rowLabel: {
        fontSize: 24,
        lineHeight: 30
    },
    rowSubLabel: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: '700'
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    thumbnailCard: {
        flex: 0,
        padding: 8
    },
    thumbnailImage: {
        height: 170,
        width: 190,
        alignSelf: 'center'
    }
})
