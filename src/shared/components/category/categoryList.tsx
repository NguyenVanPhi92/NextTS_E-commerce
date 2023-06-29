import { Category } from "@/models";
import { API_URL } from "@/services";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

interface CategoryListProps {
	categoryList: Category[];
	idActive: number;
	onClick?: Function;
}

export const CategoryList = ({ categoryList, idActive, onClick }: CategoryListProps) => {
	return (
		<Swiper
			modules={[Navigation]}
			slidesPerView={5}
			spaceBetween={10}
			slidesPerGroup={5}
			navigation
			loop={false}
			breakpoints={{
				300: {
					spaceBetween: 5,
					slidesPerView: 3,
				},
				500: {
					spaceBetween: 10,
					slidesPerView: 4,
				},
				576: {
					spaceBetween: 5,
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 6,
				},
				1200: {
					slidesPerView: 6,
				},
			}}
		>
			{categoryList.map((cate) => (
				<SwiperSlide key={cate.id}>
					<div
						onClick={() => onClick && onClick()}
						className={`${cate.id === idActive ? "text-primary" : ""}`}
						key={cate.id}
					>
						<Link passHref href={`/category/${cate.id}`}>
							<div className="cursor-pointer p-4 flex justify-start items-center">
								<div className="mr-8 relative w-[50px] h-[40px]">
									<Image src={`${API_URL}${cate.icon}`} alt="" className="image" layout="fill" />
								</div>

								<p className="text-xs line-clamp-2 hover:text-primary">{cate.name}</p>
							</div>
						</Link>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
