export const mutations = {

     // 查看密码
     checkPassword(state,key){
        // console.log('key ==>', key);

        let isOpen = state[key].type === 'password'
        state[key].type =  isOpen ? 'text' : 'password'
        
        state[key].icon = isOpen ? 'eye-o' : 'closed-eye'
    },
    
    // 点击登陆

    login(state,pass){
        state.isLoading = pass
    },
    // 验证用户名和密码的公共方法
    validUP(state,o){
        state[o.key].errorMessage = o.isValid ? '' : o.errorMessage
    },
    // 注册按钮验证 passForm
    passForm(state){
        state.isValid = 
        (state.user.errorMessage == '' && state.user.value != '') &&(state.pwd1.errorMessage == '' && state.pwd1.value != '')
    }
}