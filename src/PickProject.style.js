import {StyleSheet} from "react-native"

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
        borderStyle: 'dashed',
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

export {styles}
