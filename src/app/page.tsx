import Image from "next/image";
import { Header } from '../components/common/header/Header';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100 font-sans dark:bg-black">
      <Header />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start mt-16">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />    
      </main>
    </div>
  );
}
