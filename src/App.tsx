import {CSSProperties, useState} from "react";
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
      RAP_SONG_OPTIONS[10],
    ]);

  return (
    <div>
      <h1>Hive Re-usable Dropdown Menu</h1>
      <div style={styles.dropdownContainer}>
        <div style={styles.selectBox}>
          <DropdownMenu
            handleChange={(options) => setSingleSelectedOptions(options)}
            title="Single Select..."
            options={DROPDOWN_OPTIONS}
          />
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Option from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {singleSelectedOptions.map((option) => option.label).join(" | ")}
            </div>
          </div>
        </div>

        <div style={styles.selectBox}>
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
              {multiSelectedOptions.map((option) => option.label).join(" | ")}
            </div>
          </div>
        </div>

        <div style={styles.selectBox}>
          <div style={{marginBottom: 5}}>
            {"Multi Select with pre-selected options"}
          </div>
          <DropdownMenu
            handleChange={(options) =>
              setMultiSelectedOptionsPreSelect(options)
            }
            title="Mutli Select..."
            multiSelect
            options={RAP_SONG_OPTIONS}
            // Demonstrates that we can pass pre-selected options
            selectedOptions={multiSelectedOptionsPreSelect}
          />
          <div style={{marginTop: 20}}>
            {/* Demonstrates that the parent can get the newly selected options */}
            {"Selected Options from parent:"}{" "}
            <div style={{fontWeight: "bold"}}>
              {multiSelectedOptionsPreSelect
                .map((option) => option.label)
                .join(" | ")}
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
    rowGap: "50px",
    columnGap: "50px",
  },
  selectBox: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "start",
    justifyContent: "center",
    width: "300px",
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
