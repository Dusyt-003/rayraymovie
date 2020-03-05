export const mutations = {

    // 查看密码
    checkPassword(state,key){
        // console.log('key ==>', key);

        let isOpen = state[key].type === 'password'
        state[key].type =  isOpen ? 'text' : 'password'
        
        state[key].icon = isOpen ? 'eye-o' : 'closed-eye'
    },


    // 点击注册

    register(state,pass){
        state.isLoading = pass
    },
    // 验证用户名
    validUsername(state,isValid){
        // console.log('isValid==>', isValid)
        state.user.errorMessage = !isValid ? '用户名支持4-8字母数字_组合' : ''
    },

    // 验证密码
    validPwd(state,isValid){
        // console.log('isValid==>', isValid)
        state.pwd1.errorMessage = !isValid ? '密码支持6-16位(字母数字)_必须含有字母大小写' : ''
    },
    // 验证用户名和密码的公共方法
    validUP(state,o){
        state[o.key].errorMessage = o.isValid ? '' : o.errorMessage
    },

    // 验证两次密码相等
    validEqual(state,isValid){
        state.pwd2.errorMessage = isValid ? '' : '两次密码不一致'
    },

    // 注册按钮验证 passForm
    passForm(state){
        state.isValid = 
        (state.user.errorMessage == '' && state.user.value != '') &&(state.pwd1.errorMessage == '' && state.pwd1.value != '')&& (state.pwd2.errorMessage == '' && state.pwd2.value != '') && 
        (state.pwd1.value == state.pwd2.value)
        
    }

  
}