<template lang="pug">
  button.fav-btn(
    type="button"
    :class="{ canRemove: inFavList }"
    @click="toggleMovie"
    :data-tooltip="tooltip"
  )
    Icon.fav-btn__icon(
      v-if="!inFavList"
      width="20"
      height="20"
      iconName="icon-heart"
    )
    Icon.fav-btn__icon(
      v-else
      width="20"
      height="20"
      iconName="icon-heart-filled"
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
  $this: &;
  width: 40px;
  height: 40px;
  background: none;
  border: 2px solid #fff;
  border-radius: 100%;
  padding: 8px 8px 6px 8px;
  transition: 0.2s;
  color: #28a745;
  cursor: pointer;

  &__icon{
    width: 20px;
    height: 20px;
    margin: 0 auto;
    color: #fff;
  }

  &.canRemove {
    border-color: #721c24;
    background: #721c24;
    color: #721c24;
  }
}
</style>
