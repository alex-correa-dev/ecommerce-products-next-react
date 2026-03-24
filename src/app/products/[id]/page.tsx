import { Header } from '../../../components/common/header/Header';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div />
      </main>
    </>
  );
}