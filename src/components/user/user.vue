<template>
  <div style="display: flex;" id="app">
    <Dropdown @on-click="handleClick">
      <Avatar icon="ios-person" />
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },

  created() {},

  methods: {
    handleClick() {
      this.$router.push({
        name: "login"
      });
       localStorage.clear();
    }
  }
};
</script>
<style scoped>
</style>