<template>
  <div class="aslide">
    <el-aside class="left">
      <!-- 答题前的提示框 -->
      <div class="tips"
           v-show="exam.bool">
        <p>
          欢迎你登录本系统，本系统共有5道选择题，
          请在10分钟内完成做答。点击开始答题，即可开始
        </p>
        <div class="beginButton">
          <el-button type="primary"
                     @click="begin">开始答题</el-button>
          <el-button type="primary"
                     @click="quit">放弃答题</el-button>
        </div>
      </div>
      <!-- 答题区 -->
      <div class="datiqu"
           v-if="exam.saw">
        <h4>
          当前第 {{ exam.index + 1 }} 题 / 共 {{ exam.data.length }} 题~
        </h4>
        <div class="time">{{ exam.msg }}</div>
        <div class="middle">
          <!-- 题目 -->
          <h2>
            {{exam.index+1}}----{{ exam.data[exam.index].qtext}}
          </h2>
          <!-- 选项 -->
          <!-- 单选 -->
          <div v-if='exam.data[exam.index].qtype==1'>
            <el-radio-group v-model="radio"
                            @change="REMBERANSEWER(radio)">
              <el-radio :label="item.oid"
                        v-for="(item) in exam.data[exam.index].option"
                        :key="item.oid">
                {{item.otext }}
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 多选 -->
          <div v-else>
            <el-checkbox-group v-model="checkList"
                               size="large"
                               @change="handleCheck(checkList)">
              <el-checkbox v-for="item in exam.data[exam.index].option"
                           :key="item.oid"
                           :label="item.oid">{{ item.otext }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 下一题按钮 -->
        <div class="nextButton">
          <el-button-group>
            <el-button type="primary"
                       :disabled="exam.ques.previous"
                       icon="el-icon-arrow-left"
                       @click="last"
                       :prefix-icon="Search">上一题</el-button>
            <el-button type="primary"
                       :disabled="exam.ques.next"
                       @click="next"
                       :prefix-icon="Apple">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </div>
    </el-aside>

    <!-- 计分区 -->
    <el-main class="right">
      <h2>计分区</h2>
      <div class="box">
        <div v-for="(item) of exam.data"
             :key="item.qid">
          <div class="rightbox1"
               :style="{background:item.choice!=-1?'#f90':''}"
               @click="ISME(item.qid)">
            {{ item.qid }}
          </div>
        </div>
      </div>
      <el-button type="success"
                 @click="jiao"
                 class="jiao">交卷</el-button>
     

      <el-dialog title="考试结果"
                 v-model="dialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <div id="myChart"
             :style="{width: '300px', height: '300px'}"></div>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="queding">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ref } from 'vue'
import { Apple, Search } from '@element-plus/icons-vue'
export default {
  name: 'AslideV',
  data: function () {
    return {
      radio: '', //单选按钮值
      timer: null, //定时器
      dialogVisible: false, //得分弹出框开关
      tihaolist: [], //答过的题
    }
  },
  setup() {
    const checkList = ref([])
    return { checkList,Apple,Search }
  },
  methods: {
    //stop
    quit() {
      this.$router.push({
        path: '/',
      })
    },

    //开始答题
    begin() {
 
      this.$store.dispatch('exam/showtopic')
      this.timer = setInterval(this.kk, 1000)
    },
    kk() {
      this.$store.commit('exam/CountDown')
    },

    //next
    next() {
      // console.log(this.radio);
      this.$store.commit('exam/NEXT')
      this.radio = this.$store.getters['exam/REBACK']
    },
    //top
    last() {
      this.$store.commit('exam/LAST')
      this.radio = this.$store.getters['exam/REBACK']
    },
    //单选, 点击你所选择的答案，将你选择的答案的oid给choice
    REMBERANSEWER(radio) {
      this.exam.data[this.exam.index].choice = radio
   
    },
    // 多选
    handleCheck(val) {
      console.log(val)
      this.exam.data[this.exam.index].choice = val
      let data = this.exam.data[this.exam.index].correct
      let kk = true
      if (val.length != data.length) {
        //两个数量匹配不上
        kk = false
      } else {
        //匹配数量
        for (let i = 0; i < data.length; i++) {
          let bb = data.includes(val[i])
          if (!bb) {
            kk = false
            return
          } else {
            kk = true
          }
        }
      }
      if (kk) {
        this.exam.correcount++
        console.log(this.exam.correcount)
        alert(66)
      }
    },
    //点击右边的计分区的题号，跳转至对应的答题题目
    ISME(index) {
      this.exam.index = index
      if (this.exam.index == this.exam.data.length - 1) {
        this.exam.ques.next = true
        this.exam.ques.previous = false
      } else if (this.exam.index == 0) {
        this.exam.ques.next = false
        this.exam.ques.previous = true
      } else {
        this.exam.ques.next = false
        this.exam.ques.previous = false
      }
      this.radio = this.$store.getters['exam/REBACK']
    },
    //交卷
    jiao() {
      clearInterval(this.timer)
      this.dialogVisible = true
      for (let i = 0; i < this.exam.data.length; i++) {
        if (this.exam.data[i].choice == this.exam.data[i].correct) {
          this.exam.correcount++
        } else if (this.exam.data[i].choice == -1) {
          this.exam.blankcount++
        } else {
          this.exam.errorcount++
        }
      }
      console.info(
        this.exam.correcount,
        this.exam.errorcount,
        this.exam.blankcount
      )
      // 显示Eharts图标
      new Promise((resolve) => {
        resolve()
      }).then(() => {
        // 初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '答题的分数',
          },
          tooltip: {},
          xAxis: {
            data: ['正确', '错误', '空白'],
          },
          yAxis: {},
          series: [
            {
              name: '正确率',
              type: 'bar',
              data: [
                this.exam.correcount,
                this.exam.errorcount,
                this.exam.blankcount,
              ],
            },
          ],
        })
      })
    },
    queding() {
      // 把所有的值恢复到初始状态
      this.dialogVisible = false
      this.exam.maxtime = 6000
      this.exam.bool = true
      this.exam.saw = false
      this.exam.index = 0
      this.exam.correcount = 0
      this.exam.errorcount = 0
      for (let i = 0; i < this.exam.data.length; i++) {
        this.exam.data[i].choice = -1
      }
      //delete前一个实例
      this.$echarts.init(document.getElementById('myChart')).dispose()
      // 回到inedx
      this.$router.push({
        path: '/',
      })
    },

    handleClose(done) {
      this.$confirm('close？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
  },
  computed: {
    ...mapState(['exam']),
  },
}
</script>

<style scoped>
@import url('./Aslide.scss');
</style>
