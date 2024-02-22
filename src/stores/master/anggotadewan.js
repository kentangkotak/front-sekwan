import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAnggotaDewanStore = defineStore('master_anggota_dewan', {
  state: () => ({
    isOpen: false,
    items: [],
     meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
    }
  }),
  actions:{
    async getData() {
      // this.loading = true
      const params = { params: this.params }
      await api.get('/indexdewan', params)
        .then((resp) => {
          // console.log('kunjungan poli', resp)
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
  }

})
