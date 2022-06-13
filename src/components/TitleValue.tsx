import { PropsWithChildren } from "react";

export default function TitleValue({
  title,
  value,
}: PropsWithChildren<{ title: string; value: string }>) {
  return (
    <p className="title__value">
      <strong>{title}:</strong> {value}
    </p>
  );
}
