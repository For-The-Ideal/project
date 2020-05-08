<style scoped>
@import "./layout.css";
</style>
<template>
  <div class="layout" id="app">
    <Layout>
      <Sider ref="sideList" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu
          ref="menu"
          :active-name="$route.name"
          :open-names="openedName"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="openSelect"
        >
          <Submenu :name="items.name" v-for="(items,index) in getMeunList" :key="index">
            <template slot="title">
              <Icon :type="items.icon"></Icon>
              <span>{{items.title}}</span>
            </template>
            <div v-for="(item,key) in items.children" :key="key">
              <MenuItem :name="item.name" v-if="item.children.length == 0">
                <template>
                  <Icon :type="item.icon"></Icon>
                  <span>{{item.title}}</span>
                </template>
              </MenuItem>
              <Submenu :name="item.name" v-else>
                <template slot="title">
                  <Icon :type="item.icon"></Icon>
                  <span>{{item.title}}</span>
                </template>
                <div v-for="(val,v) in item.children" :key="v">
                  <MenuItem :name="val.name">
                   <template>
                    <Icon :type="val.icon"></Icon>
                    <span>{{val.title}}</span>
                     </template>
                  </MenuItem>
                </div>
              </Submenu>
            </div>
          </Submenu>
        </Menu>
      </Sider>

      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
          <div class="top-menu">
            <MenuItem name="5">
              <user />
            </MenuItem>
          </div>
          <BreadcrumbItem class="nav">首页 / 盒模型 / HTML基础 / javascript / class类</BreadcrumbItem>
        </Header>
        <Tag
          :value="$route"
          @input="handleClick"
          :tagNavList="tagNavList"
          @on-close="handleCloseTag"
        />
        <Content>
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Tag from "../tag/tag";
import User from "../user/user";
import { meunList } from "@/common/meunList";
import router from "@/router/router";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, routeEqual, getOpenName } from "@/common/function";
export default {
  name: "layout",
  components: {
    User,
    Tag
  },
  data() {
    return {
      isCollapsed: false,
      openNames: []
    };
  },
  computed: {
    tagNavList() {
      return this.$store.state.tagNavList;
    },
    getMeunList() {
      return meunList.meunLists;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    openedName() {
      if (this.$config.homeName == this.$route.name) this.openNames = [];
      else {
        this.openNames = getOpenName(meunList, this.$route);
        return getOpenName(meunList, this.$route);
      }
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({ route: { name, query, params, meta }, type: "push" });
      this.setBreadCrumb(newRoute);
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
    },
    openNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  methods: {
    ...mapMutations([
      "setBreadCrumb",
      "setTagNavList",
      "addTag",
      "setLocal",
      "setHomeRoute",
      "closeTag"
    ]),
    collapsedSider() {
      this.$refs.sideList.toggleCollapse();
    },
    openSelect(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },

    handleClick(item) {
      this.openSelect(item);
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.openSelect(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    }
  },

  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList();
    this.setHomeRoute(router);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta }
    });
    this.setBreadCrumb(this.$route);
  }
};
</script>