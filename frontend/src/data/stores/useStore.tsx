import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import authService from "@/features/services";
import { UserStore } from "@/data/types/storeTypes";
import { getErrorMessage } from "@/data/helpers";
import { useTeachersStore } from "./useTeachersStore";

export const useStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: undefined,
            loading: false,
            isError: false,
            isSuccess: false,
            message: "",
            setUser: (user) => set({ user: user }),
            setLoading: (isLoading) => set({ loading: isLoading }),
            setIsError: (isError) => set({ isError: isError }),
            setIsSuccess: (isSuccess) => set({ isSuccess: isSuccess }),
            setMessage: (message) => set({ message: message }),
            login: async (userData) => {
                get().setLoading(true);
                try {
                    const data = await authService.login(userData);
                    if (!data.error) {
                        get().setIsSuccess(true);
                        get().getUserInfo();
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            getUserInfo: async () => {
                get().setLoading(true);
                try {
                    const data = await authService.getUserInfo();
                    if (!data.error) {
                        get().setUser(data);
                        get().setIsSuccess(true);
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            logout: async () => {
                if (get().user?.role.toString().toLowerCase() === "teacher")
                    useTeachersStore.persist.clearStorage();
                await authService.logout();
                useStore.persist.clearStorage();
                // set({ user: undefined });
            },
            register: async (userData) => {
                get().setLoading(true);
                try {
                    const data = await authService.register(userData);
                    if (!data.error) {
                        get().setIsSuccess(true);
                        get().getUserInfo();
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            changeStudentTheme: async (new_theme) => {
                get().setLoading(true);
                try {
                    const data = await authService.changeStudentTheme(
                        new_theme
                    );
                    if (!data.error) {
                        get().setUser(data);
                        get().getUserInfo();
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            changeStudentTeacher: async (prefer_teacher) => {
                get().setLoading(true);
                try {
                    const data = await authService.changeStudentTeacher(
                        prefer_teacher
                    );
                    if (!data.error) {
                        get().setUser(data);
                        get().getUserInfo();
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            changeStudentStatus: async (status) => {
                get().setLoading(true);
                try {
                    const data = await authService.changeStudentStatus(status);
                    if (!data.error) {
                        get().setUser(data);
                        get().getUserInfo();
                    }
                } catch (error) {
                    get().setIsError(true);
                    get().setMessage(getErrorMessage(error));
                }
                get().setLoading(false);
            },
            reset: () => {
                // get().setUser({})
                get().setLoading(false);
                get().setIsError(false);
                get().setIsSuccess(false);
                get().setMessage("");
            },
        }),
        {
            name: "user",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
