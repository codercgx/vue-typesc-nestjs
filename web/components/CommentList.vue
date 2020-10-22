<template>
  <v-card flat tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        v-model="comment"
        label="说点啥吧"
        required
        append-icon="mdi-send"
        @click:append="send"
      ></v-text-field>
    </v-form>
    <v-list two-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{
            item.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.comment }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-btn small color="derger" @click="del(item._id)"
          ><v-icon dark>mdi-delete</v-icon></v-btn
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: null,
      comments: []
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true
    }
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        comment: this.comment
      })
      this.comment = null
      await this.fetch()
    },
    async del(id) {
      await this.$axios.$delete(`/comments/delete/${id}`)
      await this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object
            }
          }
        }
      })
    }
  }
}
</script>

<style></style>
