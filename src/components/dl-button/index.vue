/**

参数    说明    类型    可选值    默认值
size    尺寸    string    medium / small / mini    —
type    类型    string    primary / success / warning / danger / info / text    —
plain    是否朴素按钮    boolean    —    false
round    是否圆角按钮    boolean    —    false
circle    是否圆形按钮    boolean    —    false
loading    是否加载中状态    boolean    —    false
disabled    是否禁用状态    boolean    —    false
icon    图标类名    string    —    —
autofocus    是否默认聚焦    boolean    —    false
native-type    原生 type 属性    string    button / submit / reset    button
**/
<template>
    <p v-demo:one="btn">测试</p>
</template>

<script>
    export default {
        name: "dl-button",
        props: {
            size: String,
            type: String,
            plain: Boolean,
            round: Boolean,
            circle: Boolean,
            loading: Boolean,
            disabled:Boolean,
            icon:String
        },
        data() {
            return {
                btn:'测试'
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="less" scoped>

</style>
