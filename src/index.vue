<template>
  <div class="home">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
}
</script>

<style scoped>
  
/* 公共样式 begin */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* table begin */
.table_container {
	width:710;
    align-items: center;
    margin-top: 20px;
}

.table {
    width: 710;
    border-style: solid;
    border-color: #333;
    border-width: 1px;
}

.table_tr {
    flex-direction: row;
}

.table_th {
    width: 78.8;
    height: 60;
    border-style: solid;
    border-color: #333;
    border-right-width: 1px;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
}

.font_16{
    font-size: 16px;
}

.table_td {
    width: 78.8;
    height: 60;
    border-style: solid;
    border-color: #333;
    border-right-width: 1px;
    border-top-width: 1px;
    justify-content: center;
    align-items: center;
}
.test_size{
    font-size:12px;
}

.big_size{
    font-size:16px;
}
/* table end */
/* button begin */

/* button end */
/* 公共样式 end */
</style>
