import { Search } from '@mui/icons-material';
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import * as React from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter ({filter, cityList, onChange, onSearchChange}: StudentFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    }
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    }

    onChange(newFilter);
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search By Name"
              onChange={handleSearchChange}
              endAdornment={<Search />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="Filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map(city => (
                <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

