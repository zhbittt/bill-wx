<template>
  <div>
    <van-nav-bar
      title="账单记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-collapse v-model="bill_active" v-for="item in list" :key="item.id">
        <van-collapse-item :title="month_day_format(item.pay_time) + '：' + item.name" :name="item.id"
                           :value="'共' + item.amount + '元、' + item.get_pay_type_display + '支付'">
              <van-cell :title="detail.name" :value="detail.amount + '元'" center
                        :label="'单价：' + detail.price + '数量：' + detail.number" v-for="detail of item.bill_detail_record" :key="detail.id">
                <template #right-icon>
                  <van-switch v-model="detail.state" @change="updateBillDetail(detail.id, detail.state)" size="18px" style="margin-left: 10px"/>
                </template>
              </van-cell>
        </van-collapse-item>
      </van-collapse>

    </van-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Collapse, CollapseItem, NavBar, Tag, Cell, CellGroup, SwipeCell, Card, Switch } from 'vant'
import { GetBills, UpdateBillDetail } from '../../api/base'

Vue.use(List)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(NavBar)
Vue.use(Tag)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Switch)

export default {
  name: 'list',
  data () {
    return {
      loading: false,
      finished: false,
      bill_active: [],
      activeNames: [],
      list: []
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      GetBills().then(({data}) => {
        this.list = data
      })
    },
    timeFormat (time) { // 时间格式化
      return this.$moment(time).utc().format('YYYY-MM-DD HH:mm:ss')
    },
    month_day_format (time) {
      return this.$moment(time).utc().format('MM-DD')
    },
    onClickLeft () {
      this.$router.push({path: '/'})
    },
    updateBillDetail (id, state) {
      let data = {state: state}
      UpdateBillDetail(id, data)
      this.initList()
    }
  }
}
</script>

<style scoped>
    .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
</style>
