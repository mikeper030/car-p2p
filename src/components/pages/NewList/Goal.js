import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './new-car.css'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const finGoals = [
    {
      value: 'Cover you car payment'
    },
    {
      value: 'Side business'
  
    },
    {
      value: 'Not sure yet'
    },
  ];
  const usage = [
    {
      value: 'Never'
    },
    {
      value: 'Rarely: Once a month'
  
    },
    {
      value: 'Sometimes: Fortnightly'
    },
    {
      value: 'Often: Twice a week'
    },
    {
      value: 'Always: Everyday'
    },
  ];
  const frequency = [
    {
      value: 'Not sure yet'
    },
    {
      value: 'As often as possible'
  
    },
    {
      value: 'Rarely'
    },
  ];
  
  const useStyles = makeStyles((theme) => ({  
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
  export function Goal() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('Select');
    const [share, setUsage] = React.useState(usage);
    const [freq, setFrequency] = React.useState(frequency);
  
    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
    const handleChangeUsage = (event) => {
      setUsage(event.target.value);
    };
    const handleChangeFrequency = (event) => {
      setFrequency(event.target.value);
    };
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div className="form-flex-col">
          <span>What is your primary financial goal for sharing this car on GetACar?</span>
          <TextField
            id="filled-select-currency"
            select
            value={currency}
            onChange={handleChange}
            variant="filled"
          >
            {finGoals.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <span>How often do you or your family currently use this car?</span>
          <TextField
            id="filled-select-currency"
            select
            value={share}
            onChange={handleChangeUsage}
            variant="filled"
          >
            {usage.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <span>How often do you want to share your car?</span>
          <TextField
            id="filled-select-currency"
            select
            value={freq}
            onChange={handleChangeFrequency}
            variant="filled"
          >
            {frequency.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div><button className="primary-btn">Next</button></div>
      </form>
    );
  }