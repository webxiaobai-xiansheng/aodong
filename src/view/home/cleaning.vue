<template>
    <!-- 容器具清洗室 -->
    <div class="home">
        <v-cleaning class="cheBtn"></v-cleaning>
        <div class="inputBox">
            <text class="input-title">编号</text>
            <div class="input_box">
                <text class="input_item" @click="wxcButtonGetEmptySpritzerTan">{{containerNum}}</text>
            </div>
        </div>
        <div class="btns">
            <div class="btn">
                <!-- <text class="btn-txt" @click="onClack">确认</text> -->
                <wxc-button text="确认" type="blue" :disabled="isDisabled" :btn-style="btnStyle" @wxcButtonClicked="onClack"></wxc-button>
            </div>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请选择空料斗或空料桶</text>
                    </div>
                    <div class="scroller-box">
                        <scroller class="scroller">
                            <wxc-radio :list="emptyContainerList" @wxcRadioListChecked="wxcSelectEmptyContainer"></wxc-radio>
                        </scroller>
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcConfirmEmptyContainer"></wxc-button size="small">
                    </div>
                    <div class="button_box">
                        <wxc-button text="返回" type="blue" @wxcButtonClicked="black"></wxc-button>
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
import { WxcPopup, WxcRadio, WxcButton } from 'weex-ui';
import vCleaning from '../../components/vCleaning';

export default {
    data() {
        return {
            // 车间名字
            workshopName: '',
            containerNum: '',
            show: false,
            isChoseDisabled: true,
            emptyContainerList: [],
            isDisabled: true,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
            },
        }
    },
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
        });
    },
    components: {
        vCleaning,
        WxcPopup,
        WxcRadio,
        WxcButton
    },
    methods: {
        // 打开弹窗
        wxcButtonGetEmptySpritzerTan(e) {
            this.emptyContainerList = [];
            let _this = this;
            let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber=' + this.workshopName;
            stream.fetch({
                method: "GET",
                url: url,
                type: 'json',
            }, function(ret) {
                console.log(ret)
                if (ret.data.status === 1) {
                    if (ret.data.data.length > 0) {
                        for (let i = 0; i < ret.data.data.length; i++) {
                            _this.emptyContainerList.push({ title: ret.data.data[i].containerNumber, value: ret.data.data[i].containerNumber })
                        }
                        _this.show = true;
                    } else {
                        modal.toast({ message: '该车间没有料桶', duration: 2 });
                    }
                }
            })
        },
        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },
        // 选择空料桶
        wxcSelectEmptyContainer(e) {
            this.isChoseDisabled = false;
            this.isDisabled = false;
            this.containerNum = e.value;
        },

        // 选择选择空料斗、料桶--确认按钮
        wxcConfirmEmptyContainer(e) {
            this.show = false;
        },
        // 返回
        black() {
            this.show = false;
        },
        // 确认按钮
        onClack(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                if (this.containerNum !== 'undefined' && this.workshopName !== 'undefined') {
                    let url = 'http://10.34.10.177:8999/delivery/sendEmptyContainer';
                    let body = JSON.stringify({
                        containerNumber: _this.containerNum,
                        functionRoomNumber: _this.workshopName
                    });
                    stream.fetch({
                        method: "POST",
                        url: url,
                        headers: { 'Content-Type': 'application/json' },
                        body: body,
                        type: 'json',
                        timeout: 30000
                    }, function(ret) {
                        if (ret.data.status === 1) {
                            _this.containerNum = ' ';
                            modal.toast({ message: ret.data.message, duration: 2 });
                            const Steve = new BroadcastChannel('Avengers');
                            Steve.postMessage('Assemble!');
                            _this.isDisabled = false;
                        } else {
                            _this.containerNum = ' ';
                            modal.toast({ message: ret.data.message, duration: 2 });
                            _this.isDisabled = false;
                        }
                    })
                } else {
                    modal.toast({ message: '请输入桶编号', duration: 2 });
                    _this.isDisabled = false;
                }
            }
        }
    }
}
</script>
<style scoped>
.home {
    padding: 30px;
}

.cheBtn {
    margin-bottom: 80px;
}

.inputBox {
    margin-bottom: 80px;
}

.btns {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

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

.input_box {
    flex: 2;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    margin-bottom: 40;
    padding-left: 20;
}

.input_item {
    line-height: 90px;
    height: 90px;
    font-size: 30px;
}

.input-title {
    flex: 1;
    text-align: center;
    font-size: 35px;
    height: 90px;
    line-height: 90px;
}

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

.mask-container {
    justify-content: center;
    align-items: center;
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

.mask-title {
    align-items: center;
}

.title {
    font-size: 28px;
}

.button_box {
    margin-top: 20px;
    align-items: center;
}

.bottom {
    margin-top: 40px;
}
</style>