/**
*  @params visible     控制是否可见  
   @params fullscreen  控制是否直接插入到body里去，范围是整个body
   @params body        控制是否插入到body里去，但是范围是组件
   @params lock        在fullscreen 为true的情况下，控制组件是否滚动
   @params backgroundColor 自定义的背景颜色
   @params customClass 自定义的类名
*/

<template>
    <div
        v-show="visible"
        :class="[customClass]"
    >

    </div>
</template>

<script>
    export default {
        name: "dl-loading",
        data() {
            return {
               visible:false,
               customClass:'',
               body:
            }
        },
        mounted() {
        },
        beforeDestroy(){

        },
        methods: {

        }
    }
</script>

<style lang="scss" >
  
</style>
