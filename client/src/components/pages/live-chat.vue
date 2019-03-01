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
    <div v-if="commentsLoading">
      Loading comments <fa-icon :icon="['fas', 'spinner']" spin />
    </div>
    <div class="live-chat__comments" v-else>
      <div v-for="comment in comments" :key="comment.id" :class="['live-chat__comment', {'live-chat__comment--optimistic': comment.id < 0}]">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { apolloClient } from '@/apollo'
import { ADD_COMMENT, GET_COMMENTS, SUB_TO_COMMENTS } from '@/apollo/operations'
export default {
  data () {
    return {
      addComment: ADD_COMMENT,
      getComments: GET_COMMENTS,
      newComment: '',
      commentsLoading: 0
    }
  },
  apollo: {
    comments () {
      return {
        loadingKey: 'commentsLoading',
        query: this.getComments,
        subscribeToMore: [{
          document: SUB_TO_COMMENTS,
          updateQuery: (previousResult, { subscriptionData }) => {
            this.updateComments(apolloClient.cache, { data: { addComment: subscriptionData.data.comment.node }})
          }
        }]
      }
    }
  },
  methods: {
    async updateComments (cache, { data: { addComment }}) {
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
