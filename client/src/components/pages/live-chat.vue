<template>
  <div class="live-chat">
    <h1>Live Chat</h1>
    <ApolloMutation
      :mutation="addComment"
      :variables="{
        data: {
          text: newComment
        }
      }"
      :optimisticResponse="{
        __typename: 'Mutation',
        addComment: {
          id: -1,
          text: newComment,
          __typename: 'Comment'
        }

      }"
      :update="updateComments"
      >
      <template slot-scope="{ mutate }">
        <form 
          @submit.prevent="mutate" 
          class="live-chat__form">
          <input v-model="newComment" placeholder="Have something to say?" autocomplete="off">
        </form>
      </template>
    </ApolloMutation>
    <div class="live-chat__comments">
      <div v-for="comment in comments" :key="comment.id" :class="['live-chat__comment', {'live-chat__comment--optimistic': comment.id < 0}]">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_COMMENT, GET_COMMENTS } from '@/apollo/operations'
export default {
  data () {
    return {
      addComment: ADD_COMMENT,
      getComments: GET_COMMENTS,
      newComment: ''
    }
  },
  apollo: {
    comments () {
      return {
        query: this.getComments
      }
    }
  },
  methods: {
    async updateComments (cache, { data: { addComment }}) {
      console.log('YEYEYEY')
      this.newComment = ''
      const data = cache.readQuery({ query: this.getComments })
      const commentAdded = data.comments.some(comment => comment.id === addComment.id )
      if (!commentAdded) {
        data.comments.push(addComment)
        cache.writeQuery({ query: this.getComments, data })
      }
    }
  }
}
</script>

<style lang="scss">
.live-chat {
  color: blue;

  &__comment {
    color: green;

    &--optimistic {
      color: red;
    }
  }
}
</style>
