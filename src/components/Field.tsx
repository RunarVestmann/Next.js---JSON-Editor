import { isRunningLocally } from "@/constants";
import { useDataContext } from "./dataContext";

interface FieldProps {
  parentKeys: string[];
  value: string | number;
}

export const Field = ({ parentKeys, value }: FieldProps) => {
  const { updateField } = useDataContext();

  return (
    <div
      className={parentKeys[parentKeys.length - 1]}
      onInput={(ev) => updateField(parentKeys, ev.currentTarget.textContent)}
      contentEditable={isRunningLocally}
      suppressContentEditableWarning={true}
    >
      {value}
    </div>
  );
};
