<template>
  <div id="box">
    <div id="login">
      <div class="wid">
        <h3>百科知识--登录页面</h3>
      </div>
      <form id="f1">
        <div class="wid">
          <el-input class="name"
                    v-model="formObj.username"
                    placeholder="请输入用户名..."
                    :prefix-icon="Chicken" />
        </div>
        <div class="wid">
          <el-input class="password"
                    v-model="formObj.password"
                    placeholder="请输入密码..."
                    :prefix-icon="ColdDrink" />
        </div>
        <div class="wid">
          <el-button type="primary"
                     class="signin"
                     @click="login">登录</el-button>
        </div>
        <div class="wid"
             style="width:400px">
          <el-link type="danger"
                   @click="zhuce">注册</el-link>
          <el-link type="info">忘记密码</el-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useCount } from './login'
import { Chicken, ColdDrink } from '@element-plus/icons-vue'

export default {
  name: 'LoginV',
  setup() {
    let { formObj, login,zhuce,tixi } = useCount()
    return { formObj, Chicken, ColdDrink, login,zhuce,tixi }
  },
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>