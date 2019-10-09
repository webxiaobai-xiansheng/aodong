<template>
    <div class="radio_box">
        <wxc-grid-select class="radio_item" :single="true" :cols="5" :customStyles="customStyles" :list="radio2" @select="params => onSelect(params)">
        </wxc-grid-select>
    </div>
</template>
<script>
import { WxcGridSelect } from 'weex-ui'
export default {
    data: () => ({
        customStyles: {
            icon:'',
            height: '50px',
            backgroundColor: '#ccc',
            checkedBackgroundColor: '#ffb200',
        },
        //批料待发室
        radio1: [{
            title: '显示空料斗',
            value: 'emptyContainer'
        }],
        //制粒室
        radio2: [{
            title: '显示料斗',
            value: 'container'
        }, {
            title: '显示空料桶',
            value: 'emptyContainer'
        }],
        //批混室
        radio3: [{
            title: '显示料斗',
            value: 'container'
        }, {
            title: '显示空料斗',
            value: 'emptyContainer'
        }],
        // 胶囊填充室
        radio4: [{
            title: '显示料斗',
            value: 'container'
        }, {
            title: '显示空料桶',
            value: 'emptyContainer'
        }],
        // 压片室
        radio5: [{
            title: '显示料斗',
            value: 'container'
        }, {
            title: '显示空料桶',
            value: 'emptyContainer'
        }],
        // 包衣室
        radio6: [{
            title: '显示料桶',
            value: 'container'
        }, {
            title: '显示空料桶',
            value: 'emptyContainer'
        }],
        // 内包间
        radio7: [{
            title: '显示料桶',
            value: 'container'
        }],
        // 中间站
        radio8: [{
            title: '显示过期料斗、料桶',
            value: 'outdatedContainer'
        }]
    }),
    components: { WxcGridSelect },
    methods: {
        onSelect({ selectIndex, checked, checkedList }) {
            console.log(checkedList[0].value) //emptyContainer
            console.log(checkedList[0].title) //空料桶
        },
    }
}
</script>
<style scoped>
.radio_box {
    justify-content: center;
    flex-direction: row;
}


</style>