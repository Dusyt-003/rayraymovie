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
          label="密码"
          placeholder="请输入密码"
          :error-message="pwd1.errorMessage"
          :right-icon="pwd1.icon"
          @click-right-icon="checkPassword('pwd1')"
          @input="validUP(pwd1.value, 'validPwd',{key:'pwd1',errorMessage:'密码支持6-16位(字母数字)_必须含有字母大小写'})"
        />

        <van-field
          v-model="pwd2.value"
          :type="pwd2.type"
          label="再次输入密码"
          placeholder="请输入密码"
          :error-message="pwd2.errorMessage"
          :right-icon="pwd2.icon"
          @click-right-icon="checkPassword('pwd2')"
          @input="validEqual(pwd1.value,pwd2.value)"
        />
      </van-cell-group>
      <div class="register-from">
        <van-button
          @click="register"
          class="register-btn"
          :loading="isLoading"
          type="info"
          block
          loading-text="注册中..."
          text="注册"
          :disabled="!isValid"
        />
      </div>
      <div class="login">
        <span>
          <router-link class="login-text" to="./Login">已有账号?登陆</router-link>
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
import { validForm } from "../tool/validForm";
import { Dialog } from "vant";
import { createNamespacedHelpers, mapActions } from "vuex";

// 基于registerModule的命名空间导入mapState、mapMutation 辅助函数

const { mapState, mapMutations } = createNamespacedHelpers("registerModule");

export default {
  name: "register",

  // 计算属性
  computed: {
    ...mapState(["pwd1", "pwd2", "isLoading", "isValid", "user"])
  },
  // 方法
  methods: {
    ...mapMutations(["checkPassword"]),

    register() {
      let self = this;

      // 注册
      //验证表单

      this.$store.commit("registerModule/register", false);

      // 定时器
      let randomTime = Math.random() * 3 * 1000;
      setTimeout(function() {
        // 获取所有用户信息
        let users = localStorage.getItem("users");
        users = users ? JSON.parse(users) : [];
     

        // 判断当前用户是否存在
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == self.user.value) {
            Dialog.alert({
              message: "用户已存在"
            }).then(() => {
              // on close
            });

            return;
          }
        }

        Dialog.alert({
          message: "注册成功"
        }).then(() => {
          // on close
        });

        let time = new Date().getTime();
        // 记录用户信息
        let userInfomation = {
          // 用户名
          username: self.user.value,

          // 密码
          pwd: self.pwd1.value,

          // 注册时间
          time
        };
        // 将当前的用户信息推进到users里面
        users.push(userInfomation);

        // 写入本地存储中，模拟数据库
        localStorage.setItem("users", JSON.stringify(users));
      }, randomTime);
    },

    // 输入验证表单

    // 验证用户名
    validUsername(value) {
     

      let isValid = validForm.validUsername(value);

      this.$store.commit("registerModule/validUsername", isValid);
    },

    // 验证密码

    validPwd(value) {
     

      let isValid = validForm.validPwd(value);

      this.$store.commit("registerModule/validPwd", isValid);
    },

    // 验证两次密码是否相等
    validEqual(v1, v2) {
      let isValid = validForm.validEqual(v1, v2);

      this.$store.commit("registerModule/validEqual", isValid);
      this.$store.commit("registerModule/passForm");
    },
    // 验证用户名或者密码

    validUP(value, fnName, o) {
      let isValid = validForm[fnName](value);
    

      o.isValid = isValid;
      this.$store.commit("registerModule/validUP", o);
      this.$store.commit("registerModule/passForm");
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
