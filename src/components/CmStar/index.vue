<template>
  <div class="cm-star" :style="{'color':isColor}" :class="isAnimated" @click="handleLike">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CmStar',
  data() {
    return {
      like: false
    }
  },
  props: {
    animate: {
      type: String,
      default: 'animated heartBeat'
    },
    color: {
      type: String,
      default: '#F05654'
    }
  },
  computed: {
    isAnimated() {
      return this.like ? this.animate : ''
    },
    isColor() {
      return this.like ? this.color : ''
    }
  },
  methods: {
    handleLike() {
      this.like = !this.like
      this.$emit('handleClick', this.like)
    }
  }
}
</script>

<style lang="scss" scoped>
.cm-star {
  cursor: pointer;
  display: inline-block;
}
</style>
