<template>
  <v-btn text icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>mdi-thumb-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      requierd: true,
      default() {
        return ''
      }
    },
    object: {
      type: String,
      requierd: true,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      status: false
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const ret = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'click'
        }
      })
      this.status = ret.status
      // await
      // this.status = ...
    },
    async toggle() {
      const ret = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        name: 'click'
      })
      console.log(ret)
      this.status = ret.status
      // await
    }
  }
}
</script>

<style></style>
