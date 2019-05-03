<template>
  <svg :class="svgClass" aria-hidden="true" :width="width+'px'" :height="height+'px'">
    <use :xlink:href="svgIcon"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '16'
    },
    height: {
      type: String,
      default: '16'
    }
  },
  computed: {
    svgIcon() {
      return `#icon-${this.iconName}`
    },
    svgClass() {
      if (this.className) {
        return `icon ${this.className}`
      } else {
        return 'icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>