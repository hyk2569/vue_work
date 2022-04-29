<template>
  <div>
    <el-header class="head"
               style="height: 80px">
      <el-col :span="10">
        <div>百科知识答题系统</div>
      </el-col>
      <el-col :span="5"
              :offset="9"
              style="font-size:15px">
        <span>欢迎{{king}}回家</span>
        <a style="margin-left:50px;"
           @click="goout">退出</a>
      </el-col>
    </el-header>
  </div>
</template>

<script>
import {useCount} from "../ElHeader/ElHeader"
export default {
  name: 'El-header',
  setup() {
      let { goout,king } = useCount()
    return { goout,king } 
  },
}
</script>

<style lang="scss" scoped>
@import "./ElHeader.scss"
</style>