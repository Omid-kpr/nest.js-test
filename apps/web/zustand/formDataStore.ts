import { FormStore } from "types/form";
import { create } from "zustand";
// Define types for the form state


// Create the Zustand store
const useFormStore = create<FormStore>((set) => ({
    loginForm: {
        email: "",
        password: "",
    },
    registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
    },
    setLoginForm: (email, password) =>
        set((state) => ({
            loginForm: { ...state.loginForm, email, password },
        })),
    setRegisterForm: (email, password, confirmPassword) =>
        set((state) => ({
            registerForm: { ...state.registerForm, email, password, confirmPassword },
        })),
    resetLoginForm: () => set(() => ({ loginForm: { email: "", password: "" } })),
    resetRegisterForm: () =>
        set(() => ({ registerForm: { email: "", password: "", confirmPassword: "" } })),
}));



export default useFormStore;
