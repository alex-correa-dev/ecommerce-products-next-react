import { Header } from '../components/common/header/Header';
import { ProductsContainer } from '../components/products/ProductsContainer';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100 font-sans dark:bg-black px-4 lg:px-16">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start mt-16">
        <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
        <ProductsContainer />
      </main>
    </div>
  );
}
