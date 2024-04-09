import { useState } from "react";
import { AutocompleteConfig } from "./common/utils";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";

import "./index.css";

interface Post {
  name: string;
  identifier: string;
}

function App() {
  const [value, setValue] = useState<Post>();

  const config: AutocompleteConfig<Post> = {
    identifier: "identifier",
    displayField: "name",
    fetchData: (search: string): Promise<Post[]> =>
      fetch(`https://demo.dataverse.org/api/search?q=${search}`).then(
        async (res) => {
          const json = await res.json();
          return json.data.items;
        }
      ),
  };

  const handleChangeValue = (value: Post) => {
    setValue(value);
  };

  return (
    <div className="root">
      <h2>Autocomplete challenge</h2>
      <p>Try typing words like "Jurnal" or "Murray"</p>
      <div className="root-container">
        <Autocomplete config={config} setValue={handleChangeValue} />
        {!!value && (
          <div>
            <p className="root-container__value">Value: {value?.name}</p>
            <p className="root-container__value">
              Identifier: {value?.identifier}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
