/*
    As SignIn & SignUp has the same form except for some details 
    we will use a common form and pass the details which are different 
*/

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3> {headerText} </Text>
            </Spacer>
            <Spacer>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>
            {
                /*
                    secureTextEntry will make the text dots insetad of plain text
                */
            }
            <Spacer>
                <Input
                    secureTextEntry={true}
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                {
                    errorMessage
                        ? <Text style={styles.error}> {errorMessage} </Text>
                        : null
                }
            </Spacer>
            <Spacer>
                <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
            </Spacer>

        </>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16
    }
});

export default AuthForm;