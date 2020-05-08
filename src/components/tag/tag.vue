<template>
  <Content>
    <Breadcrumb :style="{margin: '10px 0'}">
      <div class="tags-nav">
        <div class="close-con">
          <Dropdown @on-click="handleTagsOption" transfer style="margin-top:7px;">
            <Button size="small" type="text">
              <Icon :size="18" type="ios-close-circle-outline" />
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="close-all">关闭所有</DropdownItem>
              <DropdownItem name="close-others">关闭其他</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <ul
          v-show="visible"
          :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
          class="contextmenu"
        >
          <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
        </ul>
        <div class="btn-con left-btn">
          <Button type="text" @click="handleScroll(240)">
            <Icon :size="18" type="ios-arrow-back" />
          </Button>
        </div>
        <div class="btn-con right-btn">
          <Button type="text" @click="handleScroll(-240)">
            <Icon :size="18" type="ios-arrow-forward" />
          </Button>
        </div>
        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
          <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <Tag
              type="dot"
              v-for="(item, index) in tagNavList"
              ref="tagsPageOpened"
              :key="`tag-nav-${index}`"
              :name="item.name"
              :data-route-item="item"
              @on-close="handleClose(item)"
              @click.native="handleClick(item)"
              :closable="item.name !== $config.homeName"
              :color="isCurrentTag(item) ? 'primary' : 'default'"
              @contextmenu.prevent.native="contextMenu(item, $event)"
            >{{ showTitleInside(item) }}</Tag>
          </div>
        </div>
      </div>
    </Breadcrumb>
  </Content>
</template>

<script>
import { showTitle, routeEqual } from "@/common/function";
export default {
  props: {
    value: Object,
    tagNavList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: "关闭其他",
        all: "关闭所有"
      }
    };
  },
  created() {},
  watch: {
    $route(to) {
      this.getTagElementByRoute(to);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },

  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    }
  },
  methods: {
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },
    showTitleInside(item) {
      return showTitle(item, this);
    },
    handleClick(item) {
      this.$emit("input", item);
    },
    handleClose(current) {
      if (
        current.meta &&
        current.meta.beforeCloseName &&
        current.meta.beforeCloseName in beforeClose
      ) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
          if (close) {
            this.close(current);
          }
        });
      } else {
        this.close(current);
      }
    },
    close(route) {
      let res = this.tagNavList.filter(item => !routeEqual(route, item));
      this.$emit("on-close", res, undefined, route);
    },

    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },

    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs["data-route-item"])) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    },

    handleTagsOption(type) {
      if (type.includes("all")) {
        // 关闭所有，除了home
        let res = this.tagNavList.filter(
          item => item.name === this.$config.homeName
        );
        this.$emit("on-close", res, "all");
      } else if (type.includes("others")) {
        // 关闭除当前页和home页的其他页
        let res = this.tagNavList.filter(
          item =>
            routeEqual(this.currentRouteObj, item) ||
            item.name === this.$config.homeName
        );
        this.$emit("on-close", res, "others", this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj);
        }, 100);
      }
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    mounted() {
      setTimeout(() => {
        this.getTagElementByRoute(this.$route);
      }, 200);
    }
  }
};
</script>

<style scoped>
@import "./tag.css";
</style>