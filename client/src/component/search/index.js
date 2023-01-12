import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GeoApiOptions, Geo_Api_Url } from '../../Api';
import './index.scss';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        if (!inputValue) {
            return {
                options: []
            }
        }
        return fetch(`${Geo_Api_Url}/cities?minPopulation=100000&namePrefix=${inputValue}`, GeoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`, label: `${city.name}, ${city.region}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch((err) => console.error(err));
    }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="search for a City"
            debouncetimeout={200}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search