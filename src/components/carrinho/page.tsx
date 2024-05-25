import styles from "./style.module.scss";
import { PropsProduto } from "../cards/page";
import Image from "next/image";
import excluir from "../../../public/fechar.svg";
import { useEffect, useState } from "react";

const handleRemoveItem = (product: PropsProduto, setProducts: React.Dispatch<React.SetStateAction<PropsProduto[]>>) => {
  console.log("params", product);

  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  const updatedProducts: PropsProduto[] = products.filter((prod: PropsProduto) => prod.id !== product.id);

  console.log("return", products);
  console.log(updatedProducts);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  setProducts(updatedProducts);
}

const handleDimunue = (product: PropsProduto, setProducts: React.Dispatch<React.SetStateAction<PropsProduto[]>>) => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  // Encontra o índice do produto no array de produtos
  const index = products.findIndex((prod: PropsProduto) => prod.id === product.id);

  // Verifica se o produto está no carrinho
  if (index !== -1) {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1); // Remove o produto do array

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  }
}

const handleAddItem = (product: PropsProduto, setProducts: React.Dispatch<React.SetStateAction<PropsProduto[]>>) => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const updatedProducts: PropsProduto[] = [...products, product];

  localStorage.setItem('products', JSON.stringify(updatedProducts));
  setProducts(updatedProducts);
}


export default function Carrinho() {
  const [products, setProducts] = useState<PropsProduto[]>([]);
  const [values, setValues] = useState<string[]>(["0"]);
  console.log("values", values)
    useEffect(() => {
      const storedIdsString: string | null = localStorage.getItem('products');
      const storedBuy: PropsProduto[] = storedIdsString ? JSON.parse(storedIdsString) : [];
      const val = storedBuy.map((val) => (val.price))
      setValues(val)
      setProducts(storedBuy);
    }, []);

  const addProduct = (num: number) => {
    console.log(num + 1)
  }
  const sum = values.reduce((total, num) => total + parseFloat(num), 0);
  return (
    <section className={styles.carrinho}>
      <div className={styles.paddingCar}>
        <span className={styles.carrinhobox1}>
          <span className={styles.carrinhoH2}>
            <h2>Carrinho <br/> de compras</h2>
          </span>
        </span>
        <div className={styles.ulContainer}>
          <ul className={styles.ul}>
            {products?.map((buy) => (
              <li key={buy.id}>

                <div className={styles.boxCar}>
                  <div className={styles.boxImg}>
                    <Image className={styles.image} src={buy.photo} alt={buy.name} width={60} height={60} />
                    <p>{buy.name}</p>
                  </div>
                  <div className={styles.boxSpan}>
                    <p className={styles.quantityLabel}>qtd:</p>
                    <div className={styles.buttons}>
                    <button type="submit" onClick={() => handleDimunue(buy, setProducts)}>-</button>
                    <button>{/* Aqui você pode colocar a quantidade do item */}</button>
                    <button onClick={() => handleAddItem(buy, setProducts)}>+</button>
                  </div>

                  </div>
                  <span>R${buy.price}</span>
                  <div className={styles.boxExcluir}>
                    <button className={styles.btnExcluir} onClick={() => handleRemoveItem(buy, setProducts)}>
                      <Image src={excluir} alt="fechar carrinho de compras" width={12} height={12} />
                    </button> 
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.total}>
          <h3>Total:</h3>
          <span>R${sum.toFixed(2)}</span>
        </div>
      </div>
      <button className={styles.button} type="submit">Finalizar Compra</button>
    </section>
  );
}