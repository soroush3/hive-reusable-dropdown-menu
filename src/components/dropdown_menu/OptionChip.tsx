import {Option} from ".";
import "./style.css";

type OptionChipProps = {
  readonly option: Option;
  readonly handleDelete?: (option: Option) => void;
};

export const OPTION_CHIP_DELETE_ID = "option-chip-delete";

export default function OptionChip({option, handleDelete}: OptionChipProps) {
  return (
    <div className="chip">
      <div className="chipText">{option.label}</div>
      {handleDelete ? (
        <div
          className="chipDelete"
          id={OPTION_CHIP_DELETE_ID}
          onClick={() => handleDelete?.(option)}
        >
          {/* ideally would use svg */}
          {"\u2715"}
        </div>
      ) : null}
    </div>
  );
}
