<template>
    <!-- 车子报错，车间和桶重新绑定 -->
    <div>
        <div class="btn" @click="wxcButtonResetContainer">
            <text class="btn-txt">车间用桶管理</text>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请输入桶的编号</text>
                    </div>
                    <div class="input_box">
                        <input v-model="resetContainerNum" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInput">
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isResetContainerDisabled" @wxcButtonClicked="wxcConfirmContainer"></wxc-button size="small">
                    </div>
                </div>
            </wxc-popup>
        </div>
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
        resetContainerNum: '',
        functionRoomNumber:'',
        show: false,
        isResetContainerDisabled: true,
    }),
    methods: {
        // 打开弹窗
        wxcButtonResetContainer(e) {
            console.log(e);
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

        //输入桶编号
        onInput() {
            if (this.resetContainerNum) {
                this.isResetContainerDisabled = false;
            } else {
                this.isResetContainerDisabled = true;
                modal.toast({message:'桶编号不能为空'})
            }
        },

        // 确认按钮
        wxcConfirmContainer(e) {
            if (e.disabled) {
                return;
            } else {
                let that = this;
                let url = 'http://10.34.10.25:8999/obtain/workshopBucketManagement';
                storage.getItem('workShopName', event => {
                    console.log(event.data);
                    that.functionRoomNumber = event.data;
                });
                let body = JSON.stringify({
                    functionRoomNumber: that.functionRoomNumber,
                    containerNumber: that.resetContainerNum
                });
                stream.fetch({
                    method: "POST",
                    type: 'json',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                }, function(ret) {
                    console.log(ret)
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
    margin-bottom: 40;
    margin-top: 50;
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