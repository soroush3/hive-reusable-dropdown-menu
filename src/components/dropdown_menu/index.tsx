import {CSSProperties, useEffect, useMemo, useRef, useState} from "react";
import OptionItem from "./OptionItem";
import "./style.css";
import OptionChip, {OPTION_CHIP_DELETE_ID} from "./OptionChip";

export type Option = {
  readonly label: string;
  readonly value: string;
};

type DropdownMenuProps = {
  readonly title?: string;
  readonly options: Option[]; // assume user doesn't pass duplicates
  /** Let's you optionally pass down the options that are selected. */
  readonly selectedOptions?: Option[];
  /** Allows for the parent component to get the newly updated selections. For simplicity,
   * keeping the argument as an array for both single and multi select.
   */
  readonly handleChange?: (options: Option[]) => void;
  /** Dictates if single or multiple values can be selected from the dropwdown. */
  readonly multiSelect?: boolean;
  /** This is here to allow for specific customization. Typically re-usables restrict modifications
   * to things like width, height, etc..
   */
  readonly style?: CSSProperties;
  /** Determines the max height of the options list. */
  readonly optionsMaxHeight?: string;
};

export default function DropdownMenu(props: DropdownMenuProps) {
  const {
    title = "Select...",
    options,
    selectedOptions: selectedOptionsProp,
    handleChange,
    multiSelect,
    style,
    optionsMaxHeight,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    selectedOptionsProp ?? []
  );

  /** Allows for closing of the dropdown when clicking outside of itself. */
  useEffect(() => {
    const handleMouseUp = ({target}: MouseEvent) => {
      if (!dropdownRef.current?.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const dropdownOptions = useMemo(() => {
    const handleClick = (selectedOption: Option) => {
      const hasValue = selectedOptions.indexOf(selectedOption) !== -1;
      if (hasValue) {
        const newSelectedOptions = selectedOptions.filter(
          (option) => option.value !== selectedOption.value
        );
        setSelectedOptions(newSelectedOptions);
        handleChange?.(newSelectedOptions);
      } else {
        const newSelectedOptions = multiSelect
          ? [...selectedOptions, selectedOption]
          : [selectedOption];
        setSelectedOptions(newSelectedOptions);
        handleChange?.(newSelectedOptions);
      }
      if (!multiSelect) setIsOpen(false);
    };
    return options.map((option) => {
      const isSelected =
        selectedOptions.findIndex(({value}) => value === option.value) !== -1;
      return (
        <OptionItem
          key={option.value}
          option={option}
          selected={isSelected}
          handleClick={handleClick}
        />
      );
    });
  }, [handleChange, multiSelect, options, selectedOptions]);

  const optionChips = useMemo(() => {
    const handleDelete = (optionToDelete: Option) => {
      setSelectedOptions((selectedOptions) =>
        selectedOptions.filter((option) => option !== optionToDelete)
      );
    };
    return selectedOptions.map((option) => (
      <OptionChip
        key={option.value}
        option={option}
        handleDelete={handleDelete}
      />
    ));
  }, [selectedOptions]);

  return (
    <div style={style} ref={dropdownRef}>
      <button
        className="dropdownButton"
        onClick={({target}) => {
          const targetEle = target as HTMLElement;
          if (targetEle.id === OPTION_CHIP_DELETE_ID) return;
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {selectedOptions.length ? (
          <>
            {multiSelect ? (
              <div className="optionChipsContainer">{optionChips}</div>
            ) : (
              <div>{selectedOptions[0].label}</div>
            )}
          </>
        ) : (
          title
        )}
        <div className="caratSymbol">{isOpen ? "\u25b2" : "\u25bc"}</div>
      </button>
      {isOpen ? (
        <div
          className="dropdownOptionsContainer"
          style={{
            maxHeight: optionsMaxHeight,
          }}
        >
          <OptionItem
            style={styles.clearSelectAll}
            handleClick={() => {
              setSelectedOptions([]);
              setIsOpen(false);
              handleChange?.([]);
            }}
            option={{label: "Clear", value: "clear"}}
          />
          {multiSelect ? (
            <OptionItem
              style={styles.clearSelectAll}
              handleClick={() => {
                const allOptions = [...options];
                setSelectedOptions(allOptions);
                setIsOpen(false);
                handleChange?.(allOptions);
              }}
              option={{label: "Select All", value: "selectAll"}}
            />
          ) : null}
          <div className="divider" />
          {dropdownOptions}
        </div>
      ) : null}
    </div>
  );
}

const styles: {[key: string]: CSSProperties} = {
  clearSelectAll: {
    height: "20px",
    fontSize: 14,
  },
};
