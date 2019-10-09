<template>
    <!-- 取空料桶功能 -->
    <!-- <div class="btn" @click="wxcButtonEmptySpritzerTank">
    <text class="btn-txt">取空料桶</text>
  </div> -->
    <div class="btn">
        <wxc-button text="取空料桶" type="blue" :disabled="isDisabled" :btn-style="btnStyle" @wxcButtonClicked="wxcButtonEmptySpritzerTank"></wxc-button>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const Steve = new BroadcastChannel('Avengers');
import { WxcButton } from 'weex-ui';
export default {
    components: { WxcButton },
    data() {
        return {
            // 车间名字
            workshopName: '',
            containerNum: '',
            isDisabled: false,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
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
        wxcButtonEmptySpritzerTank(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                if (this.containerNum !== 'undefined' && this.workshopName !== 'undefined') {
                    let url = 'http://10.34.10.177:8999/obtain/getEmptyContainer?containerNumber=' + _this.containerNum + '&functionRoomNumber=' + _this.workshopName;
                    stream.fetch({
                        method: "GET",
                        url: url,
                        type: 'json',
                    }, function(ret) {
                        _this.isDisabled = false;
                        storage.removeItem('containerNum', event => {});
                        // 订阅者
                        const Steve = new BroadcastChannel('Avengers')
                        Steve.postMessage('Assemble!')
                        if (ret.data.status === 1) {
                            modal.toast({ message: ret.data.message, duration: 2 });
                        } else {
                            modal.toast({ message: ret.data.message, duration: 2 });
                        }
                    })
                } else {
                    modal.toast({ message: '请选择桶编号', duration: 2 });
                    _this.isDisabled = false;
                }
            }
        }
    },
     destroyed() {
        clearInterval(this.timer); // 清除定时器
        this.timer = null;
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
</style>