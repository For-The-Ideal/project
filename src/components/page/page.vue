<template>
  <div id="page">
    <Page :total="100" show-elevator />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#page {
  position: fixed;
  width: 88%;
  height: 60px;
  background: #f0f0f0;
  line-height: 60px;
  padding-left: 10px;
  margin-top: 10px;
}
</style>