import {CSSProperties} from "react";
import {Option} from ".";
import "./style.css";

type OptionItemProps = {
  readonly option: Option;
  readonly selected?: boolean;
  readonly handleClick?: (option: Option) => void;
  readonly style?: CSSProperties;
};

export default function OptionItem({
  option,
  selected,
  handleClick,
  style,
}: OptionItemProps) {
  const selectedStyle = selected ? styles.selected : undefined;
  return (
    <div
      className="optionItemContainer"
      style={{...selectedStyle, ...style}}
      onClick={() => {
        handleClick?.(option);
      }}
    >
      {option.label}
    </div>
  );
}

const styles: {[key: string]: CSSProperties} = {
  selected: {
    backgroundColor: "#4f4f4f",
  },
};
