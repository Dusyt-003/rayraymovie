export const state = {
    // 用户名
    user:{
        value:'',
        errorMessage:'',
       
        
    },

    pwd1:{
        type:'password',
        value:'',
        icon:'closed-eye',
        errorMessage:''
    },
    pwd2:{
        type:'password',
        value:'',
        icon:'closed-eye',
        errorMessage:''
    },

    // 注册加载中
    isLoading:false,

    // 控制注册按钮状态

    isValid:false




}