<template>
    <!-- 人工入库功能 -->
    <div>
        <div class="btn" @click="wxcButtonManualStorage">
            <text class="btn-txt">人工入库</text>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">请在下面失败任务列表种选择桶</text>
                    </div>
                    <div class="scroller-box">
                        <scroller class="scroller">
                            <wxc-radio :list="taskList" @wxcRadioListChecked="wxcSelectEmptyContainer"></wxc-radio>
                        </scroller>
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcConfirmEmptyContainer"></wxc-button size="small">
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
import { WxcPopup, WxcRadio, WxcButton } from 'weex-ui';
export default {
    components: { WxcPopup, WxcRadio, WxcButton },
    data: () => ({
        show: false,
        isChoseDisabled: true,
        taskList: [],
        taskId: '',
        containerNumber: ''
    }),
    methods: {
        // 打开弹窗
        wxcButtonManualStorage(e) {
            this.taskList = [];
            let _this = this;
            let url = 'http://10.34.10.177:8999/agvTask/getFailureAgvTaskOfContainerNumber';
            stream.fetch({
                method: "GET",
                url: url,
                type: 'json',
            }, function(ret) {
                console.log(ret)
                if (ret.data.status === 1) {
                    console.log(ret.data.message);
                    if (ret.data.message === '没有失败的信息') {
                        modal.toast({ message:ret.data.message, duration: 2 });
                        _this.show = false;
                    } else if (ret.data.message === '有失败的任务') {
                        if (ret.data.data.length > 0) {
                            for (let i = 0; i < ret.data.data.length; i++) {
                                _this.taskList.push({ title: ret.data.data[i].containerNumber, value: ret.data.data[i].taskId })
                            }
                            _this.show = true;
                        } else {
                            modal.toast({ message: ret.data.message, duration: 2 });
                        }
                    }
                }
            })
        },
        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },
        // 选择任务失败的桶
        wxcSelectEmptyContainer(e) {
            console.log(e)
            console.log(e.title);
            this.isChoseDisabled = false;
            this.containerNumber = e.title;
            this.taskId = e.value;
        },

        // 选择任务失败的桶--确认按钮
        wxcConfirmEmptyContainer(e) {
            let _this = this;
            if (this.containerNumber !== 'undefined') {
                let url = 'http://10.34.10.177:8999/agvTask/manualStorage?taskId=' + this.taskId + '&containerNumber=' + _this.containerNumber;
                stream.fetch({
                    method: "GET",
                    url: url,
                    type: 'json',
                }, function(ret) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message,duration: 2});
                    } else {
                        modal.toast({ message: ret.data.message,duration: 2});
                    }
                    // this.show = false;
                })
            } else {
                modal.toast({ message: '请选择桶编号',duration: 2});
            }
            this.show = false;
        },
        // 返回
        back() {
            // this.$router.push({ name: 'wayStation' })
            this.show = false;
        },
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