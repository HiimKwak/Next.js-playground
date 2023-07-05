import { getProducts } from "@/service/products";
import Link from "next/link";
import MeowArticle from "../../components/MeowArticle";
import Image from "next/image";
import clothesImage from "../../../public/images/clothes.jpg";

// export const revalidate = 3;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <h1>제품 소개 페이지!</h1>
      <Image src={clothesImage} alt="Clothes" priority />
      <ul>
        {products.map(({ id, name }, index) => (
          <li key={index}>
            <Link href={`/products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle />
    </>
  );
}
