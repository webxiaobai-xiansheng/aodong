<template>
  <div class="wrapper">
    <image :src="logo" class="logo" />
    <text class="greeting">海涛是我师傅！！！</text>
    <!-- <list>
      <cell>
        <div class="demo">
          <text class="demo-title">列表list展示</text>

          <wxc-cell label="标题"
                    title="Weex Ui"
                    :has-arrow="true"
                    @wxcCellClicked="wxcCellClicked"
                    :has-margin="true"></wxc-cell>

          <wxc-cell label="标题"
                    title="带链接"
                    :has-arrow="true"
                    link="https://h5.m.taobao.com/trip/home/index.html"
                    @wxcCellClicked="wxcCellClicked"
                    spm="181.12312312.12312.d01"
                    :has-top-border="false"></wxc-cell>

          <wxc-cell label="标题"
                    title="Weex Ui"
                    :has-arrow="true"
                    @wxcCellClicked="wxcCellClicked"
                    :has-top-border="false"></wxc-cell>

        </div>
        <div class="demo">
          <text class="demo-title">不配置label</text>
          <wxc-cell title="标题"
                    :has-arrow="true"
                    @wxcCellClicked="wxcCellClicked"
                    :has-top-border="true"></wxc-cell>
        </div>
        <input type="text" style="width:100px;height:100px;border:3px solid red;">
        <div class="demo">
          <text class="demo-title">配置附加信息</text>
          <wxc-cell title="标题"
                    desc="这里是附加信息"
                    :has-arrow="true"
                    @wxcCellClicked="wxcCellClicked"
                    :has-top-border="true"></wxc-cell>
        </div>

        <div class="demo">
          <text class="demo-title">不显示箭头</text>
          <wxc-cell title="标题"
                    :has-arrow="false"
                    @wxcCellClicked="wxcCellClicked"
                    :has-top-border="true"></wxc-cell>
        </div>
        <div class="demo">
          <text class="demo-title">自定义子元素</text>
          <wxc-cell title="这里是标题"
                    :has-arrow="false"
                    :has-top-border="true">
            <switch slot="value"></switch>
          </wxc-cell>
        </div>

        <div class="demo">
          <text class="value-text">基础输入框</text>
          <wxc-searchbar ref="wxc-searchbar"
                        @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                        @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                        @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                        @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                        @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                        @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
          <text class="value-text">{{value}}</text>
        </div>
        <div class="demo demo1">
          <text class="value-text">输入框禁用</text>
          <wxc-searchbar disabled="true" @wxcSearchbarInputDisabledClicked="searchbarInputDisabledOnclick"></wxc-searchbar>
        </div>
        <div class="demo demo1">
          <text class="value-text">带有目的地模式的输入框</text>
          <wxc-searchbar disabled="true"
                        placeholder="搜索目的地"
                        mod="hasDep"
                        dep-name="杭州出发"
                        @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
                        @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
        </div>

        <div class="demo">
          <text class="value-text">基础输入框</text>
          <wxc-searchbar ref="wxc-searchbar"
                        @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                        @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                        @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                        @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                        @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                        @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
          <text class="value-text">{{value}}</text>
        </div>
        <div class="demo demo1">
          <text class="value-text">输入框禁用</text>
          <wxc-searchbar disabled="true" @wxcSearchbarInputDisabledClicked="searchbarInputDisabledOnclick"></wxc-searchbar>
        </div>
        <div class="demo demo1">
          <text class="value-text">带有目的地模式的输入框</text>
          <wxc-searchbar disabled="true"
                        placeholder="搜索目的地"
                        mod="hasDep"
                        dep-name="杭州出发"
                        @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
                        @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
        </div>
      </cell>
    </list> -->
    <router-view/>
  </div>
</template>

<script>
// import { WxcCell,WxcSearchbar } from 'weex-ui';
export default {
  name: 'App',
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
      value:''
    }
  },
  // components: { WxcCell,WxcSearchbar },
  //   methods: {
  //     wxcCellClicked (e) {
  //       console.log(e)
  //     },
  //      wxcSearchbarInputOnFocus () {
  //     },
  //     wxcSearchbarInputOnBlur () {
  //     },
  //     wxcSearchbarInputReturned (){
  //     },
  //     wxcSearchbarCloseClicked () {
  //     },
  //     wxcSearchbarInputOnInput (e) {
  //       this.value = e.value;
  //     },
  //     wxcSearchbarCancelClicked () {
  //     },
  //     wxcSearchbarInputDisabledClicked () {
  //     },
  //     wxcSearchbarDepChooseClicked () {
  //     }
  //   }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>
