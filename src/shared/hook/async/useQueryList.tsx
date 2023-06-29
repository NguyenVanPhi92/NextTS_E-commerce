import {
	ListQuery,
	QueryList,
	QueryListFunction,
	UseQueryListRes,
} from "@/models";
import { AxiosPromise, AxiosResponse } from "axios";
import _ from "lodash";
import { useState } from "react";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";

const DEFAULT_LIMIT = 4;

// KDL khi khởi tạo custom hook này: sẽ có 2 types cần truyền vào: T là KDL của data, V là KDL của params
interface Props<T, V = any> {
	key: string;
	initialData?: T[] | undefined;
	fetcher: (params?: V & ListQuery) => Promise<AxiosResponse<T[]>>;
	initialParams?: V & ListQuery;
	config?: Partial<PublicConfiguration<any, any, (args_0: string) => any>>;
}

export const useQueryList = <T, V>({
	key,
	initialData,
	fetcher,
	initialParams,
	config,
}: Props<T, V>): UseQueryListRes<T, V> => {
	const limit = initialParams?.limit || DEFAULT_LIMIT;

	const { isValidating, mutate, data, error } = useSWR(
		key,
		fetcher
			? () =>
					fetcher(initialParams)
						.then((res) => {
							const data = getDataResponse(res);

							setHasMore(data.length >= limit);
							return data;
						})
						.catch((err) => console.log(err))
			: null,
		{
			...config,
			fallbackData: initialData,
		}
	);

	const [offset, setOffset] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isFetchingMore, setFetchingMore] = useState<boolean>(false);
	const [params, setParams] = useState<(V & QueryList) | undefined>(
		initialParams
	);

	const getDataResponse = <T,>(res: any): T[] => {
		if (_.isArray(res?.data)) {
			return res?.data || [];
		}

		if (res?.result) {
			return res.result || [];
		}

		return res?.result?.data || [];
	};

	const filter = async (_: QueryListFunction<T, V>) => {
		const { params: _params, onError, onSuccess } = _;

		try {
			setLoading(true);
			const newParams = { ...params, ..._params, limit, offset: 0 };

			const res = await fetcher(newParams);
			const data = getDataResponse<T>(res);

			setParams(newParams);
			setLoading(false);
			setOffset(0);
			setHasMore(data.length >= limit);

			mutate(data, false);
			onSuccess?.(data);
		} catch (error) {
			setLoading(false);
			onError?.();
			console.log(error);
		}
	};

	const fetchMore = async (_: QueryListFunction<T, V>) => {
		if (
			data?.length < limit ||
			!hasMore ||
			isFetchingMore ||
			isValidating ||
			isLoading
		)
			return;
		console.log({ hasMore, isFetchingMore, isValidating, isLoading });

		const { params: _params, onError, onSuccess } = _;

		try {
			setFetchingMore(true);
			const newOffset = offset + limit;
			const newParams = { ...params, ..._params, limit, offset: newOffset };

			const res = await fetcher(newParams);
			const list = getDataResponse<T>(res);

			setFetchingMore(false);
			setParams(newParams);
			setOffset(offset + limit);
			setHasMore(list.length >= limit);

			mutate([...(data || []), ...list], false);
			onSuccess?.(list);
		} catch (error) {
			onError?.();
			setFetchingMore(false);
			console.log(error);
		}
	};

	return {
		data,
		isValidating: isValidating || isLoading,
		isFirstLoading: data === undefined && error === undefined,
		isFetchingMore,
		hasMore: hasMore && data?.length >= limit,
		fetchMore,
		filter,
		offset,
		error,
		mutate,
		params,
	};
};
