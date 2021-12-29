/*
    As the Navigation between the screens is common ...
    We will create this common component so that instead of writing the
    same code again and again we will reuse it
*/

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Spacer from "./Spacer";

/*
    This "withNavigation" will be created for a component which is a 
    child of react-native screens 
*/
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>
                    {text}
                </Text>
            </Spacer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default withNavigation(NavLink);