<template>
  <div>
    <van-nav-bar
      title="个人账单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="head"><h3>账单分析</h3></div>
    <div class="content">
      <van-cell-group>
        <van-cell :title="data.date + '年'" :value="'消费' + data.amount + '元'"/>
      </van-cell-group>
      <van-collapse v-model='month_active' accordion>
        <van-collapse-item :title="month.date + '：月消费 ' + month.amount + '元'" :name='index'
                           v-for='(month, index) in data.values' :key='index'>
          <van-collapse v-model="day_active" :border="false">
            <van-collapse-item :title="day.date + ' 日消费：' + day.amount + '元'" :name='index'
                               v-for='(day, index) in month.values' :key='index' :border="false">
              <van-cell-group>
                <van-cell :title="detail.name" :value="detail.amount + '元'"
                          :label="'单价：' + detail.price + '数量：' + detail.number" v-for="detail of day.bill_details"
                          :key="detail.id"/>
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="footer">
      <van-button round block type="info" to="/bill/create">新建</van-button>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { GetBillsAnalysis } from '../../api/base'
import Vue from 'vue'
import { Collapse, CollapseItem, Switch, Cell, CellGroup, Button, NavBar } from 'vant'

Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Switch)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(NavBar)

export default {
  name: 'index',
  data () {
    return {
      token: '',
      month_active: '',
      day_active: [],
      bill_detail_active: [],
      a: [{'date': '2020-01-01', 'amount': 23}, {'date': '2020-01-02', 'amount': 24}, {'date': '2020-01-03', 'amount': 25}],
      data: {
        'date': '',
        'amount': 0,
        'values': []
      }
    }
  },
  created () {
    this.initToken()
    this.initBills()
  },
  methods: {
    initToken () {
      this.token = getToken()
    },
    initBills () {
      GetBillsAnalysis().then(({data}) => {
        this.data = data
      })
    },
    create () {
      console.log('asdasdasd')
    },
    onClickLeft () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
  .head {
    width: 100%;
    padding-left: 15px;
    color: #455a64;;
  }
  .content {
    width: 100%;
    height: 100%;
    margin-bottom: 45px;
    /*overflow: auto;*/
  }
  /*.footer {*/
  /*  position: absolute;*/
  /*  bottom: 0;*/
  /*}*/

</style>
