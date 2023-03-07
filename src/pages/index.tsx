import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import DiscogRecord from "../../models/DiscogRecord";
import retrieveRecords from "../../utils/retrieveRecords";
import styles from "../styles/Home.module.css";

interface PageProps {
  records: DiscogRecord[];
}

export default function Home({ records }: PageProps) {
  return (
    <div>
      <Head>
        <title>My Record Collection - Hasham Qaiser</title>
      </Head>
      <h1 className={styles.h1}>My Record Collection</h1>
      <h3 className={styles.h3}>
        Data provided by
        <a
          className={styles.href}
          href={"https://www.discogs.com/"}
          target="blank"
          rel="noreferrer"
        >
          Discogs
        </a>
      </h3>
      <main className={styles.main}>
        <div className={styles.grid}>
          {records.map((record, i) => {
            return (
              <a key={i} className={styles.card} href={`/${record.id}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={record.basic_information.cover_image}
                    alt={record.basic_information.title}
                    fill
                    priority
                  />
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await retrieveRecords();
    if (!data) {
      throw new Error("No records found");
    }
    return {
      props: {
        records: data.releases,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};
