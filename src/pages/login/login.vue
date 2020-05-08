<style scoped>
@import './login.css';
</style>
<template>
  <div id="app">
    <div class="main">
      <div class="login">
        <div class="login-con">
          <Card icon="log-in" title="欢迎来到 ━(*｀∀´*)ノ 德莱联盟" style="height:400px">
            <div class="form-con">
              <Form>
                <FormItem>
                  <Input name="user_name" placeholder="请输入用户名" value="随便">
                    <span slot="prepend">
                      <Icon :size="26" type="ios-person"></Icon>
                    </span>
                  </Input>
                </FormItem>
                <FormItem>
                  <Input type="text" name="password" placeholder="请输入密码" value="开心就好">
                    <span slot="prepend">
                      <Icon :size="26" type="md-lock"></Icon>
                    </span>
                  </Input>
                </FormItem>
                <FormItem>
                  <Button @click="subLogin" type="primary" long>登录</Button>
                </FormItem>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    subLogin(){ 
      this.$router.push({ 
        path:'/home'
      })
    }
  },
};
</script>
