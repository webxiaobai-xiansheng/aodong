<template>
  <!-- 送料斗功能 -->
  <!-- <wxc-button text="送料斗" type="blue" size="small"
              @wxcButtonClicked="wxcButtonGetSpritzerHopper"></wxc-button> -->
  <div>
    <div class="btn" @click="wxcButtonGetSpritzerHopper">
      <text class="btn-txt">送料斗</text>
    </div>
    <!-- <wxc-mask height="800"
              width="702"
              border-radius="0"
              duration="200"
              mask-bg-color="#FFFFFF"
              :has-animation="hasAnimation"
              :has-overlay="true"
              :show-close="true"
              :show="show"
              @wxcMaskSetHidden="wxcMaskSetHidden">
      <div class="content">
        <div class="demo-title">
          <text class="title">输入配料信息</text>
        </div>
        <div>
          <span>桶编号</span>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div>
          <span>产品名称</span>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div>
          <span>批号</span>
          <input type="text">
        </div>
        <div>
          <span>日期</span>
          <wxc-page-calendar 
                       :animationType="animationType"
                       :selected-date="selectedDate"
                       :minibar-cfg="minibarCfg"
                       @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                       @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
                       ref="wxcPageCalendar"></wxc-page-calendar>
        </div>
        <div>
          <span>状态</span>
          <select>
            <option value="volvo">原辅料</option>
            <option value="saab">未混颗粒</option>
            <option value="opel">已混颗粒</option>
            <option value="audi">状态有原辅料</option>
            <option value="audi">未混颗粒</option>
            <option value="audi">已混颗粒</option>
            <option value="audi">待清洗</option>
            <option value="audi">已清洗</option>
          </select>
        </div>
      </div>
    </wxc-mask> -->
  </div>
</template>


<script>
import { WxcMask,WxcPageCalendar } from 'weex-ui'
export default {
  components: { WxcMask,WxcPageCalendar },
  data: () => ({
      show: false,
      overlayCanClose: true,
      isFalse: false,
      hasAnimation: true,

      animationType: 'push',
      selectedDate: ['2017-06-23', '2017-06-30'],
      calendarTitle: '选择日期',
      minibarCfg: {
        title: '日期选择'
      }
    }),
  methods: {
    wxcButtonGetSpritzerHopper (e) {
      console.log(e)
    },
    // openMask (e) {
    //   this.show = true;
    //   this.hasAnimation = true;
    // },
    // wxcMaskSetHidden () {
    //   this.show = false;
    // },
    // openNoAnimationMask (e) {
    //   this.show = true;
    //   this.hasAnimation = false;
    // },
    // wxcPageCalendarDateSelected (e) {
    //   this.selectedDate = e.date;
    //   this.currentDate = e.date;
    // },
    // wxcPageCalendarBackClicked () {
    // },
    // showCalendar () {
    //   this.isRange = false;
    //   setTimeout(() => {
    //     this.$refs['wxcPageCalendar'].show();
    //   }, 10);
    // },
    // showReturnCalendar () {
    //   this.isRange = true;
    //   setTimeout(() => {
    //     this.$refs['wxcPageCalendar'].show();
    //   }, 10);
    // }
  }
}
</script>

<style scoped>
.btn{
  display: flex;
  justify-content: center;
  background-color:#0099ff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.btn-txt{
  text-align: center;
  margin: 0 auto;
  color: #fff;
}
</style>