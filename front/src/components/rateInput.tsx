import { useState } from "react";

type Props = {
  value: number;
  onEnter: (value: number) => void;
};

export const RateInput = (props: Props) => {
  const [value, setValue] = useState<number>(props.value);

  return (
    <>
      <input
        type="number"
        value={value.toString()}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && props.onEnter(value);
        }}
      />
      <span>Eur/h</span>
    </>
  );
};
