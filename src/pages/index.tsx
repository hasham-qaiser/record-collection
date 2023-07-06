import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import DiscogRecord from "../../models/DiscogRecord";
import retrieveRecords from "../../utils/retrieveRecords";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

interface PageProps {
  records: DiscogRecord[];
}

export default function Home({ records }: PageProps) {
  return (
    <div className="bg-white">
      <Head>
        <title>My Record Collection - Hasham Qaiser</title>
      </Head>
      <h1 className="items-center flex flex-col text-4xl pt-2 font-sans text-black">
        My Record Collection
      </h1>
      <h3
        className="items-center flex flex-col text-xl text-black
      "
      >
        Powered by:
        <a
          className={styles.href}
          href={"https://www.discogs.com/"}
          target="blank"
          rel="noreferrer"
        >
          Discogs
        </a>
      </h3>
      <main className="items-center flex flex-col pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="grid gap-9 grid-cols-4 grid-rows-4"
        >
          {records.map((record, i) => {
            return (
              <a key={i} className="card w-50" href={`/${record.id}`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-48 w-48 relative"
                >
                  <Image
                    className="rounded-md"
                    src={record.basic_information.cover_image}
                    alt={record.basic_information.title}
                    fill={true}
                    priority
                  />
                </motion.div>
              </a>
            );
          })}
        </motion.div>
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
