<template>
  <div id="box">
    <div id="login">
      <div class="wid">
        <h3>百科知识--注册页面</h3>
      </div>
      <form id="f1">
        <div class="wid">
          <el-input v-model="user"
                    placeholder="请输入用户名"
                    :prefix-icon="Apple" />
        </div>
        <div class="wid">
          <el-input v-model="pwd"
                    placeholder="请输入密码"
                    :prefix-icon="Search" />
        </div>
        <div class="wid">
          <el-button class="signin"
                     @click="zhuce">注册</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Apple, Search } from '@element-plus/icons-vue'
import {useCount} from "@/views/ZhuceV/zhuce";
export default {
  name: 'ZhuceV',
  setup() {
      let {zhuce,pwd,user} = useCount()
    return { Apple, Search,zhuce,pwd,user}
  },
}
</script>

<style lang="scss" scoped>
@import "./zhuce";
</style>