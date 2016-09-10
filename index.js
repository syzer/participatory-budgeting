import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Navigator
} from 'react-native'
import ProjectCards from './ProjectCards'
import BudgetSummary from './BudgetSummary'

const routes = [
    {component: <ProjectCards/>, title: 'Project selection', index: 0},
    {component: <BudgetSummary/>, title: 'Summary', index: 1}
];

class ParticipatoryBudgeting extends Component {
    render() {
        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    return (<View style={styles.mainContainer}>
                        {route.component}
                    </View>);
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: () => null,
                            RightButton: () => null,
                            Title: route => <Text>{route.title}</Text>
                        }}
                    />}
            />);
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight
    }
});

AppRegistry.registerComponent('ParticipatoryBudgeting',
    () => ParticipatoryBudgeting);
