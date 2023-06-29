import { ogImage } from "@/assets";
import {
	Breadcrumb,
	CategoryList,
	HeaderMobile,
	Seo,
	ShopDetailbanner,
	ShopInfo,
	ShopProducts,
	Spinner,
} from "@/components";
import { DOMAIN_URL } from "@/helper";
import { MainLayout } from "@/layout";
import { CompanyDetail, OpenGraphData } from "@/models";
import companyApi from "@/services/companyApi";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useCategory } from "shared/hook";

interface CategoryProps {
	data: CompanyDetail;
}

const CompanyPage = ({ data }: CategoryProps) => {
	const router = useRouter();
	const { data: categories, isValidating, error } = useCategory(true);

	if (router.isFallback)
		return (
			<div className="py-24">
				<Spinner />
			</div>
		);
	return (
		<section className="pb-24 shop__page">
			<HeaderMobile centerChild={<p>{data?.name || "Công ty Mặc Định"}</p>} />
			<Seo description="" title={data?.name} thumbnailUrl="" url="" />

			<div className="container">
				<ShopInfo data={data} />

				<Breadcrumb breadcrumbList={[{ name: data?.name || "Công ty Mặc Định", path: "" }]} />

				<div className="">
					<ShopDetailbanner />
				</div>

				<div className="flex flex-col gap-10">
					<div className="py-8">
						<CategoryList
							// onClick={() => dispatch(setOpenModalFilter(false))}
							categoryList={categories}
							idActive={Number(router.query?.category_id) || 0}
						/>
					</div>

					<div className="">
						<ShopProducts />
					</div>
				</div>
			</div>
		</section>
	);
};

CompanyPage.Layout = MainLayout;

export default CompanyPage;

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await companyApi.getCompanyList();
	return {
		paths: res?.result?.data?.map((item) => ({
			params: {
				company_id: item.id + "",
			},
		})),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	const company_id = Number(context.params?.company_id) || 1;

	const res = await companyApi.getDetailCompany(company_id);
	const data = res?.result?.data;

	if (!data?.id) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			category: res?.result?.data || {},
			data,
			openGraphData: [
				{
					property: "og:image",
					content: data?.logo || ogImage,
					key: "ogimage",
				},
				{
					property: "og:image:alt",
					content: data?.logo || ogImage,
					key: "ogimagealt",
				},
				{
					property: "og:image:width",
					content: "400",
					key: "ogimagewidth",
				},
				{
					property: "og:image:height",
					content: "300",
					key: "ogimageheight",
				},
				{
					property: "og:url",
					content: `${DOMAIN_URL}/company/${data?.id}`,
					key: "ogurl",
				},
				{
					property: "og:image:secure_url",
					content: data?.logo || ogImage,
					key: "ogimagesecureurl",
				},
				{
					property: "og:title",
					content: data?.name,
					key: "ogtitle",
				},
				{
					property: "og:description",
					content: data?.name,
					key: "ogdesc",
				},
				{
					property: "og:type",
					content: "website",
					key: "website",
				},
			] as OpenGraphData[],
		},
		revalidate: 10,
	};
};
