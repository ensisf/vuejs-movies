<template lang="pug">
  button.fav-btn(
    type="button"
    :class="{ canRemove: inFavList }"
    @click="toggleMovie"
    :data-tooltip="tooltip"
  )
    Icon(
      width="30"
      height="30"
      iconName="icon-heart"
    )
</template>
<script>
import Icon from '@/components/Icon'

export default {
  name: 'fav-btn',
  components: {
    Icon
  },
  props: {
    inFavList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleMovie() {
      // if user signed in toggle movie in fav list
      if (this.$store.getters.GET_USER !== null) {
        this.$emit('toggleFavMovie', !this.inFavList)
      } else {
        this.$store.commit('TOGGLE_MODAL')
      }
    }
  },
  computed: {
    tooltip() {
      return this.inFavList ? 'Remove from favorite list' : 'Add to favorite list'
    }
  }
}
</script>

<style lang="scss">
.fav-btn {
  background: #fff;
  border: none;
  padding: 5px;
  transition: 0.2s;
  color: #28a745;
  cursor: pointer;

  &.canRemove {
    color: #721c24;
  }
}
</style>
