import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAnggotaDewanStore = defineStore('master_anggota_dewan', {
  state: () => ({
    isOpen: false,
    items: [],
     meta: {},
     loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      status: ''
    },
    form:{}
  }),
  actions:{
    async getData() {
      // this.loading = true
      const params = { params: this.params }
      await api.get('/indexdewan', params)
        .then((resp) => {
          console.log('sasasa', resp)
          //this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    simpandewan() {
      this.loading = true
      console.log(this.form)
      api.post('/storedewan', this.form).then((resp) => {
        console.log('sasasa', resp)
        this.loading = false
        this.form.nik=''
        if (resp.status === 200) {
          alert('Data Sudah Tersimpan')
          console.log('OK')
        }
      }).catch((err) => {
        alert('Data Gagal Tersimpan')
        console.log(err)
        this.loading = false
      })
    },
  }

})
