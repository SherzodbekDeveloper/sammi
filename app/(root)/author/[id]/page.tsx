import BlogCard from '@/components/cards/blog'
import { getDetailedAuthors } from '@/service/author.service'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function AuthorPage({ params }: { params: { id: string } }) {
     const author = await getDetailedAuthors(params.id)
     
     return (
          <div className='pt-36'>
               <div className='flex mt-6 gap-6 items-center max-md:flex-col'>
                    <Image
                         src={author.image.url}
                         alt='author'
                         width='255'
                         height='255'
                         className='rounded-md max-md:self-start'
                    />
                    <div className='flex-1 flex flex-col space-y-4'>
                         <p className='text-muted-foreground'>
                              <span className='font-bold text-white'>{author.blog.length}</span> Published posts
                         </p>
                         <h2 className='text-3xl font-creteRound'>{author.name}</h2>
                         <p className='line-clamp-2 text-muted-foreground'>
                              {author.bio}
                         </p>
                         <Link
                              href={'/'}
                              className='flex items-center gap-2 hover:text-blue-500 underline transition-colors'
                         >
                              <span>See all posts by this author</span>
                              <ArrowUpRight />
                         </Link>
                    </div>
               </div>
               <h2 className='text-center text-4xl section-title font-creteRound my-12'>
				<span>Pubshiled Posts</span>
			</h2>
               <div className='grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-24 mt-24'>
				{author.blog.map(blog => (
					<BlogCard key={blog.title} {...blog} isVertical />
				))}
			</div>

          </div>
     )
}

export default AuthorPage