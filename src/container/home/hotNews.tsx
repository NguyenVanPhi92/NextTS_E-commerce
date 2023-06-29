import { imageBlur } from '@/assets'
import { PostRes } from '@/models'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NewsItemProps {
    data: PostRes | null
    onClick?: (id: string) => void
}

const FirstRankNews = ({ data, onClick }: NewsItemProps) => {
    const router = useRouter()

    if (data === null)
        return (
            <div className='flex flex-col'>
                <div className='aspect-1 skeleton mb-16 rounded-[5px] lg:rounded-[10px]'></div>
                <div className='rounded-[4px] mb-12 h-[18px] skeleton w-1/2'></div>
                <div className='rounded-[4px] h-[12px] skeleton mb-4'></div>
                <div className='rounded-[4px] h-[12px] skeleton w-[2/3]'></div>
            </div>
        )
    return (
        <div
            onClick={() => (onClick ? onClick?.(data.postId) : router.push(`/news/${data.postId}`))}
        >
            <div className='flex flex-col gap-8'>
                <div className='mb-[2px] lg:mb-8'>
                    <div className='relative aspect-1 overflow-hidden group h-[300px] w-full'>
                        <Image
                            className='select-none transform group-hover:scale-110 transition-all duration-500 cursor-pointer'
                            src={data.thumbnail}
                            layout='fill'
                            objectFit='cover'
                            alt=''
                            blurDataURL={imageBlur}
                        />
                    </div>
                </div>
                <div>
                    <a className='text-16 leading-[22px] cursor-pointer hover:text-primary md:text-[16px] md:leading-[24px] font-semibold line-clamp-2'>
                        {data.title}
                    </a>
                    <p className='line-clamp-1 text-[10px] md:text-12 text-gray-color-3 font-normal mb-[4px] lg:mb-[8px]'>
                        {moment(data.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <a className='text-12 hover:text-primary cursor-pointer md:text-[12px] md:leading-[18px] font-semiboldS'>
                        {data.shortContent}
                    </a>
                    <p className='line-clamp-1 text-[10px] md:text-12 text-gray-color-3 font-semibold text-end mb-[4px] lg:mb-[8px]'>
                        {data.category.categoryName}
                    </p>
                </div>
            </div>
        </div>
    )
}

const SecondRankNews = ({ data, onClick }: NewsItemProps) => {
    const router = useRouter()

    if (data === null)
        return (
            <div className='flex flex-col'>
                <div className='aspect-1 skeleton mb-16 rounded-[5px] lg:rounded-[10px]'></div>
                <div className='rounded-[4px] mb-12 h-[18px] skeleton w-1/2'></div>
                <div className='rounded-[4px] h-[12px] skeleton mb-4'></div>
                <div className='rounded-[4px] h-[12px] skeleton w-[2/3]'></div>
            </div>
        )
    return (
        <div
            onClick={() => (onClick ? onClick?.(data.postId) : router.push(`/news/${data.postId}`))}
        >
            <div className='relative aspect-1 overflow-hidden group h-[300px] mb-[4px] md:h-[150px] w-full'>
                <Image
                    className='select-none cursor-pointer transform group-hover:scale-110 transition-all duration-500'
                    src={data.thumbnail}
                    layout='fill'
                    objectFit='cover'
                    alt=''
                    blurDataURL={imageBlur}
                />
            </div>
            <div>
                <a className='text-16 cursor-pointer leading-[22px] hover:text-primary md:text-[12px] md:leading-[18px] font-semibold line-clamp-2'>
                    {data.title}
                </a>
                <p className='line-clamp-1 text-[10px] md:text-12 text-gray-color-3 font-normal mb-[4px] lg:mb-[8px]'>
                    {moment(data.createdAt).format('DD/MM/YYYY')}
                </p>
            </div>
        </div>
    )
}

const ThirdRankNews = ({ data, onClick }: NewsItemProps) => {
    const router = useRouter()

    if (data === null)
        return (
            <div className='flex flex-col'>
                <div className='aspect-1 skeleton mb-16 rounded-[5px] lg:rounded-[10px]'></div>
                <div className='rounded-[4px] mb-12 h-[18px] skeleton w-1/2'></div>
                <div className='rounded-[4px] h-[12px] skeleton mb-4'></div>
                <div className='rounded-[4px] h-[12px] skeleton w-[2/3]'></div>
            </div>
        )
    return (
        <div
            onClick={() => (onClick ? onClick?.(data.postId) : router.push(`/news/${data.postId}`))}
        >
            <div className='flex gap-[10px] mb-[8px]'>
                <div className='flex-none relative aspect-1 overflow-hidden group h-[100px]'>
                    <Image
                        className='select-none cursor-pointer transform group-hover:scale-110 transition-all duration-500'
                        src={data.thumbnail}
                        layout='fill'
                        objectFit='cover'
                        alt=''
                        blurDataURL={imageBlur}
                    />
                </div>
                <div className='flex-auto'>
                    <a className='text-12 cursor-pointer leading-[18px] hover:text-primary md:text-[12px] md:leading-[15px] font-semibold line-clamp-2'>
                        {data.title}
                    </a>
                    <p className='line-clamp-1 text-[10px] md:text-12 text-gray-color-3 font-normal mb-[4px] lg:mb-[8px]'>
                        {moment(data.createdAt).format('DD/MM/YYYY')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export { FirstRankNews, SecondRankNews, ThirdRankNews }
