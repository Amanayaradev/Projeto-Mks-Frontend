"use client"; 

import axios from "axios";
import Image from "next/image";
import bag from "../../../public/shopping-bag.svg";
import styles from "./style.module.scss";
import { useQuery } from "react-query";

export interface PropsProduto {
  id: number;
  name: string;
  brad: string;
  description: string;
  photo: string;
  price: string;
}

const params = {
  page: 1,
  rows: 10,
  sortBy: "id",
  orderBy: "DESC"
};

export async function fetchData() {
  const URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products';
  
  try {
    const resposta = await axios.get(URL, { params });
    return resposta.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
      console.error("Error response:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to fetch data");
  }
}

const handleBuy = (produto: PropsProduto) => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  // Verifica se o produto já está no carrinho pelo ID
  const productExists = products.some((p: PropsProduto) => p.id === produto.id);
  
  if (!productExists) {
    // Adiciona o produto à lista de produtos
    products.push(produto);
    // Atualiza o localStorage com a nova lista de produtos
    localStorage.setItem('products', JSON.stringify(products));
  } else {
    console.log("Este produto já está no carrinho.");
  }
};

export default function Cards() {
  const { data: produtos, status, error } = useQuery<PropsProduto[]>('data', fetchData);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Failed to load data</p>;
  }


  

  return (
    <section className={styles.cards}>
      <ul>
      {produtos?.map(produto => (
        <li key={produto.id}>
          <div className={styles.container}>
            <Image className={styles.image} src={produto.photo} alt="Sacola" width={150} height={150} />
            <div className={styles.prod}>
              <p>{produto.name}</p>
              <span>R${produto.price}</span>
            </div>
            <p className={styles.description}>{produto.description}</p>
          </div>
          <button onClick={() => handleBuy(produto)}>
            <Image src={bag} alt="Sacola" width={20} height={20} />
            COMPRAR
          </button>
        </li>
      ))}
      </ul>
    </section>
  );
}
