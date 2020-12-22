import { Module } from 'vuex'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { IRootState } from '@/store'
import { EventState } from './type'

const namespaced = true

export const eventModule: Module<EventState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
