"use client";
import React from "react";
import { useEffect, useState } from "react";

interface Subte {
  id: string;
  linea: string;
  tripId: string;
}
export default function LiveSubte() {
  const [subtes, setSubtes] = useState<Subte[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                subtes {
                  id
                  linea
                  tripId
                }
              }
            `,
          }),
        });
        const data = await response.json();
        setSubtes(data.data.subtes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="py-2">Cargando...</div>;
  }
  return (
    <div className="w-[700px]">
      <h4 className="text-xl font-medium py-2">Subtes habilitados</h4>
      <ul className="grid grid-cols-4 gap-3 border border-neutral-400 p-5 rounded-xl">
        {subtes.map((subte) => (
          <li key={subte.id}>
            <div className="flex items-center gap-2">
              <h3>{subte.linea},</h3>
              <p>
                {subte.tripId}
                <strong>.</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
