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
      status: 'all'
    },
    form:{},
    filters: false,
  }),
  actions:{
    init() {
      this.getData()
    },
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('/indexdewan', params)
        .then((resp) => {
          // console.log('sasasa', resp)
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
            this.meta.total = resp?.data.total
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
        //console.log('sasasa', resp)
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
    setQ(val) {
      this.params.page = 1
      this.params.q = val
      this.getData()
    },
    setFilters() {
      this.filters = !this.filters
    },
    filterData(val) {
      this.params.page = 1
      const { q } = val // status
    //  this.params.to = to
    //  this.params.from = from
      this.params.q = q
    //  this.params.status = status
      //this.setCustom()
      this.getData()
      // console.log(val)
    },
    refreshTable () {
      this.params.page = 1
      this.getData()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.getData()
    },
    setPage(payload) {
      this.params.page = payload
      this.getData()
    },
  }

})
