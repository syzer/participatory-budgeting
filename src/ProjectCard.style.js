import {Platform, StyleSheet} from 'react-native'

const cardStyles = StyleSheet.create({
    card: {
        alignItems: 'stretch',
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: 'black',
        width: 320,
        ...Platform.select({
            android: {
                elevation: 2,
            },
            ios: {
                shadowColor: "#000000",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 0
                }
            }
        }),
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
        fontWeight: '700',
    },
    image: {
        width: 320,
        height: 180,
    },
    smallImage: {
        width: 160,
        height: 90,
    },
    description: {
        padding: 16,
        fontSize: 14,
        lineHeight: 20,
    }
})

export {cardStyles}
