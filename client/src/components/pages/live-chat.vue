<template>
  <div class="live-chat">
    <h1>Live Chat</h1>
    <div v-if="commentsLoading">
      Loading comments <fa-icon :icon="['fas', 'spinner']" spin />
    </div>
    <div class="live-chat__comments" ref="commentWindow" v-else>
      <div v-for="comment in comments" :key="comment.id" :class="['live-chat__comment', {'live-chat__comment--optimistic': comment.id < 0}]">
        <div class="live-chat__date">
          {{ formatTime(comment.createdAt) }}
        </div>
        <div class="live-chat__author">
          <div>{{ formatUser(comment.author) }} said:</div> 
        </div>
        <div>
          {{ comment.text }}
        </div>
      </div>
    </div>
    <ApolloMutation
      class="live-chat__new-comment"
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
          createdAt: formatTime(),
          author: currentUser,
          __typename: 'Comment'
        }

      }"
      :update="updateComments"
      >
      <template slot-scope="{ mutate }">
        <form 
          @submit.prevent="mutate" 
          class="live-chat__form">
          <input v-model="newComment" placeholder="Have something to say?" autocomplete="off" autofocus>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import moment from 'moment'
import { apolloClient } from '@/apollo'
import { ADD_COMMENT, GET_COMMENTS, SUB_TO_COMMENTS, GET_CURRENT_USER } from '@/apollo/operations'
export default {
  data () {
    return {
      addComment: ADD_COMMENT,
      getComments: GET_COMMENTS,
      newComment: '',
      commentsLoading: 0,
      moment
    }
  },
  apollo: {
    comments () {
      return {
        loadingKey: 'commentsLoading',
        query: this.getComments,
        result: () => {
          this.scrollChatToBottom()
        },
        subscribeToMore: [{
          document: SUB_TO_COMMENTS,
          updateQuery: (previousResult, { subscriptionData }) => {
            this.updateComments(apolloClient.cache, { data: { addComment: subscriptionData.data.comment.node }})
          }
        }]
      }
    },
    currentUser () {
      return {
        query: GET_CURRENT_USER
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
      this.scrollChatToBottom()
    },
    formatUser (author) {
      return author.id === this.currentUser.id
        ? 'You'
        : author.name
    },
    formatTime (time) {
      return (moment(time).isValid())
        ? moment(time).format('h:mm:ss a, MMMM Do YYYY')
        : ''
    },
    getCurrentTime() {
      return this.formatTime()
    },
    scrollChatToBottom () {
      setTimeout(() => {
        const commentWindow = this.$refs.commentWindow
        commentWindow.scrollTop = commentWindow.scrollHeight
      },1)
    }
  }
}
</script>

<style lang="scss">
.live-chat {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__comments {
    width: 50%;
    max-height: 50rem;
    height: 66%;
    overflow: auto;
    border: 1px solid black;
  }

  &__comment {
    padding: .5rem .7rem;
    &:not(:last-child) {
      border-bottom: 1px solid black;
    }
    &--optimistic {
      color: red;
    }
  }

  &__author {
    font-weight: 900;
  }

  &__new-comment {
    width: 30rem;
    margin-top: 2rem;
  }

  &__form {

    input {
      font-size: 2rem;
      width: 100%;
      border: 1px solid black;
      padding: .8rem 1rem;
      border-radius: .4rem;
    }
  }
}
</style>
