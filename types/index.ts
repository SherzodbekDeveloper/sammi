export interface ChildProps {
	children: React.ReactNode
}

export interface IBlog {
	slug: string
	title: string
	description: string
	author: IAuthor
	category: ICategoryAndTags
	tag: ICategoryAndTags
	image: {url: string}
	createdAt: string
	content: {html: string}

}

export interface IAuthor {
	bio: string
	name: string
	image: { url: string }
	blog: IBlog[]
	id: number
}


export interface ICategoryAndTags {
	name: string
	slug: string
}

export interface IArchivedBlog{
	year: string
	blogs: IBlog[]
}