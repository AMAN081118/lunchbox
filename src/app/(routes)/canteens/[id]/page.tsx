import React from "react";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = ({ params, searchParams }: PageProps) => {
  const canteenId = params.id;
  return <div>Canteen #{canteenId}</div>;
};

export default page;
