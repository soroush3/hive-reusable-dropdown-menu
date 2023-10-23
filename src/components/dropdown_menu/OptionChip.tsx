import {Option} from ".";
import "./style.css";

type OptionChipProps = {
  readonly option: Option;
  readonly handleDelete?: (option: Option) => void;
};

export default function OptionChip({option, handleDelete}: OptionChipProps) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="chip">
      <div className="chipText">{option.label}</div>
      {handleDelete ? (
        <div className="chipDelete" onClick={() => handleDelete?.(option)}>
          {/* ideally would use svg */}
          {"\u2715"}
        </div>
      ) : null}
    </div>
  );
}
