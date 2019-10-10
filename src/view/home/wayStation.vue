<template>
    <!-- 中间站 -->
    <div class="home">
        <v-popover-way></v-popover-way>
        <way-table class="table"></way-table>
        <wxc-popup popup-color="#fff" :show="showproduct" pos="bottom" @wxcPopupOverlayClicked="popupOverlayBottomClick" height="500">
            <div class="demo-content">
                <div class="mask-title">
                    <text class="title">复核</text>
                </div>
                <div class="inputBox">
                    <text class="input-title">功能间</text>
                    <div class="input_box">
                        <text class="input_item">{{functionNumber}}</text>
                    </div>
                </div>
                <div class="inputBox">
                    <text class="input-title">编号</text>
                    <div class="input_box">
                        <text class="input_item">{{containerNumber}}</text>
                    </div>
                </div>
                <div class="inputBox">
                    <text class="input-title">产品名称</text>
                    <div class="input_box">
                        <text class="input_item">{{productName}}</text>
                    </div>
                </div>
                <div class="button_box">
                    <wxc-button text="允许" type="blue" :disabled="confirmDisabled" @wxcButtonClicked="wxcChoseAllow" size="medium"></wxc-button>
                    <wxc-button text="拒绝" type="blue" :disabled="cancelDisabled" @wxcButtonClicked="wxcChoseRefuse" size="medium"></wxc-button>
                </div>
            </div>
        </wxc-popup>
        <div class="videoView">
            <video class="video" src="http://10.34.10.177:8999/video/1.mp4" controls="nocontrols" play-status='pause' auto-play='true' v-if="showlist"></video>
        </div>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
// const Stark = new BroadcastChannel('Avengers');
import vPopoverWay from '../../components/vPopoverWay';
import wayTable from '../../components/wayTable';
import { WxcButton, WxcPopup } from 'weex-ui';
export default {
    data() {
        return {
            functionNumber: '',
            containerNumber: '',
            productName: '',
            id: '',
            showproduct: false,
            time: '',
            showlist: false,
            confirmDisabled: false,
            cancelDisabled: false
        }
    },
    components: {
        vPopoverWay,
        wayTable,
        WxcButton,
        WxcPopup
    },
    created() {
        this.$nextTick(function() {
            this.time = setInterval(this.timer, 10000);
        })
    },
    methods: {
        timer() {
            let _this = this;
            let url = 'http://10.34.10.177:8999/agvTask/getReviewTask';
            stream.fetch({
                method: "GET",
                url: url,
                type: 'json',
            }, function(ret) {
                console.log(ret)
                if (ret.data.status === 1) {
                    if (ret.data.message === '没有需要复核任务') {

                    } else if (ret.data.message === '有未复核通过任务') {
                        _this.showlist = true;
                        clearInterval(_this.time);
                        _this.showproduct = true;

                        switch (ret.data.data.functionNumber) {
                            case 'WL':
                                _this.functionNumber = '批料待发室';
                                break;
                            case 'ZH':
                                _this.functionNumber = '批混室';
                                break;
                            case 'ZL':
                                _this.functionNumber = '制粒室';
                                break;
                            case 'JN1':
                                _this.functionNumber = '胶囊填充室1';
                                break;
                            case 'JN2':
                                _this.functionNumber = '胶囊填充室2';
                                break;
                            case 'JN3':
                                _this.functionNumber = '胶囊填充室3';
                                break;
                            case 'YP1':
                                _this.functionNumber = '压片室1';
                                break;
                            case 'YP2':
                                _this.functionNumber = '压片室2';
                                break;
                            case 'BY':
                                _this.functionNumber = '包衣室';
                                break;
                            case 'PBZ':
                                _this.functionNumber = '瓶包装室';
                                break;
                            case 'LSBZ1':
                                _this.functionNumber = '铝塑包装室1';
                                break;
                            case 'LSBZ2':
                                _this.functionNumber = '铝塑包装室2';
                                break;
                            case 'LSBZ3':
                                _this.functionNumber = '铝塑包装室3';
                                break;
                            case 'ZJ':
                                _this.functionNumber = '中间站';
                                break;
                            case 'QXCK':
                                _this.functionNumber = '容器具清洗室';
                        }
                        // _this.functionNumber=ret.data.data.functionNumber;
                        _this.containerNumber = ret.data.data.containerNumber;
                        _this.productName = ret.data.data.drugName;
                        _this.id = ret.data.data.taskId;
                    }
                } else {
                    modal.toast({ message: ret.data.message, duration: 2 });
                }
            })
        },
        //非状态组件，需要在这里关闭
        popupOverlayBottomClick() {
            this.showproduct = false;
        },
        wxcChoseAllow(e) {
            let _this = this;
            _this.confirmDisabled = true;
            _this.showproduct = false;
            if (e.disabled) {
                _this.confirmDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8999/obtain/reviewVerify';
                let body = JSON.stringify({
                    taskId: _this.id,
                    functionNumber: _this.functionNumber,
                    containerNumber: _this.containerNumber,
                    drugName: _this.productName
                });
                stream.fetch({
                    method: "POST",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                    type: 'json',
                    timeout:30000
                }, function(ret) {
                    // 订阅者
                    const Steve = new BroadcastChannel('Avengers')
                    Steve.postMessage('Assemble!')
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.showproduct = false;
                        setInterval(_this.timer, 10000);
                        _this.showlist = false;
                        _this.confirmDisabled = false;
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.confirmDisabled = false;
                    }
                })
            }

        },
        wxcChoseRefuse(e) {
            let _this = this;
            _this.cancelDisabled = true;
            if (e.disabled) {
                _this.cancelDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8999/obtain/reviewRefuse';
                let body = JSON.stringify({
                    taskId: _this.id,
                    functionNumber: _this.functionNumber,
                    containerNumber: _this.containerNumber,
                    drugName: _this.productName
                });
                stream.fetch({
                    method: "POST",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                    type: 'json',
                }, function(ret, callback, progressCallback) {
                    if (ret.data.status === 1) {
                        _this.cancelDisabled = false;
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.showproduct = false;
                        setInterval(_this.timer, 10000);
                        _this.showlist = false;
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.cancelDisabled = false;
                    }
                })
            }

        }
    },
    destroyed() {
        clearInterval(this.timer); // 清除定时器
        this.timer = null;
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

.login-txt {
    padding: 20px;
}


.input_item {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
}

.button_box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
}

.mask-content {
    padding-top: 20;
}

.mask-title {
    padding: 20px 0;
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

.button {
    align-items: center;
}

.video {
    width: 630px;
    height: 350px;
    margin-top: 60px;
    margin-left: 60px;
    /* opacity: 0; */
}

.info {
    margin-top: 40px;
    font-size: 40px;
    text-align: center;
    opacity: 0;
}

.videoView {
    opacity: 0;
}
</style>