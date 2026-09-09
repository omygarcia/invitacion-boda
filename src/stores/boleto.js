import { defineStore } from 'pinia'

export const useBoletoStore = defineStore('boleto', {
  persist:true,
  state:()=>({boleto:null}),
  getters:{
    boleto:(state)=>state.boleto
  },
  actions:{
    //todo
  }
})
