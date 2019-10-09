<template>
    <div class="login_content">
        <text class="page_title">欢迎回来，请登录！</text>
        <div class="login_input">
            <div class="user_name input_box">
                <text class="iconfont login-icon">&#xe605;</text>
                <input v-model="userName" class="input_item" type="text" placeholder="用户名称" maxlength="8" @input="onInput" />
            </div>
            <div class="user_password input_box">
                <text class="iconfont login-icon">&#xe600;</text>
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @input="onInput">
            </div>
        </div>
        <div class="button_box">
            <wxc-button text="选择车间" type="blue" @wxcButtonClicked="choseWorkShop"></wxc-button>
        </div>
        <div class="button_box bottom">
            <wxc-button text="登录" :disabled="isLoginDisabled" type="blue" @wxcButtonClicked="login"></wxc-button>
        </div>
        <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="800">
            <div class="content mask-content">
                <div class="mask-title">
                    <text class="title">请选择车间</text>
                </div>
                <div class="scroller-box">
                    <scroller class="scroller">
                        <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
                    </scroller>
                </div>
                <div class="button_box bottom">
                    <wxc-button text="确定" type="blue" :disabled="isChoseDisabled" @wxcButtonClicked="wxcChoseWorkShop"></wxc-button size="small">
                </div>
            </div>
        </wxc-popup>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import { WxcButton, WxcRadio, WxcPopup } from 'weex-ui';

export default {
    components: { WxcButton, WxcRadio, WxcPopup },
    data: () => ({
        userName: 'zhangsan',
        userPassword: 'zhangsan',
        isWorkShopDisabled: true,
        isLoginDisabled: true,
        isChoseDisabled: true,
        show: false,
        list: [{
            title: '批料待发室',
            value: 'WL'
        }, {
            title: '中间站',
            value: 'ZJ'
        }, {
            title: '容器具清洗室',
            value: 'QXCK'
        }, {
            title: '制粒室',
            value: 'ZL'
        }, {
            title: '批混室',
            value: 'ZH'
        }, {
            title: '胶囊填充室1',
            value: 'JN1'
        }, {
            title: '胶囊填充室2',
            value: 'JN2'
        }, {
            title: '胶囊填充室3',
            value: 'JN3'
        }, {
            title: '压片室1',
            value: 'YP1'
        }, {
            title: '压片室2',
            value: 'YP2'
        }, {
            title: '包衣室',
            value: 'BY'
        }, {
            title: '瓶包装室',
            value: 'PBZ'
        }, {
            title: '铝塑包装室1',
            value: 'LSBZ1'
        }, {
            title: '铝塑包装室2',
            value: 'LSBZ2'
        }, {
            title: '铝塑包装室3',
            value: 'LSBZ3'

        }]
    }),
    methods: {
        // 账号、密码输入框输入内容后显示 “选择车间按钮”
        onInput() {
            if (this.userName && this.userPassword) {
                if (this.userName.length < 8) {
                    modal.toast({ message: '账号长度为8位' });
                } else if (this.userPassword.length < 8) {
                    modal.toast({ message: '密码长度为8位' });
                }
            }
        },

        // 点击“选择车间”按钮
        choseWorkShop(e) {
            if (e.disabled) {
                return;
            } else {
                this.show = true;
            }
        },

        // 选择车间列表
        wxcRadioListChecked(e) {
            if (e.title.length < 1) {
                this.isChoseDisabled = true;
            } else {
                this.isChoseDisabled = false;
                var workShopName = e.value;
                var workShopTitle = e.title;
                storage.setItem('workShopName', workShopName, event => {});
                storage.setItem('workShopTitle', workShopTitle, event => {});
            }
        },

        // 选择车间--确认按钮
        wxcChoseWorkShop(e) {
            if (e.disabled) {
                return;
            } else {
                this.show = false;
                this.isLoginDisabled = false;
            }
        },

        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },

        // 登录按钮
        login() {
            let that = this;
            let url = 'http://10.34.10.177:8999/user/login';
            let body = JSON.stringify({
                username: this.userName,
                password: this.userPassword,
            });
            stream.fetch({
                method: "POST",
                type: 'json',
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: body
            }, function(ret) {
                if (ret.status === 200) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message, duration: 2 });
                        that.isLoginDisabled = true;
                        storage.getItem('workShopName', event => {
                            let getName = event.data;

                            // 批料待发
                            if (getName === 'WL') {
                                that.$router.push({ name: 'batch' });
                            }
                            // 制粒室和批混室
                            if (getName === 'ZL' || getName === 'ZH') {
                                that.$router.push({ name: 'granulating' });
                            }
                            // 胶囊填充室1、胶囊填充室2、胶囊填充室3、压片室1、压片室2
                            if (getName === 'JN1' || getName === 'JN2' || getName === 'JN3' || getName === 'YP1' || getName === 'YP2') {
                                that.$router.push({ name: 'capsule' });
                            }
                            // 包衣室
                            if (getName === 'BY') {
                                that.$router.push({ name: 'laggingCover' });
                            }
                            // 瓶包装室、铝塑包装室1、铝塑包装室2、铝塑包装室3（内包间）
                            if (getName === 'PBZ' || getName === 'LSBZ1' || getName === 'LSBZ2' || getName === 'LSBZ3') {
                                that.$router.push({ name: 'insourcing' });
                            }
                            // 中间站
                            if (getName === 'ZJ') {
                                that.$router.push({ name: 'wayStation' });
                            }
                            // 容器具清洗室（出口）
                            if (getName === 'QXCK') {
                                that.$router.push({ name: 'cleaning' });
                            }
                        });
                    } else {
                        modal.toast({ message: ret.data.message, duration: 2 });
                    }
                } else {
                    modal.toast({ message: ret.data.message, duration: 2 });
                }
            });
        },
    },
    created() {
        storage.getItem('workShopName', event => {});
        storage.getItem('containerNum', event => {});
        let domModule = weex.requireModule('dom');
        domModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('http://at.alicdn.com/t/font_1141918_gqt9dsrnysk.ttf')"
        });

    }
}
</script>
<style scoped>
.login_content {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
}

.page_title {
    margin-bottom: 80px;
    font-size: 40px;
    color: #333;
}

.input_box {
    flex-direction: row;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    margin-bottom: 40;
    padding-left: 10;
    width: 700px;
}

.input_item {
    width: 670px;
    height: 90px;
    margin-left: 10px;
}

.button_box {
    align-items: center;
}

.bottom {
    margin-top: 70px;
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
    height: 808px;
    /*position: absolute !important;*/
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}

.iconfont {
    font-family: iconfont;
}

.login-icon {
    padding-top: 25px;
    font-size: 40px;
    color: #ccc;
}
</style>