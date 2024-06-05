import { useQuery } from "@tanstack/react-query";
import React from "react";

function Api() {
  const { isPending, error, data } = useQuery({
    queryKey: ["api-test"],
    queryFn: () => fetch("/api/test").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>response: {data.message}</h2>
    </div>
  );
}

export default Api;
