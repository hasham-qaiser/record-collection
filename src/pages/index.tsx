import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import DiscogRecord from "../../models/DiscogRecord";
import retrieveRecords from "../../utils/retrieveRecords";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";

interface PageProps {
  records: DiscogRecord[];
}

export default function Home({ records }: PageProps) {
  return (
    <div className="grainy">
      <Head>
        <title>My Record Collection - Hasham Qaiser</title>
      </Head>
      <h1 className="items-center flex flex-col text-4xl pt-2 font-bold  text-black">
        My Record Collection
      </h1>
      <h3 className="items-center flex flex-col text-xl text-black">
        Powered by:
        <a
          className="font-semibold text-[#f7ab0a] pb-4"
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
          className="grid gap-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {records.map((record, i) => {
            return (
              <a key={i} className="card w-50" href={`/${record.id}`}>
                <div className="h-48 w-48 relative">
                  <HoverCard>
                    <HoverCardTrigger>
                      <Image
                        className="rounded-md"
                        src={record.basic_information.cover_image}
                        alt="album cover"
                        width={200}
                        height={200}
                        priority
                      />

                      <HoverCardContent
                        className="w-80 rounded-md space-y-1 "
                        album={record}
                      />
                    </HoverCardTrigger>
                  </HoverCard>
                </div>
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
