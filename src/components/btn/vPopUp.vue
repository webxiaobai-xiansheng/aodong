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
                <text class="input-title">容器名称</text>
                <div class="input_box">
                    <text class="input_item" @click="onProduct">{{userProduct}}</text>
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">批号</text>
                <div class="input_box">
                    <input v-model="userBatch" class="input_item" type="text">
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">日期</text>
                <div class="input_box">
                    <text class="input_item" @click="pickDateHandle">{{userTime}}</text>
                    <!-- <text class="input_item" @click="showCalendar">{{userTime}}</text> -->
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">状态</text>
                <div class="input_box">
                    <text class="input_item" @click="onStatus">{{userStatus}}</text>
                </div>
            </div>
            <div class="inputBox" v-if="workshopName==='ZJ'">
                <text class="input-title">物料名称</text>
                <div class="input_box">
                    <input v-model="userMaterial" class="input_item" type="text">
                </div>
            </div>
            <div class="inputBox" v-if="workshopName!=='PBZ'||workshopName!=='LSBZ1'||workshopName!=='LSBZ2'">
                <text class="input-title">检验状态</text>
                <div class="input_box">
                    <text class="input_item" @click="onQalified">{{userQalified}}</text>
                </div>
            </div>
        </div>
        <div class="button_box">
            <wxc-button text="确定" type="blue" @wxcButtonClicked="login" :disabled="isDisabled"></wxc-button>
        </div>
        <div class="button_box">
            <wxc-button text="返回" type="blue" @wxcButtonClicked="black"></wxc-button>
        </div>
        <!-- 桶编号 -->
        <wxc-popup popup-color="#fff" :show="showBucket" pos="left" height="400">
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
        <wxc-popup popup-color="#fff" :show="showstatus" pos="left" height="400">
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
        <wxc-popup popup-color="#fff" :show="showqualified" pos="left" height="400">
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
        <wxc-popup popup-color="#fff" :show="showproduct" pos="left" height="400">
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
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const navigator = weex.requireModule('navigator');
const picker = weex.requireModule('picker');
import { WxcButton, WxcRadio, WxcPageCalendar, WxcPopup } from 'weex-ui';
export default {
    components: { WxcButton, WxcRadio, WxcPageCalendar, WxcPopup },
    data: () => ({
        // 车间名字
        workshopName: '',
        // 变量
        userBucket: '',
        userProduct: '',
        userBatch: '',
        userTime: '',
        userStatus: '',
        userMaterial: '',
        userQalified: '',
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
        list: [],
        qualified: [{
                title: '合格',
                value: '合格'
            },
            {
                title: '不合格',
                value: '不合格'
            },
            {
                title: '待验',
                value: '待验'
            }
        ],
        status: [{
                title: '原辅料',
                value: '原辅料'
            },
            {
                title: '未混颗粒',
                value: '未混颗粒'
            },
            {
                title: '已混颗粒',
                value: '已混颗粒'
            },
            {
                title: '胶囊',
                value: '胶囊'
            },
            {
                title: '素片',
                value: '素片'
            },
            {
                title: '包衣片',
                value: '包衣片'
            }
        ],
        product: [{
                title: '心脑舒通胶囊',
                value: '心脑舒通胶囊'
            },
            {
                title: '心脑舒通片',
                value: '心脑舒通片'
            },
            {
                title: '复方益肝灵片',
                value: '复方益肝灵片'
            },
            {
                title: '心清脑止痛胶囊',
                value: '心清脑止痛胶囊'
            },
            {
                title: '豨桐胶囊',
                value: '豨桐胶囊'
            },
            {
                title: '甘草锌胶囊',
                value: '甘草锌胶囊'
            },
            {
                title: '清眩降压片',
                value: '清眩降压片'
            },
            {
                title: '通便灵胶囊',
                value: '通便灵胶囊'
            },
            {
                title: '乳酸左氧氟沙星胶囊',
                value: '乳酸左氧氟沙星胶囊'
            },
            {
                title: '六味地黄胶囊',
                value: '六味地黄胶囊'
            },
            {
                title: '维格列汀片',
                value: '维格列汀片'
            },
            {
                title: '复方丹参片',
                value: '复方丹参片'
            },
        ],
        // 时间参数
        // animationType: 'push',
        // currentDate: '',
        // selectedDate: ['2019-08-23', '2020-06-30'],
        // isRange: false,
        // calendarTitle: '选择日期',
        // // dateRange: ['1949-10-23', '3020-06-30'],
        // minibarCfg: {
        //     title: '日期选择'
        // },

        isBottomShow: false,
        // 定时器测试
        count: 0,
        time: '',
        isDisabled: false
    }),
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
            this.onInit();
        });
    },
    methods: {
        // 桶编号
        onBucket() {
            this.showBucket = true;
        },
        // 产品名称
        onProduct() {
            this.showproduct = true;

        },
        // 状态
        onStatus() {
            this.showstatus = true;

        },
        // 校验
        onQalified() {
            this.showqualified = true;

        },

        // 选择桶号
        wxcRadioBucket(e) {
            this.userBucket = e.title
        },

        // 选择桶号--确认按钮
        wxcChoseBucket() {
            this.showBucket = false;
        },

        // 选择状态
        wxcRadiostatus(e) {
            this.userStatus = e.title
        },

        // 选择状态--确认按钮
        wxcChosestatus() {
            this.showstatus = false;
        },

        // 选择检验
        wxcRadioqualified(e) {
            this.userQalified = e.title
        },

        // 选择检验--确认按钮
        wxcChosequalified() {
            this.showqualified = false;
        },

        // 选择产品名称
        wxcRadioproduct(e) {
            this.userProduct = e.title;
        },

        // 选择产品名称--确认按钮
        wxcChoseproduct() {
            this.showproduct = false;
            this.isLoginDisabled = false;
        },

        // 时间
        wxcPageCalendarDateSelected(e) {
            this.userTime = e.date.join("")
            this.selectedDate = e.date;
            this.currentDate = e.date;
        },
        wxcPageCalendarBackClicked() {},
        showCalendar() {
            this.isRange = false;
            setTimeout(() => {
                this.$refs['wxcPageCalendar'].show();
            }, 10);
        },

        // 定时器
        timer() {
            this.count++;
            console.log(this.count)
            if (this.count > 10) {
                clearInterval(this.time)
            }
        },

        // 提交按钮
        login() {
            let _this = this;

            let url = 'http://10.34.10.177:8999/delivery/sendContainer';
            let body = JSON.stringify({
                functionNumber: _this.workshopName,
                containerNumber: _this.userBucket,
                productName: _this.userProduct,
                lotNumber: _this.userBatch,
                status: _this.userStatus,
                inspectionStatus: _this.userQalified,
                materialName: _this.userMaterial,
                productDate: _this.userTime
            });

            if (_this.userBucket != '' && _this.userProduct != '' && _this.userBatch != '' && _this.userTime != '' && _this.userStatus != '' && _this.userQalified != '') {
                stream.fetch({
                    method: "POST",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                    type: 'json',
                }, function(ret) {
                    if (ret.data.status === 1) {
                        const Steve = new BroadcastChannel('Avengers')
                        Steve.postMessage('Assemble!')
                        modal.toast({ message: ret.data.message, duration: 2 });
                        //    _this.$router.go(-1);
                        _this.time = setInterval(_this.timer, 1000);
                        _this.isDisabled = true;
                    } else {
                        _this.isDisabled = false;
                        modal.toast({ message: ret.data.message, duration: 2 });
                    }
                })
                this.$router.go(-1);
            } else {
                modal.toast({ message: '请完善所有的信息' })
            }
        },
        black() {
            this.$router.go(-1);
        },
        openBottomPopup() {
            this.isBottomShow = true;
        },
        //非状态组件，需要在这里关闭
        popupOverlayBottomClick() {
            this.isBottomShow = false;
        },
        pickDateHandle() {
            const _this = this;
            picker.pickDate({
                    value: this.userTime,

                },
                ret => {
                    if (ret.result === 'success') _this.userTime = ret.data;
                }
            );
        },
        onInit() {
            let _this = this;
            // let name = this.workshopName;
            // console.log(name)
            // // modal.toast({ message: '你是'+name, duration: 10 });
            let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber=' + this.workshopName;
            // modal.toast({ message: url,duration: 2});
            // let body = JSON.stringify({
            //     // functionRoomNumber: _this.workshopName
            // });
            stream.fetch({
                method: "GET",
                url: url,
                // headers:{'Content-Type':'application/json'},
                // body: body,
                type: 'json',
            }, function(ret) {
                // console.log(ret)

                if (ret.data.status === 1) {
                    // console.log(ret.data.data)
                    for (let i = 0; i < ret.data.data.length; i++) {
                        _this.list.push({ title: ret.data.data[i].containerNumber, value: ret.data.data[i].containerNumber })
                    }

                    // console.log(_this.list)
                }
            })

        },
    }
}
</script>
<style scoped>
.inputBox {
    display: flex;
    flex-direction: row;
}

.input-title {
    flex: 1;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
}

.input_box {
    flex: 3;
    border-style: solid;
    border-width: 1px;
    border-color: #333;
    border-radius: 10px;
    margin-bottom: 40px;
    padding-left: 20px;
}

.login_content {
    padding: 20px;
}


.input_item {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
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