import { IBlog, ICategoryAndTags } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!



export const getTags = async () => {
  const query = gql`
  query MyQuery {
  tags {
    name
    slug
  }
}
  `
  const { tags } = await request<{ tags: ICategoryAndTags[] }>(graphqlAPI, query)
  return tags
}



export const getBlogsByTag = cache(async (slug: string) => {
  const query = gql`
	query MyQuery($slug: String!) {
  tag(where: {slug: $slug}) {
    blog {
    description
       author {
      name
      bio
      image {
        url
      }
    }
    content {
      html
    }
    createdAt
    image {
      url
    }
    slug
    tag {
      slug
      name
    }
     category {
      slug
      name
    }
    title
     }
    name
    }
  }

 
	`

  const { tag } = await request<{ tag: { blog: IBlog[]; name: string } }>(graphqlAPI, query, { slug })
  return tag
})