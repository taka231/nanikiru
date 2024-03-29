import { queryType, makeSchema, asNexusMethod } from 'nexus'
import path from 'path'
import {
  Post,
  PostQuery,
  PostsQuery,
  CreatePostMutation,
  choiceInput,
  PostsByUserIdQuery,
} from './Query/Post'
import { Choice } from './Query/Choice'
import { Answer, AnswersQuery, CreateAnswerMutation } from './Query/Answer'
import { GraphQLBigInt, GraphQLDateTime } from 'graphql-scalars'
import { User } from './Query/User'
import { Comment, CommentsByAnswerId, CreateComment } from './Query/Comment'

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' })
  },
})

export const schema = makeSchema({
  types: [
    Comment,
    CommentsByAnswerId,
    CreateComment,
    PostsByUserIdQuery,
    User,
    AnswersQuery,
    Answer,
    Query,
    Post,
    CreateAnswerMutation,
    PostQuery,
    PostsQuery,
    CreatePostMutation,
    Choice,
    choiceInput,
    asNexusMethod(GraphQLBigInt, 'bigint', 'bigint'),
    asNexusMethod(GraphQLDateTime, 'datetime', 'Date'),
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src', 'lib', 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
