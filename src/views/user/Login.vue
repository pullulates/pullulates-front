<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <Captcha
          id="Captcha"
          scene="Login"
          type="Geetest"
          :parm="captchaOption"
          @callback="captchaNotice"
        >
          <a-button
            size="large"
            type="primary"
            htmlType="button"
            id="Captcha"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >登录</a-button>
        </Captcha>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      },
      captchaOption: {
        product: 'bind'
      }
    }
  },
  created () {
    this.$notification.info({
      message: 'PULLULATES CLOUD',
      description: `${timeFix()}！账户：admin，密码：111111`
    })
  },
  methods: {
    ...mapActions(['Login']),
    // 回调监听
    captchaNotice (status, res) {
      if (status === 1) {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true
      const validateFieldsKey = ['username', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
        }
        state.loginBtn = false
      })
    },
    loginSuccess (res) {
      this.$router.push({ name: '/dashboard' }, () => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
