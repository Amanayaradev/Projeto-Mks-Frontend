"use client";
import Image from "next/image";
import Link from "next/link";
import carrinho from "../../../public/carrinho.svg";
import fechar from "../../../public/fechar.svg";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Carrinho from "../carrinho/page";
import { PropsProduto } from "../cards/page";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [qtd, setQtd] = useState(0);


  useEffect(() => {
    const updateProductQuantity = () => {
      const storedIdsString: string | null = localStorage.getItem('products');
      const storedBuy: PropsProduto[] = storedIdsString ? JSON.parse(storedIdsString) : [];
      const qtdProduct = storedBuy.length;
      setQtd(qtdProduct);
    };
    updateProductQuantity()
  }, [isOpen]);

  return (
    <header>
      <div className={styles.header}>
        <Link href="/">
          <h2 className={styles['logo-mks']}>MKS<span>Sistemas</span></h2>
        </Link>
        <div>
          {!isOpen ? (
            <div className={styles.carrinhoOpen} onClick={() => setIsOpen(!isOpen)}>
              <Image src={carrinho} alt="carrinho de compras" width={20} height={20} />
              <p>{qtd}</p>
            </div>
          ) : (
            <div className={styles.carrinhoClose} onClick={() => setIsOpen(!isOpen)}>
              <Image src={fechar} alt="fechar carrinho de compras" width={20} height={20} />
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className={styles.car}>
          <Carrinho/>
        </div>
      )}
    </header>
  );
}
