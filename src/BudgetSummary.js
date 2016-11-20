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
        // buggy but for now ok
        const toCurrency = (num) => String(num).split('000').join('0.00')

        const acceptedCost = toCurrency(this.props.votes.accepted.reduce((prevVal, card) => prevVal + card.cost, 0))
        const rejectedCost = toCurrency(this.props.votes.rejected.reduce((prevVal, card) => prevVal + card.cost, 0))

        return (
            <View style={styles.budgetContainer}>
                <View>
                    <Text style={styles.rowLabel}>Proyectos seleccionados</Text>
                    <Text style={styles.rowSubLabel}>
                        Costo total: $ {acceptedCost}
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
                        Ahorro total: $ {rejectedCost}
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
                                    text="Mostrar proyectos"/>
                    <MaterialButton onPress={this.props.onRetry}
                                    text="Intentar de nuevo"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    budgetContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: -15,
        justifyContent: 'space-between'
    },
    rowLabel: {
        fontSize: 22,
        lineHeight: 28,
        textAlign: 'center'
    },
    rowSubLabel: {
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'center',
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
