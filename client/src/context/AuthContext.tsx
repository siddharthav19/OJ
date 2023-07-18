import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
} from "react";

interface AuthActionLogin {
    type: "LOGIN";
    token: string;
}

interface AuthActionLogout {
    type: "LOGOUT";
}

type AuthAction = AuthActionLogin | AuthActionLogout;

const AuthReducer = (state: string, action: AuthAction) => {
    if (action.type === "LOGIN") return action.token;
    if (action.type === "LOGOUT") return "";
    return state;
};

export interface AuthContextType {
    token: string;
    dispatch: Dispatch<AuthAction>;
}

interface Props {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthContextProvider = ({ children }: Props) => {
    const [token, dispatch] = useReducer(AuthReducer, "");
    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        if (storedToken) {
            dispatch({ type: "LOGIN", token: storedToken });
        }
    }, []);
    return (
        <AuthContext.Provider value={{ token, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
