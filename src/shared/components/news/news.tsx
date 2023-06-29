import { Spinner, Tabs } from "@/components";
import { GetPostsParams, NewsCategoryRes, PostRes } from "@/models";
import newsApi from "@/services/newsApi";
import { useQueryList } from "shared/hook";
import useSWR from "swr";
import { NewsItem } from "./newsItem";

const News = () => {
	const {
		data: news,
		fetchMore,
		filter,
		params,
		isValidating: isValidatingNews,
		hasMore,
		isFetchingMore,
	} = useQueryList<PostRes, GetPostsParams>({
		key: "get_list_news",
		fetcher: newsApi.getPosts,
		initialParams: { categoryId: "" },
	});

	const { data: categories } = useSWR<NewsCategoryRes[]>(
		"get_category_list",
		() =>
			newsApi
				.getCategories()
				.then((res: any) => res.data)
				.catch((err) => console.log(err))
	);

	return (
		<div className="">
			<div className="relative mr-[-12px]">
				<span className="absolute right-0 top-0 bottom-0 w-[20px] bg-linear-gradient z-10"></span>
				<Tabs
					className="flex-nowrap overflow-auto mb-24 border-b-0 justify-center"
					onChange={(val) =>
						filter({ params: { categoryId: val === "all" ? "" : val } })
					}
					tabActive={!params?.categoryId ? "all" : params.categoryId}
					list={[
						{ label: "Tất cả", value: "all" },
						...(categories || [])?.map((item) => ({
							label: item.name,
							value: item.categoryId,
						})),
					]}
				/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-custom lg:grid-cols-4">
				{isValidatingNews
					? Array.from({ length: 4 }).map((_, index) => (
							<NewsItem key={index} data={null} />
					  ))
					: news?.map((item) => <NewsItem data={item} key={item.postId} />)}
			</div>

			{isFetchingMore ? <Spinner /> : null}

			{hasMore ? (
				<button
					onClick={() => fetchMore({ params: {} })}
					className="mx-auto btn-primary-outline mt-32 lg:mt-[40px]"
				>
					Xem thêm
				</button>
			) : null}
		</div>
	);
};

export { News };
