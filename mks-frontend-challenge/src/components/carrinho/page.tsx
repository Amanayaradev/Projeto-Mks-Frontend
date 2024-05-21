import Link from "next/link";
import styles from "./style.module.scss"
import carrinho from "../../../public/carrinho.svg"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carrinho() {

  return(
    <section className={styles.carrinho}>
      <div>
        <span className={styles.carrinhobox1}>
          <span className={styles.carrinhoLink}>
              <h2>Carrinho <br/> de compras</h2>
          </span>
        </span>
        <ul className={`${styles.ul}`}>
          <li>
            <Link href="/">
              <div>
                <p>Produto um</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div>
                <p>Produto dois</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div>
      <div className={styles.total}>
        <h3>Total:</h3>
        <span>R$valor</span>
      </div>
      <button type="submit">Finalizar Compra</button>
      </div>
    </section>
  )
}