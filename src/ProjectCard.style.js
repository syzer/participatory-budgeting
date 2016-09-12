import {StyleSheet} from "react-native"

const cardStyles = StyleSheet.create({
    card: {
        alignItems: 'stretch',
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: 'black',
        // borderWidth: 1,
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

const styles = StyleSheet.create({
    projectContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    dropContainer: {
        flexDirection: 'row',
        height: 132,
        borderRadius: 2,
        paddingTop: 8,
        paddingBottom: 8
    },
    dropZone: {
        borderWidth: 1,
        borderColor: 'gray',
        flex: 1
    },
    dropZoneAccept: {
        borderColor: '#8BC34A',
        borderWidth: 4
    },
    dropZoneHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    costHeader: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'flex-end'
    },
    costLabel: {
        fontSize: 20
    }
})

export {cardStyles, styles}
