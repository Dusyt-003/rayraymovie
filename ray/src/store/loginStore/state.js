export const state = {

     // 用户名
     user:{
        value:'',
        errorMessage:'',
        
    },
    // 登陆密码
    pwd1:{
        type:'password',
        value:'',
        icon:'closed-eye',
        errorMessage:''
    },

    // 登陆加载中
    isLoading:false,

     // 控制注册按钮状态

     isValid:false
}