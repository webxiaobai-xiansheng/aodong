<template>
    <!-- 桶/库位绑定 -->
    <div>
        <div class="btn" @click="wxcButtonContainerLocation">
            <text class="btn-txt">桶/库位绑定</text>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">桶/库位绑定</text>
                    </div>
                    <div class="input_box">
                        <input v-model="ContainerNum" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInputContainer">
                    </div>
                    <div class="input_box">
                        <input v-model="LocationNum" class="input_item" type="text" placeholder="请输入库位的编号" @input="onInputContainer">
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isDisabled" @wxcButtonClicked="wxcConfirmContainer"></wxc-button size="small">
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="查看" type="blue" :disabled="isCheckDisabled" @wxcButtonClicked="wxcConfirmContainer"></wxc-button size="small">
                    </div>
                </div>
            </wxc-popup>
        </div>
        <!-- <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcConfirmContainer"></wxc-button size="small"> -->
    </div>
</template>
<script>
const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const modal = weex.requireModule('modal');
import { WxcPopup, WxcButton } from 'weex-ui';
export default {
    components: { WxcPopup, WxcButton },
    data: () => ({
        ContainerNum: '',
        LocationNum: '',
        show: false,
        isDisabled: true,
        isCheckDisabled: true,
        list:[]
    }),
    methods: {
        // 打开弹窗
        wxcButtonContainerLocation(e) {
            if (e.disabled) {
                return;
            } else {
                this.show = true;
            }
        },
        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },

        //输入桶编号和库位编号
        onInputContainer() {
            if (this.ContainerNum && this.LocationNum) {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
                if (!this.ContainerNum) {
                    modal.toast({ message: '桶编号不能为空' });
                } else if (!this.LocationNum) {
                    modal.toast({ message: '库位号不能为空' });
                }
            }
        },

        // 确认按钮
        wxcConfirmContainer(e) {
            if (e.disabled) {
                return;
            } else {
                console.log('jinru');
                let that = this;
                let url = 'http://10.34.10.53:8200/containerFunctionLocation/saveContainerFunctionLocation';
                let body = JSON.stringify({
                    containerFunctionNumber: 'oooo',
                    containerFunctionQrCodeNumber: 'ooiuuuuuu'
                });
                stream.fetch({
                    method: "POST",
                    type: 'json',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                }, function(ret) {
                    console.log(ret);
                    let data = ret.data.data;
                    if (ret.status === 200) {
                        if (ret.data.status === 1) {
                            modal.toast({ message: ret.data.message });
                        } else {
                            modal.toast({ message: ret.data.message });
                        }
                    }
                });
                this.show = false;
            }
        },
        checkList() {
            
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

.input_box {
    margin-bottom: 20;
    margin-top: 20;
    align-items: center;
}

.input_item {
    width: 690px;
    height: 90px;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    padding-left: 20;
}
</style>