import { isRunningLocally } from "@/constants";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DataContextProvider } from "../components/dataContext";

interface JsonEditorProps {
  filename: string;
}

export const JsonEditor = ({ filename }: JsonEditorProps) => {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch("/api/get-file?filename=" + filename, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((json) => setData(json.data));
    });
  }, [filename]);

  const updateField = (keys: string[], value: unknown) => {
    let current = data;

    for (let i = 0; i < keys.length - 1; i += 1) {
      const key = keys[i];
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;

    setData({ ...data });

    if (!isRunningLocally) return;

    fetch("/api/update-file", {
      body: JSON.stringify({
        data,
        filename: filename,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <DataContextProvider value={{ data, updateField }}>
      <Container data={data} />
    </DataContextProvider>
  );
};
