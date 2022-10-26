import axios from "axios";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./search.css";

export default function Test({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return axios
      .get(`https://api.teleport.org/api/cities/?search=${inputValue}&limit=5`)
      .then((response) => {
        return {
          options: response.data._embedded["city:search-results"].map(
            (city) => {
              // splits and rejoins
              const cityFullValue = city.matching_full_name.split(", ");
              let x = cityFullValue[cityFullValue.length - 1];
              if (x[x.length - 1] === ")") {
                cityFullValue.pop();
              }
              cityFullValue[0].replaceAll(/ /g, "+");
              const cityFullLabel = city.matching_full_name.split(", ");
              const cityLabel = `${cityFullLabel[0]}, ${
                cityFullLabel[cityFullLabel.length - 1]
              }`;
              const cityValue = `${cityFullValue[0].replaceAll(/ /g, "+")},${
                cityFullValue[cityFullValue.length - 1]
              }`;
              return {
                // label for human reding, value for api call
                value: `${cityValue}`,
                label: `${cityLabel}`,
              };
            }
          ),
        };
      })
      .catch((err) => console.log(err));
  };

  return (
    <AsyncPaginate
      className="search"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}
