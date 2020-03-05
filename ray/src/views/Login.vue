<template>
  <div class="register">
    <div class="applogo">
      <div class="logo"></div>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="user.value"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.errorMessage"
          @input="validUP(user.value, 'validUsername',{key:'user',errorMessage:'用户名支持4-8字母数字_组合'})"
        />
        <van-field
          v-model="pwd1.value"
          :type="pwd1.type"
          :right-icon="pwd1.icon"
          label="密码"
          placeholder="请输入密码"
          :error-message="pwd1.errorMessage"
          @click-right-icon="checkPassword('pwd1')"
          @input="validUP(pwd1.value, 'validPwd',{key:'pwd1',errorMessage:'密码支持6-16位(字母数字)_必须含有字母大小写'})"
        />
      </van-cell-group>
      <div class="register-from">
        <van-button
          class="register-btn"
          :loading="isLoading"
          type="info"
          block
          loading-text="登陆中..."
          text="登陆"
          @click="login"
          :disabled="!isValid"
        />
      </div>
      <div class="login">
        <span>
          <router-link class="login-text" to="./register">没有账号?立即注册</router-link>
        </span>
      </div>
       <div class="login-icon">
        <div class="">
          <img src="../assets/images/baidu.png" alt />
        </div>
        <div>
          <img src="../assets/images/facebook_cir.png" alt />
        </div>
        <div>
          <img src="../assets/images/qq.png" alt />
        </div>
        <div>
          <img src="../assets/images/we-chat.png" alt />
        </div>
        <div>
          <img src="../assets/images/xinlang.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { validForm } from "../tool/validForm";
import { createNamespacedHelpers, mapActions } from "vuex";

// 基于loginModule的命名空间导入mapState、mapMutation 辅助函数

const { mapState, mapMutations } = createNamespacedHelpers("loginModule");
export default {
  
  
  name: "login",
  computed: {
    ...mapState(["isLoading", "user", "pwd1", "isValid"])
  },

  methods: {
    ...mapMutations(["checkPassword"]),

    // 登陆
    login() {
      let randomTime = Math.random() * 3 * 1000;

      setTimeout(() => {
        this.$store.commit("loginModule/login", true);

        // 获取所有用户
        let users = localStorage.getItem("users");

        users = users ? JSON.parse(users) : [];

        if (users.length === 0) {
          Dialog.alert({
            message: "用户不存在"
          }).then(() => {
            // on close
          });
          this.$store.commit("loginModule/login", false);
          return;
        }
        // 查找用户
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.user.value) {
            // 如果该用户存在
            // 匹配密码
           
            
            if (users[i].pwd == this.pwd1.value) {
                  Dialog.alert({
                message: "登陆成功"
              }).then(() => {
                // on close
              });
              this.$store.commit("loginModule/login", false);
              return;
            } else {
              Dialog.alert({
                message: "用户名或者密码不正确"
              }).then(() => {
                // on close
              });
              this.$store.commit("loginModule/login", false);

              return;
            }
          }
        }
        // 用户不存在
        Dialog.alert({
          message: "该用户不存在"
        }).then(() => {
          // on close
        });
        this.$store.commit("loginModule/login", false);
      }, randomTime);
    },

    //验证用户名密码
    validUP(value, fnName, o) {
      let isValid = validForm[fnName](value);
     

      o.isValid = isValid;
      this.$store.commit("loginModule/validUP", o);
      this.$store.commit("loginModule/passForm");
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  .applogo {
    background-size: 100%;
    position: relative;
    height: 240px;
    background-size: cover;
    background: url("../assets/images/4.jpg") center no-repeat;
    .logo {
      right: 0;
      bottom: 0;
      top: 0;
      left: 0;
      margin: auto;
      // transform: translate(-50%,-50%);
      width: 100px;
      height: 100px;
      background: url("../assets/images/1.jpg") center no-repeat;
      border-radius: 20%;
      position: absolute;
      background-size: 100%;
    }
  }
  .register-form {
    padding: 10px;
  }
  .register-btn {
    width: 120px;
    height: 120px;
    margin: 30px auto;
    border: none;

    border-radius: 50%;
    background-color: lightcoral;
  }
  .login {
    margin-top: 20px;
    text-align: center;
  }
  .login-text {
    color: #444;
  }
   .login-icon{
    overflow: hidden;
  }
  .login-icon>div{
    float: left;
    width: 20%;
    text-align: center;
    margin: 20px auto;
  }
}
</style>