<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8"
        ><h3>{{ course.name }}</h3>
        <video :src="episode.file" width="100%" controls></video>
        <like-btn type="Course" :object="course._id"></like-btn>
        <click-btn type="Course" :object="course._id"></click-btn>
      </v-col>
      <v-col :md="4">
        <v-select
          v-model="currentIndex"
          :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
        ></v-select>
      </v-col>
    </v-row>

    <comment-list type="Course" :object="course._id"></comment-list>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import ClickBtn from '../../components/ClickBtn.vue'
import CommentList from '../../components/CommentList'

export default {
  components: { LikeBtn, CommentList, ClickBtn },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })

    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style></style>
