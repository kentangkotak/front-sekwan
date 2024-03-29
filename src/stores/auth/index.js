import { defineStore } from "pinia"
import { api } from "src/boot/axios"
import * as storage from 'src/modules/storage'
// import { routerInstance } from 'src/boot/router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') ? storage.getLocalToken(): null,
    user: localStorage.getItem('user') ? storage.getUser(): null,
    currentUser: localStorage.getItem('user') ? storage.getUser(): null,
  }),
  actions: {
    login (payload) {
      // this.loading = true
      // waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('/login', payload)
          .then(resp => {
            console.log('login', resp)
            storage.setLocalToken(resp.data.token)
            storage.setUser(resp.data.user)
            localStorage.setItem('activeTime', new Date())
            const hdd = storage.getLocalToken()
            const hddUser = storage.getUser()
            if (hdd && hddUser) {
              this.SET_TOKEN_USER(hdd, hddUser)
            }
            // setTimeout(() => {
            //   this.loading = false
            // }, 1000)
            resolve(resp)
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
            reject(error)
          })
      })
    },
    SET_TOKEN_USER (token, auth) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = auth
      // send to channel

      this.loading = false
      // routerInstance.push({ path: '/' })
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
  }
})
