import { useState } from "react";
import "./App.css";

import { useFetch } from "./hooks/use-simple-fetch";

function App() {
  const [inputValue, setInputValue] = useState("https://api.publicapis.org/entries");
  const [url, setUrl] = useState("https://api.publicapis.org/entries");
  const { data, isFetching, isError, error, refetch } = useFetch(url);

  return (
    <>
      <h1>simple-use-query</h1>
      <div className='inputs'>
        <input
          type="text"
          placeholder="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() =>
            setUrl(inputValue)
          }
        >
          Change url
        </button>
        <button onClick={refetch}>Refetch</button>
      </div>
      <div>
        <p>Fetching: {isFetching ? "Yes" : "No"}</p>
        <p>Data: {JSON.stringify(data)}</p>
        <p>Error occurred: {isError ? "Yes" : "No"}</p>
        <p>Error message: {error?.message}</p>
      </div>
    </>
  );
}

export default App;
