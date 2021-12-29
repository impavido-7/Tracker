/*
    This is a blank screen and it will check whether "token" is present or not in
    AsyncStorage and if YES it will navigate to TrackList directly
    Else it will show SignIn Screen
*/

import { useEffect, useContext } from "react";
import { Context as AuthContext } from '../../context/AuthContext';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);

    /*
        If you feel checking for a token takes too much time then we can return 
        a spinner here ... In this case it only takes 0.5 secs
    */
    return null;
};

export default ResolveAuthScreen;