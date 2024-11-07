"use client";
import TollPage from "./toll/page";
import Header from "@/components/header";
import { FormProvider, useForm } from "react-hook-form";
import { useMapEvents } from "react-leaflet";

export default function Home() {
  const { map } = useMapEvents({

  });
  
  const methods = useForm(
    {
      defaultValues: {
        location: ['', ''],
        vehicleType: "",
        dateTime: ""
      }
    }
  );
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header />
        <main className="">
        <TollPage />
        </main>
        <footer className="row-start-3 p-2 bg-sky-600 text-white flex gap-6 flex-wrap items-center justify-center">
          &copy; Copright {new Date().getFullYear()} All rights reserved | Toll Calculator
        </footer>
      </div>
    </FormProvider>

  );
}
