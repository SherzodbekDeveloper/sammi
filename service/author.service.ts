import { IAuthor } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

interface IDetailedAuthor {
  
}

export const getDetailedAuthors = async (id: string) => {
  const query = gql`
  query MyQuery($id: ID!) {
  author(where: {id: $id}) {
    bio
    name   
    id
    image{
      url
    }
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
  }
}
  `
const {author} = await request<{author: IAuthor}>(graphqlAPI, query, {id})
return author
}

export const getAuthors = async () => {
  const query = gql`
     query getAuthors {
  authors {
    id
    name
    bio
    image {
      url
    }
    blog {
      id
    }
  }
}
     `

  const { authors } = await request<{ authors: IAuthor[] }>(graphqlAPI, query)
  return authors
}