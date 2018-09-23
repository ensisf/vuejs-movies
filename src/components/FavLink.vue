<template lang="pug">
  router-link.fav-link(
    to="/favourites"
    data-tooltip="See your favourites"
  ) 
    Icon.fav-link__icon(
      iconName="icon-wishlist"
      width="20"
      height="25"
    )
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'fav-link',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.fav-link {
  position: fixed;
  padding: 5px 10px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  @media (min-width: 1024px) {
    &__icon {
      width: 40px;
      height: 50px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.15s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
