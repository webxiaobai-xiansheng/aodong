<template>
    <div class="login_content">
        <div class="login_input">
            <div class="inputBox">
                <text class="input-title">桶编号</text>
                <div class="input_box">
                    <text class="input_item" @click="onBucket">{{userBucket}}</text>
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">产品名称</text>
                <div class="input_box">
                    <text class="input_item" @click="onProduct">{{userProduct}}</text>
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">批号</text>
                <div class="input_box">
                    <input v-model="userBatch " class="input_item" type="text">
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">日期</text>
                <div class="input_box">
                    <text class="input_item" @click="showCalendar">{{userTime}}</text>
                </div>
            </div>

            <div class="inputBox">
                <text class="input-title">状态</text>
                <div class="input_box">
                    <text class="input_item" @click="onStatus">{{userStatus}}</text>
                </div>
            </div>
            
            <div class="inputBox">
                <text class="input-title">物料名称</text>
                <div class="input_box">
                    <input v-model="userMaterial" class="input_item" type="text">
                </div>
            </div>

            <div class="inputBox">
                <text class="input-title">检验状态</text>
                <div class="input_box">
                    <text class="input_item" @click="onQalified">{{userQalified}}</text>
                </div>
            </div>
        </div>

        <div class="button_box">
            <wxc-button text="确定" type="blue" @wxcButtonClicked="login"></wxc-button>
        </div>

        <div class="button_box">
            <wxc-button text="返回" type="blue" @wxcButtonClicked="black"></wxc-button>
        </div>

        <!-- 桶编号 -->
        <wxc-popup popup-color="#fff"
               :show="showBucket"
               pos="left"
               height="400">
               <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请选择桶编号</text>
                    </div>
                    <div class="scroller-box">
                        <scroller class="scroller">
                            <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioBucket"></wxc-radio>
                        </scroller>
                    </div>
                    <div class="button_box">
                        <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChoseBucket"></wxc-button size="small">
                    </div>
                </div>
        </wxc-popup>

        <!-- 状态 -->
        <wxc-popup popup-color="#fff"
               :show="showstatus"
               pos="left"
               height="400">
             <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择状态</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="status" @wxcRadioListChecked="wxcRadiostatus"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChosestatus"></wxc-button size="small">
                </div>
            </div>
        </wxc-popup>

        <!-- 合格 -->
        <wxc-popup popup-color="#fff"
               :show="showqualified"
               pos="left"
               height="400">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择检验合格</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="qualified" @wxcRadioListChecked="wxcRadioqualified"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box">
                    <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChosequalified"></wxc-button size="small">
                </div>
            </div>
        </wxc-popup>

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
                <div class="button_box">
                    <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChoseproduct"></wxc-button size="small">
                </div>
            </div>
        </wxc-popup>

        <!-- 日期 -->
         <wxc-page-calendar :date-range="dateRange"
                       :animationType="animationType"
                       :selected-date="selectedDate"
                       :is-range="isRange"
                       :minibar-cfg="minibarCfg"
                       @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                       @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
                       ref="wxcPageCalendar">
        </wxc-page-calendar>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
import { WxcButton, WxcRadio, WxcPageCalendar, WxcPopup } from 'weex-ui';
export default {
    components: { WxcButton,WxcRadio, WxcPageCalendar, WxcPopup },
    data: () => ({
        userBucket: '',
        userProduct:'',
        userBatch:'',
        userTime:'',
        userStatus:'',
        userMaterial:'',
        userQalified:'',
        isWorkShopDisabled: true,
        // 桶编号
        showBucket: false,
        hasAnimation: true,
        // 状态
        showstatus: false,
        // 检验合格
        showqualified: false,
        // 产品名称
        showproduct: false,
        list: [{
            title: '批料待发间',
            value: 1
        }, {
            title: '制粒间',
            value: 2
        }, {
            title: '总混间',
            value: 3
        }, {
            title: '胶囊间A',
            value: 4
        }, {
            title: '胶囊间B',
            value: 5
        }, {
            title: '压片间',
            value: 6
        }, {
            title: '包衣间',
            value: 7
        }, {
            title: '铝塑包装A',
            value: 8
        }, {
            title: '铝塑包装B',
            value: 9
        }, {
            title: '铝塑包装C',
            value: 10
        }, {
            title: '中间站',
            value: 11
        }, {
            title: '清洗间',
            value: 12
        }],
        status:[{
            title: '原辅料',
            value: 1
        }, {
            title: '未混颗粒',
            value: 2
        }, {
            title: '已混颗粒',
            value: 3
        }, {
            title: '待清洗',
            value: 4
        }, {
            title: '已清洗',
            value: 5
        }],
        qualified:[
          {
            title: '合格',
            value: 0
          },
          {
            title: '不合格',
            value: 1
          },
        ],
        product:[
          {
            title: '心脑舒通胶囊',
            value: 0
          },
          {
            title: '心脑舒通片',
            value: 1
          },
          {
            title: '复方益肝灵片',
            value: 2
          },
          {
            title: '心清脑止痛胶囊',
            value: 3
          },
          {
            title: '豨桐胶囊',
            value: 4
          },
          {
            title: '甘草锌胶囊',
            value: 5
          },
          {
            title: '清眩降压片',
            value: 6
          },
          {
            title: '通便灵胶囊',
            value: 7
          },
          {
            title: '乳酸左氧氟沙星胶囊',
            value: 8
          },
          {
            title: '六味地黄胶囊',
            value: 9
          },
          {
            title: '维格列汀片',
            value: 10
          },
          {
            title: '复方丹参片',
            value: 11
          },
        ],
        // checkedInfo: { title: '选项2', value: 2 },
        // 时间参数
        animationType: 'push',
        currentDate: '',
        selectedDate: ['2019-08-23', '2020-06-30'],
        isRange: true,
        calendarTitle: '选择日期',
        dateRange: ['2019-08-23', '2020-06-30'],
        minibarCfg: {
            title: '日期选择'
        },

        isBottomShow: false,
    }),
    methods: {
        // 桶编号
        onBucket() {
            this.showBucket=true;
            
        },
        // 产品名称
        onProduct(){
          this.showproduct=true;
          
        },
        // 状态
        onStatus(){
          this.showstatus=true;
          
        },
        // 校验
        onQalified(){
          this.showqualified=true;
          
        },

        // 选择桶号
        wxcRadioBucket(e) {
            this.userBucket=e.title
        },

        // 选择桶号--确认按钮
        wxcChoseBucket() {
            this.showBucket = false;
        },

        // 选择状态
        wxcRadiostatus(e) {
            this.userStatus=e.title
        },

        // 选择状态--确认按钮
        wxcChosestatus() {
            this.showstatus = false;
        },

        // 选择检验
        wxcRadioqualified(e) {
            this.userQalified=e.title
        },

        // 选择检验--确认按钮
        wxcChosequalified() {
            this.showqualified = false;
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
        wxcPageCalendarDateSelected (e) {
            this.userTime=e.date.join("")
            this.selectedDate = e.date;
            this.currentDate = e.date;
        },
        wxcPageCalendarBackClicked () {
        },
        showCalendar () {
            this.isRange = false;
            setTimeout(() => {
            this.$refs['wxcPageCalendar'].show();
            }, 10);
        },

        // 登录按钮
        login() {
            
        },
        black(){

        },
        openBottomPopup () {
        this.isBottomShow = true;
      },
      //非状态组件，需要在这里关闭
      popupOverlayBottomClick () {
        this.isBottomShow = false;
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
.login_content {
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
    display: flex;
    justify-content: center;
    flex-direction: row;
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
</style>