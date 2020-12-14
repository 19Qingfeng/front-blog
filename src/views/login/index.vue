<template>
  <div class="m-login">
    <div class="left">
      <fly-box :lineColor="lineColor" :starColor="starColor" :duration="5">
        <div class="left-bg" />
      </fly-box>
    </div>
    <div class="right">
      <div class="title"> Hi Thres i'm blog </div>
      <el-form ref="form" class="login-form" :model="form" label-width="70px">
        <el-form-item label="用户名：">
          <el-input v-model.trim="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model.trim="form.password"
            placeholder="请输入密码"
            type="password"
          />
        </el-form-item>

        <el-button @click="handleLogin">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import FlyBox from "../../components/flyBox";
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    FlyBox,
  },
  data() {
    return {
      lineColor: "rgba(255,255,255,.2)",
      starColor: "rgba(0,0,0,.4)",
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    getParams() {
      const params = {
        username: this.form.username,
        password: this.form.password,
      };
      return params;
    },
    handleLogin() {
      this.$refs["form"].validate(async (boolean) => {
        if (boolean) {
          const params = this.getParams();
          await this.login(params);
          this.$router.push({
            name: "Home",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss">
@keyframes opacityAnt {
  0% {
    opacity: .8;
  }
  50% {
    opacity: .2;
  }
  100% {
    opacity: .8;
  }
}
.m-login {
  height: 100%;
  width: 100%;
  display: flex;
  .left {
    width: 40%;
    height: 100%;
    .left-bg {
      border-radius: 20px;
      height: 100%;
      width: 100%;
      background-image: url("../../assets/image/bg1.png");
      background-repeat: no-repeat;
      background-size: cover;
      animation: opacityAnt 10s infinite;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 22px;
      font-weight: 800;
      opacity: .6;
    }
    .login-form {
      width: 400px;
    }
  }
}
</style>
