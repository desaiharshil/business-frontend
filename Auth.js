import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const Auth = ({ children }) => {
    const [Addbusiness, setAddbusiness] = useState(null);
    const navigate = useNavigate();

    const LoginAction = async (data) => {
        debugger
        try {
            const response = await fetch("http://localhost:3003/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            debugger
            if (res.data ) {
                setAddbusiness(res.data[0]);
                localStorage.setItem("Userdetails",res.data[0].business_id);
                return res;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setAddbusiness(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ LoginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default Auth;

export const useAuth = () => {
    return useContext(AuthContext);
};