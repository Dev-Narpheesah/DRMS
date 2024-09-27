import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const useAuthRedirect = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("login")
        }
    }, [user, navigate])
};

export default useAuthRedirect