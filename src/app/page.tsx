"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/fsw-donalds"); // Redireciona para a página desejada
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100%]">
      {/* Logo do McDonald's */}
      <Image
        src="/comida.png" // Substitua pelo caminho correto da sua logo
        alt="McDonald's Logo"
        width={150} // Ajuste o tamanho conforme necessário
        height={150}
        className="cursor-pointer"
        onClick={handleLogoClick}
      />  
      <h1>Clique no icone para visitar o restaurante.</h1>
    </div>
  );
};

export default HomePage;
