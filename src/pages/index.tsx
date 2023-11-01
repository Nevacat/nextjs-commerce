import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useRef, useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/get-items')
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current == null || inputRef.current.value === '') {
      alert('Please enter a name');
      return;
    }

    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <input type="text" ref={inputRef} placeholder="name" />
        <button onClick={handleClick}>Add Jacket</button>
        <div>
          <p>Products List</p>
          {products &&
            products.map((item) => (
              <div key={item}>
                {JSON.stringify(item)}
                <br />
                <br />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
