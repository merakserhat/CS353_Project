import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContextProps";

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [globalVariable, setGlobalVariable] = useState<string>('initialValue');
    const [user, setUser] = useState<UserModel>();
    const [exercises, setExercises] = useState<ExerciseModel[]>();

    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, setUser, setExercises, user, exercises }}>
            {children}
        </GlobalContext.Provider>
    );
};
