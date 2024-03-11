"use client";
import React from "react";
import { useEffect, useState } from "react";

interface Subte {
  id: string;
  linea: string;
  tripId: string;
  startTime: string;
  estaciones: string;
}

export default function Subtes() {
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
                  startTime
                  estaciones
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
    return <div className="py-2">{""}</div>;
  }
  return (
    <div className="w-[700px] mt-14">
      <div>
        <h4 className="text-xl font-medium py-2">Subtes y estaciones</h4>
        <ul className="flex flex-col gap-5">
          {subtes.map((subte) => (
            <li
              className="border border-neutral-400 p-5 rounded-xl"
              key={subte.id}
            >
              <div className="flex justify-between">
                <div>
                  <strong>Linea</strong>
                  <h3>{subte.tripId}</h3>
                </div>
                <div>
                  <strong>Horario de salida</strong>
                  <h3>{subte.startTime} AM</h3>
                </div>
                <div className="max-w-[200px]">
                  <strong>Estaciones</strong>
                  <h3 className="text-sm">{subte.estaciones}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
