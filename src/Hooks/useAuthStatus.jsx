import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export function useAuthStatus() {
    const [LoggedIn, setLoggedIn] = useState(false);  // fixed typo in setLoggedIn
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setLoggedIn(true);
            }
             setCheckingStatus(false);
        });
    }, []);

    return { LoggedIn, checkingStatus };
}
