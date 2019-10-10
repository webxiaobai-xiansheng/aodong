<template>
    <!-- 称重功能 -->
    <!-- <div class="btn" @click="wxcButtonWeigh" :disabled="isDisabled">
        <text class="btn-txt">称重完成</text>
    </div> -->
    <div class="btn">
        <wxc-button text="称重完成" type="blue" :disabled="isDisabled" :btn-style="btnStyle" @wxcButtonClicked="wxcButtonWeigh"></wxc-button>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
import { WxcButton } from 'weex-ui';
export default {
    components: { WxcButton },
    data: () => ({
        isDisabled: false,
        time: '',
        btnStyle: {
            width: '200px',
            height: '100px',
            borderRadius: '10px'
        }
    }),
    methods: {
        wxcButtonWeigh(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8999/delivery/weighing';
                let body = JSON.stringify({});
                stream.fetch({
                    method: "POST",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                    type: 'json',
                    timeout: 30000
                }, function(ret) {
                    console.log(ret)
                    if (ret.data.status === 1) {
                        const Steve = new BroadcastChannel('Avengers');
                        Steve.postMessage('Assemble!');
                        modal.toast({ message: ret.data.message, duration: 2 });
                        _this.isDisabled = false;
                    } else {
                        modal.toast({ message: ret.data.message + '3秒后尝试', duration: 2 });
                        _this.isDisabled = false;
                    }
                });
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
</style>