import { isRunningLocally } from "@/constants";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DataContextProvider } from "../components/dataContext";

const getParsedData = (data: Record<string, any>, dataPicker: string[]) => {
  if (dataPicker.length === 0) return data;
  let current = data;
  if (Object.keys(data).length > 0) {
    for (let key of dataPicker) current = current[key];
  }
  current = { [dataPicker[dataPicker.length - 1]]: current };
  return current;
};

const getParsedParentKeys = (dataPicker: string[]) => {
  const parsedDataPicker = [...dataPicker];
  parsedDataPicker.pop();
  return parsedDataPicker;
};

interface JsonEditorProps {
  filename: string;

  /** List of keys inside the json file that contain the data you'd like to render */
  dataPicker?: string[];
}

export const JsonEditor = ({ filename, dataPicker = [] }: JsonEditorProps) => {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch("/api/get-file?filename=" + filename, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json().then((json) => setData(json.data)));
  }, [filename, dataPicker]);

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
      <Container
        data={getParsedData(data, dataPicker)}
        parentKeys={getParsedParentKeys(dataPicker)}
      />
    </DataContextProvider>
  );
};
