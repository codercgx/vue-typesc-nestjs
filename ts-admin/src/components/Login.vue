<template>
  <div class="login">
    <div class="mainContent">
      <el-card class="box-card">
        <span
          class="clickItem"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in itemList"
          :key="index"
          @click="currentIndex = index"
          >{{ item }}</span
        >

        <div v-if="currentIndex === 0">
          <el-form
            :rules="loginRules"
            ref="loginRef"
            :model="loginForm"
            label-width="60px"
            class="loginForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名/手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <div v-else>
          <el-form
            :rules="registerRules"
            ref="registerRef"
            :model="registerForm"
            label-width="80px"
            class="loginForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名/手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpassword">
              <el-input
                type="password"
                v-model="registerForm.cpassword"
                placeholder="请再次确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="register"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  itemList = ["登录", "注册"];
  currentIndex = 0;
  loginForm = {
    username: "",
    password: "",
  };
  registerForm = {
    username: "",
    password: "",
    cpassword: "",
  };
  loginRules = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],
  };
  registerRules = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],
    cpassword: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],
  };
  async login() {
    const { data } = await this.$http.post("users/login", this.loginForm);
    console.log(data);
    if (data.status) {
      this.$message.error(data.message);
      this.loginForm = {
        username: "",
        password: "",
      };
      return;
    }
    this.$message.success(`欢迎您!${data.data.username}`);
    this.loginForm = {
      username: "",
      password: "",
    };
    this.$router.push("/home");
  }
  async register() {
    const { data } = await this.$http.post("users/register", this.registerForm);
    console.log(data);
    if (data.status) {
      this.$message.error(data.message);
      return;
    }
    this.$message.success(data.meaasge);
    this.registerForm = {
      username: "",
      password: "",
      cpassword: "",
    };
    this.currentIndex = 0;
  }
}
</script>

<style lang="scss" scope>
.login {
  position: relative;
  background: url("../assets/bgp.jpg") no-repeat center;
  width: 100%;
  height: 632px;
  .mainContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .box-card {
      width: 360px;
      .clickItem {
        box-sizing: border-box;
        color: orange;
        display: inline-block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #eee;
        margin-bottom: 20px;
        cursor: pointer;
      }
      .active {
        border-bottom: 2px solid orange;
        background-color: orange;
        color: #fff;
      }
      .loginForm {
        .el-button {
          display: block;
          width: 200px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
