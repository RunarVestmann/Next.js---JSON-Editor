import { Field } from "./Field";

interface ContainerProps {
  data: object | string;
  parentKeys?: string[];
}

export const Container = ({ data, parentKeys = [] }: ContainerProps) => {
  if (typeof data !== "object") {
    return <Field parentKeys={parentKeys} value={data as string} />;
  }

  return (
    <>
      {Object.entries(data).map(([key, value]) => {
        const newparentKeys = parentKeys.concat(key);
        const numericKey = Number(key);

        const shouldWrapWithListItem = !isNaN(numericKey);

        if (typeof value !== "object")
          return shouldWrapWithListItem ? (
            <li key={key}>
              <Field parentKeys={newparentKeys} value={value} />
            </li>
          ) : (
            <Field parentKeys={newparentKeys} value={value} key={key} />
          );

        return shouldWrapWithListItem ? (
          <li key={key}>
            <Container data={value} parentKeys={newparentKeys} />
          </li>
        ) : (
          <ul className={key} key={key}>
            <Container data={value} parentKeys={newparentKeys} />
          </ul>
        );
      })}
    </>
  );
};
