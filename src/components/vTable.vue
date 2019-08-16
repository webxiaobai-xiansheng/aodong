<template>
    <div class="table_container">
        <radio></radio>
        <scroller class="table_scroller" scroll-direction="horizontal">
            <table class="table">
                <thead>
                    <tr class="table_tr">
                        <th class="table_th" v-for="theadItem in tableHeadData"><text>{{theadItem}}</text></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr class="table_tr" v-for="(item,index) in tableBodyData" :key="index" @click="find(index)" :class="{'active':activeChose = index}"> -->
                     <!-- <tr class="table_tr" v-for="(item,index) in tableBodyData" :key="index" @click="find(index)"  :class="[isActive?'active':'']"> -->
                     <!-- <tr class="table_tr" v-for="(item,index) in tableBodyData" :key="index" @click="find(index)" :class="[ activeChose === 'index' ? 'active' : '' ]"> -->
                     <tr class="table_tr" v-for="(item,index) in tableBodyData" :key="index" @click="find(index)" :class="[currentIndex === index ? 'active' : '']">
                        <td class="table_td"><text>{{item.containerNumber}}</text></td>
                        <td class="table_td"><text>{{item.productName}}</text></td>
                        <td class="table_td"><text>{{item.lotNumber}}</text></td>
                        <td class="table_td"><text>{{item.status}}</text></td>
                        <td class="table_td"><text>{{item.inspectionStatus}}</text></td>
                        <td class="table_td"><text>{{item.materialName}}</text></td>
                        <td class="table_td"><text>{{item.containerVolume}}</text></td>
                        <td class="table_td"><text>{{item.containerWeight}}</text></td>
                        <td class="table_td"><text>{{item.productDate}}</text></td>
                    </tr>
                </tbody>
            </table>
        </scroller>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
import { WxcButton, WxcGridSelect } from 'weex-ui';
import radio from './vRadio.vue';
export default {
    components: { radio, WxcButton, WxcGridSelect },
    data: () => ({
        // activeChose:false,
        currentIndex: 0,
        // customStyles: {
        //     width: '80px',
        //     height: '50px',
        //     backgroundColor: '#ccc',
        //     checkedBackgroundColor: '#ffb200',
        //     icon: ''
        // },
        tableHeadData: ['编号', '产品名称', '批号', '状态', '检验状态', '物料名称', '容积容量', '桶重', '日期'],
        tableBodyData: [{
            containerNumber: 'A0001',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }]
    }),
    methods: {
        find(index){
            modal.toast({ message: index });
            this.currentIndex = index;
        }
    }

}
</script>
<style src='../styles/style.css'></style>
<style scoped>
.text-title {
    font-size: 16px;
}
.button_radio{
    width:80px;
    height:50px;
}
</style>