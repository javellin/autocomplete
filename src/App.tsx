import { useState } from "react";
import { AutocompleteConfig } from "./common/utils";
import { Autocomplete } from "./components/Autocomplete";

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
    <div>
      <h2>Autocomplete challenge</h2>
      <p>Try typing words like "Jurnal" or "Murray"</p>
      <div>
        <Autocomplete config={config} setValue={handleChangeValue} />
        {!!value && <p>Value: {value?.name}</p>}
      </div>
    </div>
  );
}

export default App;
