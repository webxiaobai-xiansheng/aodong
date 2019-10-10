<template>
    <!-- 送空料桶回中间站功能 -->
    <div>
        <!-- <div class="btn" @click="wxcButtonGetSpritzerHopperBack">
            <text class="btn-txt">送空料桶回中间站</text>
        </div> -->
        <div class="btn">
            <wxc-button text="送空料桶回中间站" type="blue" :disabled="isDisabled" :btn-style="btnStyle" :text-style="textStyle" @wxcButtonClicked="wxcButtonGetSpritzerHopperBack"></wxc-button>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请选择空料桶</text>
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
export default {
    components: { WxcPopup, WxcRadio, WxcButton },
    data() {
        return {
            // 车间名字
            workshopName: '',
            containerNum: '',
            show: false,
            isChoseDisabled: true,
            emptyContainerList: [],
            isDisabled: false,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
            },
            textStyle: {
                fontSize: '35px',
                color: '#ffffff',
                textAlign: 'center'
            }
        }
    },
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
        });
        storage.getItem('containerNum', event => {
            this.containerNum = event.data;
        });
    },
    methods: {
        wxcButtonGetSpritzerHopperBack(e) {
            this.emptyContainerList = [];
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber=' + this.workshopName;
                stream.fetch({
                    method: "GET",
                    url: url,
                    type: 'json',
                    timeout: 30000
                }, function(ret) {
                    if (ret.data.status === 1) {
                        _this.isDisabled = false;
                        if (ret.data.data.length > 0) {
                            for (let i = 0; i < ret.data.data.length; i++) {
                                _this.emptyContainerList.push({ title: ret.data.data[i].containerNumber, value: ret.data.data[i].containerNumber })
                            }
                            _this.show = true
                        } else {
                            modal.toast({ message: '该车间没有料桶，请尝试其他操作', duration: 2 });
                        }
                    }

                })
            }
        },
        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },
        // 选择空料桶
        wxcSelectEmptyContainer(e) {
            this.isChoseDisabled = false;
            this.containerNum = e.value
        },
        black() {
            this.show = false;
        },
        // 选择选择空料斗、料桶--确认按钮
        wxcConfirmEmptyContainer(e) {
            let _this = this;
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
                }, function(ret) {
                    if (ret.data.status === 1) {
                        const Steve = new BroadcastChannel('Avengers')
                        Steve.postMessage('Assemble!')
                        modal.toast({ message: ret.data.message, duration: 2 });
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                    }
                })
            } else {
                modal.toast({ message: '请选择桶编号', duration: 2 });
            }
            this.show = false;
        }
    }

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