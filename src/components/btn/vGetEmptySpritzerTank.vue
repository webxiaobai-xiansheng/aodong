<template>
    <!-- 送空料桶功能 -->
    <div>
        <div class="btn" @click="wxcButtonGetEmptySpritzerTank">
            <text class="btn-txt">送空料桶</text>
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
                </div>
            </wxc-popup>
        </div>
    </div>
</template>
<script>
import { WxcPopup, WxcRadio } from 'weex-ui';
export default {
    components: { WxcPopup, WxcRadio },
    data: () => ({
        show: false,
        isChoseDisabled: true,
        emptyContainerList: [{
            title: '空桶1',
            value: 'A009'
        }, {
            title: '空桶2',
            value: 'A000'
        }, {
            title: '空桶2',
            value: 'A000'
        }, {
            title: '空桶2',
            value: 'A000'
        }]
    }),
    methods: {
        // 打开弹窗
        wxcButtonGetEmptySpritzerTank(e) {
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
        // 选择空料桶
        wxcSelectEmptyContainer(e) {
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
            }
        },

        // 选择选择空料斗、料桶--确认按钮
        wxcConfirmEmptyContainer(e) {
            if (e.disabled) {
                return;
            } else {
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
</style>