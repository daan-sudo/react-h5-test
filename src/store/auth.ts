import { create } from 'zustand'
import axios from 'axios'

type AuthState = {
  token: string | null
  userName: string | null
  login: (userName: string, password: string, remember: boolean) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('demo-token'),
  userName: localStorage.getItem('demo-user'),
  login: async (userName, password, remember) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    if (!userName || !password) {
      throw new Error('请输入账号和密码')
    }

    const token = `demo-token-${Date.now()}`
    set({ token, userName })

    if (remember) {
      localStorage.setItem('demo-token', token)
      localStorage.setItem('demo-user', userName)
    } else {
      localStorage.removeItem('demo-token')
      localStorage.removeItem('demo-user')
    }
  },
  logout: () => {
    localStorage.removeItem('demo-token')
    localStorage.removeItem('demo-user')
    set({ token: null, userName: null })
  },
}))
