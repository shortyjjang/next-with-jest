import { create } from 'zustand'

const useUserInfo = create<UserInfo>((set) => ({
    username: '',
    token: '',
    changeToken: (token) => set((state) => ({
        ...state,
        token: token
    })),
    setUser: (username, token) => set((state) => ({
        ...state,
        username: username,
        token: token
    }))
}))

export default useUserInfo

type UserInfo = {
    username: string
    token: string
    changeToken: (token: string) => void
    setUser: (username: string, token: string) => void
}