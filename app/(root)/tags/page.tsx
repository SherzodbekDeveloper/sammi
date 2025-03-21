import CategTagsCard from '@/components/cards/categ-tags'
import { getTags } from '@/service/tag.service'
import { Dot, HomeIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata ={
	title:'All tags'
}

async function Page(){
	const tags = await getTags()

	return (
		<div className='max-w-6xl mx-auto'>
		<div className='relative min-h-[40vh] flex items-center justify-end flex-col'>
			<h2 className='text-center text-4xl section-title font-creteRound mt-2'>
				<span>Tags</span>
			</h2>
			<div className='flex gap-1 items-center mt-4'>
				<HomeIcon className='w-4 h-4' />
				<Link
					href={'/'}
					className='opacity-90 hover:underline hover:opacity-100'
				>
					Home
				</Link>
				<Dot />
				<p className='text-muted-foreground'>	Tags</p>
			</div>
		</div>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-24'>
				{tags.map((item) => (
					<CategTagsCard type={'tags'} key={item.slug} {...item} />
				))}
			</div>
	</div>
	)
}

export default Page