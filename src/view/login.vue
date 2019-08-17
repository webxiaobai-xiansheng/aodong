<template>
    <div class="login_content">
        <div class="login_input">
            <div class="user_name input_box">
                <input v-model="userName" class="input_item" type="text" placeholder="用户名称" maxlength="8" @input="onInput" />
            </div>
            <div class="user_password input_box">
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码" maxlength="8" @input="onInput">
            </div>
        </div>
        <div class="button_box">
            <!-- <wxc-button text="选择车间" :disabled="isWorkShopDisabled" type="blue" @wxcButtonClicked="choseWorkShop"></wxc-button> -->
            <wxc-button text="选择车间" type="blue" @wxcButtonClicked="choseWorkShop"></wxc-button>
        </div>
        <div class="button_box">
            <wxc-button text="登录" :disabled="isLoginDisabled" type="blue" @wxcButtonClicked="login"></wxc-button>
        </div>
        <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
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
            title: '批料待发间',
            value: 'WL'
        }, {
            title: '制粒间',
            value: 'ZL'
        }, {
            title: '总混间',
            value: 'ZH'
        }, {
            title: '胶囊间1',
            value: 'JN1'
        }, {
            title: '胶囊间2',
            value: 'JN2'
        }, {
            title: '压片间',
            value: 'YP'
        }, {
            title: '包衣间',
            value: 'BY'
        }, {
            title: '瓶装',
            value: 'PBZ'
        }, {
            title: '铝塑包装1',
            value: 'LSBZ1'
        }, {
            title: '铝塑包装2',
            value: 'LSBZ2'
        }, {
            title: '中间站',
            value: 'ZJ'
        }, {
            title: '清洗间',
            value: 'QXCK'
        }]
    }),
    methods: {
        // 账号、密码输入框输入内容后显示 “选择车间按钮”
        onInput() {
            if (this.userName && this.userPassword) {
                if (this.userName.length < 8) {
                    modal.toast({ message: '账号长度为8位' });
                    this.isWorkShopDisabled = true;
                } else if (this.userPassword.length < 8) {
                    modal.toast({ message: '密码长度为8位' });
                    this.isWorkShopDisabled = true;
                } else {
                    if (this.isWorkShopDisabled) {
                        this.isWorkShopDisabled = false
                    }
                }
            } else if (!this.isWorkShopDisabled) {
                this.isWorkShopDisabled = true
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
                storage.setItem('workShopName', workShopName, event => {
                    console.log(event)
                    // console.log(event.data)
                });
                storage.setItem('workShopTitle', workShopTitle, event => {
                    // console.log(event.data)
                });
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
            let that=this;
            let url = 'http://10.34.10.25:8999/user/login';
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
                        storage.getItem('workShopName', event => {

                            let getName = event.data;

                            // 批料待发
                            if (getName === 'WL') {
                                that.$router.push({ name: 'batch' });
                            }
                            // 制粒间和总混间
                            if (getName === 'ZL' || getName === 'ZH') {
                                that.$router.push({ name: 'granulating' });
                            }
                            // 胶囊间1、胶囊间2、压片间
                            if (getName === 'JN1' || getName === 'JN2' || getName === 'YP') {
                                that.$router.push({ name: 'capsule' });
                            }
                            // 包衣间
                            if (getName === 'BY') {
                                that.$router.push({ name: 'laggingCover' });
                            }
                            // 瓶装、铝塑包装1、铝塑包装2（内包间）
                            if (getName === 'PBZ' || getName === 'LSBZ1' || getName === 'LSBZ2') {
                                that.$router.push({ name: 'insourcing' });
                            }
                            // 中间站
                            if (getName === 'ZJ') {
                                that.$router.push({ name: 'wayStation' });
                            }
                            // 清洗间（出口）
                            if (getName === 'QXCK') {
                                that.$router.push({ name: 'cleaning' });
                            }
                        });

                        modal.toast({ message: ret.data.message, duration: 3 });
                    } else {
                        modal.toast({ message: ret.data.message, duration: 3 });
                    }
                } else {
                    modal.toast({ message: ret.data.message, duration: 3 });
                }

            });
        }
    },
    created() {
        
    }
}
</script>
<style scoped>
.login_content {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 90px;
}

.input_box {
    flex-direction: row;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    margin-bottom: 40;
    padding-left: 20;
}

.input_item {
    width: 670px;
    height: 90px;
}

.button_box {
    margin-top: 20px;
    align-items: center;
}

.bottom {
    margin-top: 40px;
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
    height: 808;
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}
</style>