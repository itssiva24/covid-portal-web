import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import AuthUserContext from "./authUserContext";
import { auth, getUser } from "./firebase";

export default (Component) => (props) => {
    const [authUser, setAuthUser] = useState();
    // const [me, setMe] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setAuthUser(user);
            if (user) {
                setAuthUser({ ...(await getUser(user.uid)), uid: user.uid });
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthUserContext.Provider value={{ authUser, me }}>
            {!loading ? (
                <Component {...props} />
            ) : (
                <div
                    style={{
                        display: "flex",
                        height: "100vh",
                        background: "grey",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Loader />
                </div>
            )}
        </AuthUserContext.Provider>
    );
};
