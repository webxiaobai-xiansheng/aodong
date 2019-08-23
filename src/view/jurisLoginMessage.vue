<template>
    <div class="login_content">
        <div class="container" :style="{ height: height }">
            <div class="demo">
            <wxc-minibar
                    background-color="#009ff0"
                    leftButton=""
                    @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                    @wxcMinibarRightButtonClicked="minibarRightButtonClick">
                <text style="font-size: 35px;color:#fff;" slot="middle">桶信息输入</text>
                <text slot="right" style="font-size: 35px;color:#fff;">退出</text>
            </wxc-minibar>
            </div>
        </div>
        
        <div class="login-txt">
            <div class="login_input">
                <div class="inputBox">
                    <text class="input-title">桶编号</text>
                    <div class="input_box">
                        <input v-model="userBucket" class="input_item" type="text">
                    </div>
                </div>

                <div class="inputBox">
                    <text class="input-title">产品名称</text>
                    <div class="input_box">
                        <text class="input_item" @click="onProduct">{{userProduct}}</text>
                    </div>
                </div>
                
                <!-- <div class="inputBox">
                    <text class="input-title">批号</text>
                    <div class="input_box">
                        <input v-model="userBatch " class="input_item" type="text">
                    </div>
                </div> -->

                <div class="inputBox">
                    <text class="input-title">容器容积</text>
                    <div class="input_box">
                        <input v-model="userVolume" class="input_item" type="text">
                    </div>
                </div>

                <div class="inputBox">
                    <text class="input-title">容器重量</text>
                    <div class="input_box">
                        <input v-model="userWeight" class="input_item" type="text">
                    </div>
                </div>

                <!-- <div class="inputBox">
                    <text class="input-title">日期</text>
                    <div class="input_box">
                        <text class="input_item" @click="showCalendar">{{userTime}}</text>
                    </div>
                </div> -->

                <!-- <div class="inputBox">
                    <text class="input-title">状态</text>
                    <div class="input_box">
                        <text class="input_item" @click="onStatus">{{userStatus}}</text>
                    </div>
                </div> -->
                
                <!-- <div class="inputBox">
                    <text class="input-title">物料名称</text>
                    <div class="input_box">
                        <input v-model="userMaterial" class="input_item" type="text">
                    </div>
                </div> -->

                <!-- <div class="inputBox">
                    <text class="input-title">检验状态</text>
                    <div class="input_box">
                        <text class="input_item" @click="onQalified">{{userQalified}}</text>
                    </div>
                </div> -->
            </div>

            <div class="button_box">
                <wxc-button text="确定" type="blue" @wxcButtonClicked="login"></wxc-button>
            </div>

            <div class="button_box">
                <wxc-button text="返回中间站" type="blue" @wxcButtonClicked="black"></wxc-button>
            </div>
        </div>

        <!-- 产品名称 -->
        <wxc-popup popup-color="#fff"
               :show="showproduct"
               pos="left"
               height="400">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择产品名称</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="product" @wxcRadioListChecked="wxcRadioproduct"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box button">
                    <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChoseproduct"></wxc-button size="small">
                </div>
            </div>
        </wxc-popup>

        <!-- 日期 -->
         <!-- <wxc-page-calendar :date-range="dateRange"
                       :animationType="animationType"
                       :selected-date="selectedDate"
                       :is-range="isRange"
                       :minibar-cfg="minibarCfg"
                       @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                       @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
                       ref="wxcPageCalendar">
        </wxc-page-calendar> -->
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
const navigator = weex.requireModule('navigator');
import { WxcButton, WxcRadio, WxcPageCalendar, WxcMinibar, WxcPopup } from 'weex-ui';
export default {
    components: { WxcButton, WxcRadio, WxcPageCalendar, WxcMinibar, WxcPopup },
    data: () => ({
        userBucket: '',
        userProduct:'',
        userVolume:'',
        userWeight:'',
        binOrHopper:'',
        // userTime:'2019-10-10',
        isWorkShopDisabled: true,

        // 产品名称
        showproduct: false,

        product:[
          {
            title: '空料斗',
            value: '空料斗'
          },
          {
            title: '空料桶',
            value: '空料桶'
          }
        ],

        // 时间参数
        // animationType: 'push',
        // currentDate: '',
        // selectedDate: ['2019-08-23', '2020-06-30'],
        // isRange: true,
        // calendarTitle: '选择日期',
        // dateRange: ['2019-08-23', '2020-06-30'],
        // minibarCfg: {
        //     title: '日期选择'
        // }
    }),
    methods: {
        // 产品名称
        onProduct(){
          this.showproduct=true;
        },
        // 选择产品名称
        wxcRadioproduct(e) {
            this.userProduct=e.title;
        },

        // 选择产品名称--确认按钮
        wxcChoseproduct() {
            this.showproduct = false;
            this.isLoginDisabled = false;
        },


        // 时间
        // wxcPageCalendarDateSelected (e) {
        //     this.userTime=e.date.join("")
        //     this.selectedDate = e.date;
        //     this.currentDate = e.date;
        // },
        // wxcPageCalendarBackClicked () {
        // },
        // showCalendar () {
        //     this.isRange = false;
        //     setTimeout(() => {
        //     this.$refs['wxcPageCalendar'].show();
        //     }, 10);
        // },

        // 登录按钮
        login() {
            let _this=this;
            if(this.userBucket&&this.userProduct){
                this.binOrHopper=this.userProduct==='空料斗'?'料斗':'料桶';
                let url = 'http://10.34.10.177:8200/containerInformation/saveContainerInformation';

                let body = JSON.stringify({
                    containerNumber: this.userBucket,
                    productName:this.userProduct,
                    containerVolume:this.userVolume,
                    containerWeight:this.userWeight,
                    // productDate:this.userTime,
                    binOrHopper:this.binOrHopper
                });
                
                stream.fetch({
                    method:"POST",
                    url:url,
                    headers:{'Content-Type':'application/json'},
                    body: body,
                    type:'json',
                },function(ret){
                    console.log(ret)
                    if(ret.data.status===1){
                        _this.userBucket='',
                        _this.userProduct='',
                        _this.userVolume='',
                        _this.userWeight='',
                        _this.binOrHopper='',
                        modal.toast({ message: ret.data.message,duration: 2});
                    }else{
                        modal.toast({ message: '填写失败！！！',duration: 2});
                    }
                },function(progress) {
                    // console.log(progress)
                })
            }else{
                modal.toast({ message: '请选择产品名称和请输入桶编号',duration: 2});
            }
        },
        black(){
            this.$router.push({name:'wayStation'})
        },
        minibarLeftButtonClick () {
        },
        minibarRightButtonClick () {
            modal.toast({ 'message': '退出成功', 'duration': 1 });
            this.$router.push({name:'login'})
        }
    }
}
</script>
<style scoped>
.inputBox{
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
}
.input-title{
    flex: 1;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
}
.input_box {
    flex:3;
    /* flex-direction: row; */
    border-style: solid;
    border-width: 1px;
    border-color: #333;
    border-radius: 10px;
    margin-bottom: 40px;
    padding-left: 20px;
}
.login-txt{
    padding:20px;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
}


.input_item {
    height: 60px;
    line-height:60px;
    font-size:30px;
}

.button_box {
    margin-top: 20px;
}

.mask-content {
    padding-top: 20;
}

.mask-title {
    align-items: center;
}

.title {
    font-size: 28px;
}

.mask-btns {
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.scroller-box {
    height: 606;
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}
.button{
    align-items: center;
}
</style>