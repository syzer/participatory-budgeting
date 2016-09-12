import {StyleSheet} from "react-native"

const cardStyles = StyleSheet.create({
    card: {
        alignItems: 'stretch',
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: 'black',
        // android only
        elevation: 2,
        width: 320,
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
        fontWeight: '700'
    },
    image: {
        width: 320,
        height: 180
    },
    smallImage: {
        width: 160,
        height: 90
    },
    description: {
        padding: 16,
        fontSize: 14,
        lineHeight: 20,
    }
})

export {cardStyles}
