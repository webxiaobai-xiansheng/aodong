<template>
    <!-- 人工入库输入功能 -->
    <div>
        <div class="btn">
            <wxc-button text="人工运输" type="blue" :btn-style="btnStyle" @wxcButtonClicked="wxcButtonManualStorage"></wxc-button>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="showList" @wxcPopupOverlayClicked="wxcMaskSetHiddenList" pos="left" height="400">
                <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioList"></wxc-radio>
                <div class="button_box">
                        <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcConfirmList" :disabled="isConfirmDisabled"></wxc-button>
                    </div>
                    <div class="button_box">
                        <wxc-button text="返回" type="blue" @wxcButtonClicked="backList"></wxc-button>
                    </div>
            </wxc-popup>
            <!-- 非空桶的情况 -->
            <wxc-popup popup-color="#fff" :show="showFull" @wxcPopupOverlayClicked="wxcMaskSetHiddenFull" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请填写失败的桶的信息</text>
                    </div>
                    <div class="login_content">
                        <div class="login_input">
                            <div class="inputBox">
                                <text class="input-title">桶编号</text>
                                <div class="input_box">
                                    <input v-model="userBucket" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInputContainer">
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
                                    <input v-model="userBatch" class="input_item" type="text" placeholder="请输入批号">
                                </div>
                            </div>
                            <div class="inputBox">
                                <text class="input-title">日期</text>
                                <div class="input_box">
                                    <text class="input_item" @click="pickDateHandle">{{userTime}}</text>
                                </div>
                            </div>
                            <div class="inputBox">
                                <text class="input-title">状态</text>
                                <div class="input_box">
                                    <text class="input_item" @click="onStatus">{{userStatus}}</text>
                                </div>
                            </div>
                            <div class="inputBox">
                                <text class="input-title">检验状态</text>
                                <div class="input_box">
                                    <text class="input_item" @click="onQalified">{{userQalified}}</text>
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div class="button_box">
                        <wxc-button text="确定" type="blue" @wxcButtonClicked="loginFull" :disabled="isConfirmDisabled"></wxc-button>
                    </div>
                    <div class="button_box">
                        <wxc-button text="返回" type="blue" @wxcButtonClicked="back"></wxc-button>
                    </div>
                </div>
            </wxc-popup>
            <!-- 空桶的情况下 -->
            <wxc-popup popup-color="#fff" :show="showEmpty" @wxcPopupOverlayClicked="wxcMaskSetHiddenEmpty" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请填写失败的桶的信息</text>
                    </div>
                    <div class="login_content">
                        <div class="login_input">
                            <div class="inputBox">
                                <text class="input-title">桶编号</text>
                                <div class="input_box">
                                    <input v-model="userBucket" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInputContainer">
                                </div>
                            </div>
                            <div class="inputBox">
                                <text class="input-title">日期</text>
                                <div class="input_box">
                                    <text class="input_item" @click="pickDateHandle">{{userTime}}</text>
                                </div>
                            </div>
                            <!-- <div class="inputBox">
                                <text class="input-title">状态</text>
                                <div class="input_box">
                                    <text class="input_item" @click="onStatusClean">{{userStatus}}</text>
                                </div>
                            </div> -->
                        </div>
                        <!-- 状态 -->
                        <!-- <wxc-popup popup-color="#fff" :show="showstatusClean" pos="left" height="400">
                            <div class="content mask-content">
                                <div class="mask-title">
                                    <text class="title">请选择状态</text>
                                </div>
                                <div class="scroller-box">
                                    <scroller class="scroller">
                                        <wxc-radio :list="statusClean" @wxcRadioListChecked="wxcRadiostatus"></wxc-radio>
                                    </scroller>
                                </div>
                                <div class="button_box">
                                    <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcChosestatusClean"></wxc-button size="small">
                                </div>
                            </div>
                        </wxc-popup> -->
                    </div>
                    <div class="button_box">
                        <wxc-button text="确定" type="blue" @wxcButtonClicked="loginEmpty" :disabled="isConfirmDisabled"></wxc-button>
                    </div>
                    <div class="button_box">
                        <wxc-button text="返回" type="blue" @wxcButtonClicked="back"></wxc-button>
                    </div>
                </div>
            </wxc-popup>
        </div>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const picker = weex.requireModule('picker');
import { WxcButton, WxcRadio, WxcPopup } from 'weex-ui';
export default {
    components: { WxcPopup, WxcRadio, WxcButton },
    data: () => ({
        choseList: '',
        showList:false,
        isConfirmDisabled: false,
        isChoseDisabled: false,
        showFull: false,
        showEmpty: false,
        showstatus: false, //状态-非空桶
        // showstatusClean: false, //状态-空桶
        showqualified: false, // 检验合格
        showproduct: false, // 产品名称
        userBucket: '',
        userProduct: '',
        userBatch: '',
        userTime: '',
        userStatus: '',
        userQalified: '',
        list: [{
            title: '空桶',
            value: '空桶'
        }, {
            title: '非空桶',
            value: '非空桶'
        }],
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
        // statusClean: [{
        //     title: '待清洗',
        //     value: '待清洗'
        // }, {
        //     title: '已清洗',
        //     value: '已清洗'
        // }],
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
        btnStyle: {
            width: '200px',
            height: '100px',
            borderRadius: '10px'
        }
    }),
    methods: {
        // 选择空桶/非空桶--确认
        wxcConfirmList(e) {
            let _this = this;
            if(_this.choseList === '空桶') {
                _this.showEmpty = true;
                _this.showFull = false;
            } else if (_this.choseList === '非空桶') {
                _this.showFull = true;
                _this.showEmpty = false;
            }
        },
        backList(){
            this.showList = false;
        },
        // 选择空桶/非空桶--列表
        wxcRadioList(e) {
            this.choseList = e.title;
        },
        //输入桶编号
        onInputContainer() {
            console.log('桶编号')
        },
        // 产品名称
        onProduct() {
            this.showproduct = true;
        },
        // 选择产品名称
        wxcRadioproduct(e) {
            console.log(e.title)
            this.userProduct = e.title;
        },
        // 选择产品名称--确认按钮
        wxcChoseproduct() {
            this.showproduct = false;
            this.isLoginDisabled = false;
        },
        // 选择状态
        wxcRadiostatus(e) {
            this.userStatus = e.title
        },

        // 选择状态--确认按钮 --非空桶
        wxcChosestatus() {
            this.showstatus = false;
        },

        //选择状态--确认按钮 --空桶
        // wxcChosestatusClean() {
        //     this.showstatusClean = false;
        // },

        // 选择检验
        wxcRadioqualified(e) {
            this.userQalified = e.title
        },

        // 选择检验--确认按钮
        wxcChosequalified() {
            this.showqualified = false;
        },

        // 日期
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
        // 状态
        onStatus() {
            this.showstatus = true;
        },
        // onStatusClean() {
        //     this.showstatusClean = true;
        // },
        // 检验
        onQalified() {
            this.showqualified = true;

        },
        wxcButtonManualStorage(e) {
            this.showList = true;
        },
        back() {
            this.showFull = false;
            this.showEmpty = false;
        },
        //关闭弹窗--选择空桶或非空桶
        wxcMaskSetHiddenList() {
            this.showList = false;
        },
        // 关闭弹窗--非空桶
        wxcMaskSetHiddenFull() {
            this.showFull = false;
        },
        // 关闭弹窗--空桶
        wxcMaskSetHiddenEmpty() {
            this.showEmpty = false;
        },
        // 提交按钮--非空桶
        loginFull() {
            let _this = this;

            let url = 'http://10.34.10.177:8999/delivery/manualTransportation';
            let body = JSON.stringify({
                isEmptyContainer: false,
                containerNumber: _this.userBucket,
                productName: _this.userProduct,
                lotNumber: _this.userBatch,
                status: _this.userStatus,
                inspectionStatus: _this.userQalified,
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
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.showList = false;
                        _this.showFull = false;
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                    }
                })
            } else {
                modal.toast({ message: '请完善所有的信息' })
            }
        },
        loginEmpty(){
            let _this = this;

            let url = 'http://10.34.10.177:8999/delivery/manualTransportation';
            let body = JSON.stringify({
                isEmptyContainer: true,
                containerNumber: _this.userBucket,
                productDate: _this.userTime
            });

            if (_this.userBucket != ''  && _this.userTime != '') {
                stream.fetch({
                    method: "POST",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                    type: 'json',
                }, function(ret) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.showList = false;
                        _this.showEmpty = false;
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                    }
                })
                
            } else {
                modal.toast({ message: '请完善所有的信息' })
            }
        }
    },
    created() {

    },
}
</script>
<style scoped>
.btn {
    display: flex;
    justify-content: center;
    background-color: #0099ff;
    width: 200px;
    height: 100px;
    border-radius: 10px;
}

.btn-txt {
    text-align: center;
    margin: 0 auto;
    color: #fff;
    font-size: 35px;
}

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
</style>