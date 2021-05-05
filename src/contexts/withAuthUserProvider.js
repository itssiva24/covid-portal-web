import React, { useEffect, useState } from "react";
import AuthUserContext from "./authUserContext";
import { auth, getUser } from "./firebase";

export default (Component) => (props) => {
    const [authUser, setAuthUser] = useState();
    const [me, setMe] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setAuthUser(user);
            if (user) {
                setMe(await getUser(user.uid));
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthUserContext.Provider value={{ authUser, me }}>
            {!loading ? <Component {...props} /> : <div>Loading...</div>}
        </AuthUserContext.Provider>
    );
};
