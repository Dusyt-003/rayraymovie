// 验证库

class ValidForm{

    constructor(){
        // 必须是大写字母开头，4-8个字符
        this.usernameReg = /^[A-Za-z]\w{3,7}$/

        // 密码必须含有大写小写数字_,8-16位
        this.pwdReg = /^(?=.*[A-Z])(?=.*[a-z])\w{6,16}$/
    }
    // 验证用户名
    validUsername(value){
        return this.usernameReg.test(value)
    }

    // 验证密码

    validPwd(value){
        return this.pwdReg.test(value)
    }

    // 验证两次密码相等
    validEqual(v1,v2){
        return v1 === v2
    }

}

export const validForm = new ValidForm()