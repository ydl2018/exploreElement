
<template>
  <div >
      <div draggable class="drag-box">

      </div>
      <p>
      <img width="100" src="https://static.zhihu.com/heifetz/assets/guide-cover-5.2b2adaeb.jpg" alt="">

      </p>
      
      <p draggable ondragstart="event.dataTransfer.setData('text/plain','hello world')">测试</p>
      <div class="drop-area">

      </div>
      <div class="drop-area">

      </div>
  </div>
</template>

<script>
export default {
    mounted(){
       
    }
}
</script>

<style>
.drag-box{
    background: purple;
    width: 100px;
    height:100px ;
}
.drop-area{
    border: 1px solid #ccc;
    height: 300px;
}

</style>