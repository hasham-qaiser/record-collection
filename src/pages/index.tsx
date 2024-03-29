import { useState } from "react";
import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Github } from "lucide-react";
import DiscogRecord from "../../models/DiscogRecord";
import retrieveRecords from "../../utils/retrieveRecords";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ButtonIcon } from "@/components/GithubIcon";

interface PageProps {
  records: DiscogRecord[];
}

const Home = ({ records }: PageProps) => {
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(records.length / perPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    // Fetch data for the selected page
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    // Fetch data for the previous page
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    // Fetch data for the next page
  };

  const startRecordIndex = (currentPage - 1) * perPage;
  const visibleRecords = records.slice(
    startRecordIndex,
    startRecordIndex + perPage
  );

  return (
    <div>
      <Head>
        <title>My Record Collection - Hasham Qaiser</title>
      </Head>

      <div className=" mx-auto flex flex-row justify-end gap-x-2 mr-4 mt-4">
        <ButtonIcon url="https://github.com/hasham-qaiser/record-collection" />
        <ModeToggle />
      </div>

      <h1 className="text-xl lg:text-2xl xl:text-3xl text-center font-bold text-primary">
        My Record Collection
      </h1>
      <h3 className="items-center flex flex-col text-lg text-primary">
        By Hasham Qaiser
      </h3>
      <main className="flex flex-col items-center justify-between mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="justify-between items-center grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {visibleRecords.map((record, i) => {
            return (
              <Link key={i} href={`/${record.id}`}>
                <HoverCard>
                  <HoverCardTrigger>
                    <Card className="flex justify-center items-center">
                      <Image
                        className="rounded-md"
                        src={record.basic_information.cover_image}
                        alt={record.basic_information.title}
                        width={200}
                        height={200}
                        priority
                      />
                    </Card>
                    <HoverCardContent
                      className="w-80 rounded-md space-y-1 text-primary"
                      album={record}
                    />
                  </HoverCardTrigger>
                </HoverCard>
              </Link>
            );
          })}
        </motion.div>
        <Pagination className="fixed bottom-1" aria-label="Page navigation">
          <PaginationPrevious
            onClick={handlePreviousPage}
            className="hover:cursor-pointer"
          />
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationLink
                key={index}
                onClick={() => handlePageClick(index + 1)}
                isActive={index + 1 === currentPage}
                className={`hover:cursor-pointer ${
                  index + 1 === currentPage ? "font-bold" : ""
                }`}
              >
                {index + 1}
              </PaginationLink>
            ))}
          </PaginationContent>
          <PaginationNext
            onClick={handleNextPage}
            className="hover:cursor-pointer"
          />
        </Pagination>
      </main>
    </div>
  );
};

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

export default Home;
