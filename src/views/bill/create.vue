<template>
  <div>
    <van-nav-bar
      title="新增账单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="FormData.name"
        name="名称"
        label="名称"
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请输入名称' }]"
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="FormData.pay_time"
        label="时间选择"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="pay_type_picker"
        :value="pay_type_name"
        label="支付方式"
        placeholder="点击选择支付方式"
        @click="showPayTypePicker = true"
      />
      <van-popup v-model="showPayTypePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="pay_type_columns"
          :default-index="1"
          @confirm="onPayTypeConfirm"
          @cancel="showPayTypePicker = false"
        />
      </van-popup>
      <van-cell-group title="账单详细" class="bill_details">
        <van-cell v-for='(detail, index) in FormData.bill_detail_record' is-link :key="index" :value="'总消费：' + detail.price * detail.number + '元'" :label="'单价：' + detail.price + '元,  数量：' + detail.number" @click="editBillDetail(index)">
          <template #title>
            <span class="custom-title">{{ detail.name }}</span>
            <van-tag round type="primary">{{ get_type_display(detail.type) }}</van-tag>
          </template>
        </van-cell>
        <div style="margin-left: 10px">
          <van-button round type="info" size="mini" @click="show = true" native-type="button">新增详细</van-button>
        </div>
      </van-cell-group>
      <div style="margin-top: 30px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-dialog v-model="show" title="账单编辑" show-cancel-button @confirm="onConfirmBill" @cancel="onCancelBill">
      <van-cell-group>
          <van-field
            v-model="bill_detail.name"
            name="名称"
            label="名称"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请输入名称' }]"></van-field>
          <van-field v-model="bill_detail.price" type="number" label="价格" />
          <van-field name="stepper" label="数量">
            <template #input>
              <van-stepper v-model="bill_detail.number" />
            </template>
          </van-field>
        <van-field
          readonly
          clickable
          label="消费类型"
          :value="type_name"
          placeholder="请选择消费类型"
          @click="showTypePicker = true"
        />
        <van-popup v-model="showTypePicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="type_columns"
            @cancel="showTypePicker = false"
            @confirm="onConfirmType"
          />
        </van-popup>
        </van-cell-group>
    </van-dialog>
  </div>

</template>

<script>
import Vue from 'vue'
import { Field, Button, DatetimePicker, Form, Popup, Radio, RadioGroup, Picker, Cell, CellGroup, Tag, Overlay, Stepper, Dialog, NavBar } from 'vant'
import { AddBills } from '../../api/base'

Vue.use(Field)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Picker)
Vue.use(DatetimePicker)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Overlay)
Vue.use(Stepper)
Vue.use(Dialog)
Vue.use(NavBar)

export default {
  name: 'create',
  data () {
    return {
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showTypePicker: false,
      type_columns: ['请选择', '餐饮美食', '服饰装扮', '日用百货', '家居家装', '数码电器', '运动户外', '美容美发', '交通出行', '住房物业', '酒店旅游', '娱乐消费', '医疗健康', '保险', '充值缴费', '其他'],
      type_name: '',
      showPicker: false,
      showPayTypePicker: false,
      pay_type_columns: ['现金', '微信', '支付宝', '信用卡'],
      pay_type_name: '',
      currentDate: new Date(),
      FormData: {
        name: '',
        pay_time: '',
        pay_type: '',
        bill_detail_record: [
        ]
      },
      bill_detail: {
        name: '',
        price: 0,
        number: 1,
        type: 1
      },
      edit_bill_detail_index: null
    }
  },
  created () {
  },
  methods: {
    onSubmit () {
      AddBills(this.FormData).then(({data}) => {
        this.$router.push({ path: '/bills' })
      })
    },
    onConfirm (time) {
      console.log(time)
      this.FormData.pay_time = this.timeFormat(time)
      this.showPicker = false
    },
    onConfirmType (item, index) {
      this.type_name = item
      this.bill_detail.type = index
      this.showTypePicker = false
    },
    timeFormat (time) { // 时间格式化
      return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    onPayTypeConfirm (value, index) {
      this.pay_type_name = value
      this.FormData.pay_type = index + 1
      this.showPayTypePicker = false
    },
    get_type_display (id) {
      let value = ''
      if (id === 1) {
        value = '餐饮美食'
      } else if (id === 2) {
        value = '服饰装扮'
      } else if (id === 3) {
        value = '日用百货'
      } else if (id === 4) {
        value = '家居家装'
      } else if (id === 5) {
        value = '数码电器'
      } else if (id === 6) {
        value = '运动户外'
      } else if (id === 7) {
        value = '美容美发'
      } else if (id === 8) {
        value = '交通出行'
      } else if (id === 9) {
        value = '住房物业'
      } else if (id === 10) {
        value = '酒店旅游'
      } else if (id === 11) {
        value = '娱乐消费'
      } else if (id === 12) {
        value = '医疗健康'
      } else if (id === 13) {
        value = '保险'
      } else if (id === 14) {
        value = '充值缴费'
      } else {
        value = '其他'
      }
      return value
    },
    onConfirmBill () {
      if (this.edit_bill_detail_index !== null) {
        this.FormData.bill_detail_record.splice(this.edit_bill_detail_index, 1, Object.assign({}, this.bill_detail))
        this.edit_bill_detail_index = null
      } else {
        this.FormData.bill_detail_record.push(Object.assign({}, this.bill_detail))
      }
      this.set_default_bill_detail()
    },
    onCancelBill () {
      this.set_default_bill_detail()
    },
    set_default_bill_detail () {
      this.bill_detail = {
        name: '',
        price: 0,
        number: 1,
        type: 1
      }
      this.type_name = this.get_type_display(this.bill_detail.type)
    },
    editBillDetail (index) {
      this.edit_bill_detail_index = index
      this.bill_detail = Object.assign({}, this.FormData.bill_detail_record[index])
      this.type_name = this.get_type_display(this.bill_detail.type)
      this.show = true
    },
    onClickLeft () {
      this.$router.push({ path: '/bills' })
    }
  }
}
</script>

<style scoped>
  .form {
    margin: 5px;
  }
  .bill_details {
    margin-left: 10px;
  }
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

</style>
