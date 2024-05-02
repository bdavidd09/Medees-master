import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import pillsImage from '../../Images/pills.jpg';
import ConfirmationScreen from '../Confirmation/ConfirmationScreen';
import { requestNotificationPermission } from '../NotificationService/notificationService';
//import Parse from 'parse';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton'; // Add this if LogoutButton is in another file
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const FooterComponent = () => (
  <footer>
    <nav>
      <center>
        <Link to="/footer">
          <Button id="b1" variant="outlined">
            Back to Home
          </Button>
        </Link>
      </center>
    </nav>
  </footer>
);

const Main = () => {
  const location = useLocation();
  const navigate =  useNavigate();

  const [medicationName, setMedicationName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [morning, setMorning] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [night, setNight] = useState(false);
  const [dietaryAdvice, setDietaryAdvice] = useState('');
  const [supplyAmount, setSupplyAmount] = useState('');
 // const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    requestNotificationPermission();
    if (location.state?.formData) {
      const { formData } = location.state;
      setMedicationName(formData.medicationName || '');
      setBrandName(formData.brandName || '');
      setTimesPerDay(formData.timesPerDay || '');
      setDosage(formData.dosage || '');
      setMorning(formData.morning || false);
      setAfternoon(formData.afternoon || false);
      setNight(formData.night || false);
      setDietaryAdvice(formData.dietaryAdvice || '');
      setSupplyAmount(formData.supplyAmount || '');
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      medicationName,
      brandName,
      dosage,
      timesPerDay,
      morning,
      afternoon,
      night,
      dietaryAdvice,
      supplyAmount
    };
    setFormData(data);
    //setShowConfirmation(true);
    navigate('/confirmation', { state: { formData: data } });
  };

  /*
  const clearForm = () => {
    setMedicationName('');
    setBrandName('');
    setDosage('');
    setTimesPerDay('');
    setMorning(false);
    setAfternoon(false);
    setNight(false);
    setDietaryAdvice('');
    setSupplyAmount('');
  };
/*
  const handleConfirmation = async () => {
    console.log('Confirmed: ', formData);
    try {
      // Ensure that there's a logged-in user
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.error('User is not logged in.');
        // Optionally, redirect to login or show a message prompting to log in
        return;
      }
 
      // Create a new Medication Parse Object
      const Medication = new Parse.Object('Medication');
      Medication.set('medicationName', formData.medicationName);
      Medication.set('brandName', formData.brandName);
      Medication.set('dosage', formData.dosage);
      Medication.set('timesPerDay', formData.timesPerDay);
      Medication.set('morning', formData.morning);
      Medication.set('afternoon', formData.afternoon);
      Medication.set('night', formData.night);
      Medication.set('dietaryAdvice', formData.dietaryAdvice);
      Medication.set('supplyAmount', formData.supplyAmount);
  
      // Set the current user as the creator of this Medication entry
      Medication.set('createdBy', currentUser);
  
      // Save the Medication object with the user association
      await Medication.save();
      console.log('Medication saved successfully');
  
      // After successful saving, navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error saving medication:', error);
    }
    clearForm();
    setShowConfirmation(false);
  };

  const handleEdit = () => {
    clearForm();
    setShowConfirmation(false);
  };
  */

return (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MEDEE's
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>

    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <Typography variant="h5">
        MEDEE's Mission: To empower individuals to maintain their independence
        while ensuring consistent and timely adherence to medication schedules
        through innovative technology solutions.
      </Typography>
      <img src={pillsImage} alt="Pills" style={{ maxWidth: '100%', height: 'auto', marginTop: 2 }} />
      <Typography component="h3">Hello Friend!</Typography>
    </Box>

    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        id="medication-name"
        label="Medication Name"
        variant="outlined"
        value={medicationName}
        onChange={(e) => setMedicationName(e.target.value)}
      />
      <TextField
        id="brand-name"
        label="Brand Name"
        variant="outlined"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <TextField
        id="dosage"
        label="Dosage"
        variant="outlined"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />
      <TextField
        id="times-per-day"
        label="Times per Day"
        variant="outlined"
        value={timesPerDay}
        onChange={(e) => setTimesPerDay(e.target.value)}
      />
      <label htmlFor="morning">Morning:</label>
      <input
        id="morning"
        type="checkbox"
        checked={morning}
        onChange={(e) => setMorning(e.target.checked)}
      />
      <label htmlFor="afternoon">Afternoon:</label>
      <input
        id="afternoon"
        type="checkbox"
        checked={afternoon}
        onChange={(e) => setAfternoon(e.target.checked)}
      />
      <label htmlFor="night">Night:</label>
      <input
        id="night"
        type="checkbox"
        checked={night}
        onChange={(e) => setNight(e.target.checked)}
      />
      <TextField
        id="dietary-advice"
        label="Dietary Advice"
        variant="outlined"
        value={dietaryAdvice}
        onChange={(e) => setDietaryAdvice(e.target.value)}
      />
      <TextField
        id="supply-amount"
        label="Amount of Supply"
        variant="outlined"
        value={supplyAmount}
        onChange={(e) => setSupplyAmount(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>

    {/* FooterComponent at the bottom */}
    <FooterComponent />
  </>
)};
export default Main;
