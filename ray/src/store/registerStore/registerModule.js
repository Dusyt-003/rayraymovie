// 导出

import {state} from './state'

import {mutations} from './mutations'

export const registerModule = {
    // 添加命名空间
    namespaced:true,
    state,
    mutations
}