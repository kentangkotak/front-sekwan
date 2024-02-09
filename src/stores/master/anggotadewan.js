import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAnggotaDewanStore = defineStore('master_anggota_dewan', {
  state: () => ({
    isOpen: false,
    // loading: false,
    // loadingTerima: false,
    // loadingSelesai: false,
    // loadingSimpan: false,
    items: [],
     meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      // kddepo: '',
      // flag: ['1', '2'],
      // to: dateDbFormat(new Date()),
      // from: dateDbFormat(new Date())
    }
  }),
  actions: {


  }
})
