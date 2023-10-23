import {CSSProperties, useMemo, useState} from "react";
import "./App.css";
import DropdownMenu, {Option} from "./components/dropdown_menu";

export default function App() {
  const [singleSelectedOptions, setSingleSelectedOptions] = useState<Option[]>(
    []
  );

  const [multiSelectedOptions, setMultiSelectedOptions] = useState<Option[]>(
    []
  );

  const [multiSelectedOptionsPreSelect, setMultiSelectedOptionsPreSelect] =
    useState<Option[]>([
      RAP_SONG_OPTIONS[0],
      RAP_SONG_OPTIONS[3],
      RAP_SONG_OPTIONS[5],
      RAP_SONG_OPTIONS[11],
    ]);

  const [mutliSelectManyOptions, setMultiSelectManyOptions] = useState<
    Option[]
  >([]);

  // prevent re-render when other things change on this level (and above).
  const bigMultiSelect = useMemo(() => {
    return (
      <DropdownMenu
        title="Mutli Select many options..."
        handleChange={(options) => setMultiSelectManyOptions(options)}
        multiSelect
        limitChips={5}
        options={LOTS_OF_OPTIONS}
      />
    );
  }, []);

  const getSelectionString = (options: Option[]) => {
    return options.map((option) => option.label).join(" | ");
  };

  return (
    <div>
      <h1>Hive Reusable Dropdown Menu</h1>
      <div style={styles.dropdownContainer}>
        {/* SINGLE SELECT */}
        <div style={styles.selectBox}>
          <div style={{marginBottom: 5}}>{"Single Select"}</div>
          <DropdownMenu
            title="Single Select..."
            width="200px"
            handleChange={(options) => setSingleSelectedOptions(options)}
            options={DROPDOWN_OPTIONS}
          />
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Option from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {getSelectionString(singleSelectedOptions)}
            </div>
          </div>
        </div>

        {/* MULTI SELECT */}
        <div style={styles.selectBox}>
          <div style={{marginBottom: 5}}>{"Multi Select"}</div>
          <DropdownMenu
            title="Mutli Select..."
            handleChange={(options) => setMultiSelectedOptions(options)}
            multiSelect
            options={RAP_SONG_OPTIONS}
            optionsMaxHeight="500px"
          />
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Options from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {getSelectionString(multiSelectedOptions)}
            </div>
          </div>
        </div>

        {/* MULTI SELECT WITH PRE-SELECTED OPTIONS */}
        <div style={styles.selectBox}>
          <div style={{marginBottom: 5}}>
            {"Multi Select with pre-selected options"}
          </div>
          <DropdownMenu
            title="Mutli Select..."
            handleChange={(options) =>
              setMultiSelectedOptionsPreSelect(options)
            }
            multiSelect
            options={RAP_SONG_OPTIONS}
            // Demonstrates that we can pass pre-selected options
            selectedOptions={multiSelectedOptionsPreSelect}
          />
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Options from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {getSelectionString(multiSelectedOptionsPreSelect)}
            </div>
          </div>
        </div>

        {/* MULTI SELECT WITH MANY OPTIONS */}
        <div style={styles.selectBox}>
          <div style={{marginBottom: 5}}>
            {`Multi Select with many options: ${LOTS_LENGTH}`}
          </div>
          {bigMultiSelect}
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Options from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {getSelectionString(mutliSelectManyOptions)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: {[key: string]: CSSProperties} = {
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: "100px",
    columnGap: "50px",
  },
  selectBox: {
    display: "flex",
    maxWidth: "350px",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "start",
  },
};

const DROPDOWN_OPTIONS: Option[] = [
  {label: "Hello", value: "hello"},
  {label: "World", value: "world"},
  {label: "I", value: "i"},
  {label: "Am", value: "am"},
  {label: "Here", value: "here"},
  {label: "How", value: "how"},
  {label: "Is", value: "is"},
  {label: "It", value: "it"},
  {label: "Going", value: "going"},
];

// I used ChatGPT to generate this :)
const RAP_SONG_OPTIONS: Option[] = [
  {label: "Sicko Mode", value: "sickoMode"},
  {label: "Old Town Road", value: "oldTownRoad"},
  {label: "Hotline Bling", value: "hotlineBling"},
  {label: "God's Plan", value: "godsPlan"},
  {label: "Rockstar", value: "rockstar"},
  {label: "Congratulations", value: "congratulations"},
  {label: "Bad and Boujee", value: "badAndBoujee"},
  {label: "Lucid Dreams", value: "lucidDreams"},
  {label: "Bodak Yellow", value: "bodakYellow"},
  {label: "Humble", value: "humble"},
  {label: "Love the Way You Lie", value: "loveTheWayYouLie"},
  {label: "Black and Yellow", value: "blackAndYellow"},
  {label: "Started From the Bottom", value: "startedFromTheBottom"},
  {label: "No Limit", value: "noLimit"},
  {label: "Believer", value: "believer"},
];

const LOTS_LENGTH = 3000;

const LOTS_OF_OPTIONS: Option[] = Array.from({length: LOTS_LENGTH}, (_, i) => {
  const currI = i++;
  return {label: `Label ${currI}`, value: `value${currI}`};
});
