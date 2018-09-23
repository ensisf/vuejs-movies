<template lang="pug">
  .progress
    .progress-bar(
      class="bg-warning"
      :style="width"
    )
</template>

<script>
export default {
  name: 'rating',
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    width() {
      return `width: ${(this.rating / 10) * 100}%`
    }
  }
}
</script>
