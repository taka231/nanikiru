import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  body: Scalars['String'];
  choice?: Maybe<Choice>;
  choiceId: Scalars['Int'];
  id: Scalars['Int'];
  post?: Maybe<Post>;
  postId: Scalars['Int'];
};

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['Int'];
  name: Scalars['String'];
  post?: Maybe<Post>;
  postId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnswer: Answer;
  createPost: Post;
};


export type MutationCreateAnswerArgs = {
  body: Scalars['String'];
  choiceId: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  choices: Array<ChoiceInput>;
  imgurl: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  choices?: Maybe<Array<Maybe<Choice>>>;
  id: Scalars['Int'];
  imgurl: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  answersByPostId: Array<Maybe<Answer>>;
  hello?: Maybe<Scalars['String']>;
  post: Post;
  posts: Array<Maybe<Post>>;
};


export type QueryAnswersByPostIdArgs = {
  postId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type ChoiceInput = {
  name: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  imgurl: Scalars['String'];
  choices: Array<ChoiceInput> | ChoiceInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string, body: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } };

export type CreateAnswerMutationVariables = Exact<{
  body: Scalars['String'];
  postId: Scalars['Int'];
  choiceId: Scalars['Int'];
}>;


export type CreateAnswerMutation = { __typename?: 'Mutation', createAnswer: { __typename?: 'Answer', id: number, body: string, postId: number, choiceId: number, post?: { __typename?: 'Post', title: string, body: string, imgurl: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } | null, choice?: { __typename?: 'Choice', id: number, name: string } | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, body: string, imgurl: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } | null> };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, title: string, body: string, imgurl: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } };

export type GetAnswersByPostIdQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetAnswersByPostIdQuery = { __typename?: 'Query', answersByPostId: Array<{ __typename?: 'Answer', id: number, body: string, choiceId: number, postId: number, choice?: { __typename?: 'Choice', id: number, name: string } | null } | null> };


export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!, $imgurl: String!, $choices: [choiceInput!]!) {
  createPost(title: $title, body: $body, imgurl: $imgurl, choices: $choices) {
    id
    title
    body
    choices {
      id
      name
    }
  }
}
    `;
export const CreateAnswerDocument = gql`
    mutation CreateAnswer($body: String!, $postId: Int!, $choiceId: Int!) {
  createAnswer(body: $body, postId: $postId, choiceId: $choiceId) {
    id
    body
    postId
    post {
      title
      body
      imgurl
      choices {
        id
        name
      }
    }
    choiceId
    choice {
      id
      name
    }
  }
}
    `;
export const GetPostsDocument = gql`
    query GetPosts {
  posts {
    id
    title
    body
    imgurl
    choices {
      id
      name
    }
  }
}
    `;
export const GetPostByIdDocument = gql`
    query GetPostByID($postId: Int!) {
  post(id: $postId) {
    id
    title
    body
    imgurl
    choices {
      id
      name
    }
  }
}
    `;
export const GetAnswersByPostIdDocument = gql`
    query GetAnswersByPostId($postId: Int!) {
  answersByPostId(postId: $postId) {
    id
    body
    choiceId
    postId
    choice {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    CreateAnswer(variables: CreateAnswerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAnswerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAnswerMutation>(CreateAnswerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAnswer', 'mutation');
    },
    GetPosts(variables?: GetPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>(GetPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPosts', 'query');
    },
    GetPostByID(variables: GetPostByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostByIdQuery>(GetPostByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostByID', 'query');
    },
    GetAnswersByPostId(variables: GetAnswersByPostIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAnswersByPostIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAnswersByPostIdQuery>(GetAnswersByPostIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAnswersByPostId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;