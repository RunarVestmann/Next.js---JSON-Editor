import { isRunningLocally } from "@/constants";
import { useDataContext } from "./dataContext";

interface FieldProps {
  parentKeys: string[];
  value: string | number;
}

export const Field = ({ parentKeys, value }: FieldProps) => {
  const { updateField } = useDataContext();

  return (
    <input
      className={parentKeys[parentKeys.length - 1]}
      type="text"
      value={value}
      onChange={(ev) => updateField(parentKeys, ev.target.value)}
      disabled={!isRunningLocally}
    />
  );
};
