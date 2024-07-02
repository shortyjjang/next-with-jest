import { AppRouterContext, AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

export type AppRouterContextProps = {
    router: Partial<AppRouterInstance>;
    children: React.ReactNode;
};
export const router = jest.fn();
export const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
};

export const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
export const replace = jest.spyOn(mockedRouter, 'replace').mockImplementation(() => {});
export const push = jest.spyOn(mockedRouter, 'push').mockImplementation(() => {});
export const AppRouterProvider = ({children }: AppRouterContextProps) => {
    return (
        <AppRouterContext.Provider value={mockedRouter}>
            {children}
        </AppRouterContext.Provider>
    );
}