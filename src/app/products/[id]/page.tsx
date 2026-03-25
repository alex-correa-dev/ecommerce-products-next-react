import { Header } from '../../../components/common/header/Header';
import { ProductDetails } from '../../../components/product/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails productId={id} />
      </main>
    </>
  );
}