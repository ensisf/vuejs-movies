<template lang="pug">
  svg.svg-icon(aria-hidden="true")
    use(:xlink:href="'#' + iconName")
</template>

<script>
export default {
  name: 'icon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.svg-icon {
  display: block;
  fill: currentColor;
}
</style>
