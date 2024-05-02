import * as React from 'react';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Parse from 'parse'; // Make sure Parse is imported
//import Main from "./Main/Main";

const ConfirmationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData; // The form data passed via routing
  
    const handleSaveToDatabase = async () => {
      try {
        const currentUser = Parse.User.current();
        if (!currentUser) {
            const stringFail = currentUser ? currentUser + '... User is not logged in' : 'User is not logged in';
            alert(stringFail);
            //console.error('User is not logged in.');
            // Redirect the user to the login page or show a login prompt. Adjust the path as necessary.
            navigate('/auth/login');
            return;
        }
        const Medication = new Parse.Object('Medication');
        //Object.keys(formData).forEach((key) => {
        for (const [key] of Object.entries(formData)) {
          Medication.set(key, formData[key]);
        };
  
        Medication.set('UID', currentUser.get('UID')); // Assuming 'UID' corresponds to 'contr_uid' you want to store in Medication
        Medication.set('createdBy', currentUser);

        await Medication.save();
        // Data saved successfully, navigate to the main screen
        alert('Medication saved successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error saving medication:', error);
        alert('Failed to save medication: ' + error.message);
      }
    };
  
    const handleConfirm = () => {
      handleSaveToDatabase();
    };
  
    const handleEdit = () => {
      // When editing, go back to the form with the data presented for modification
      navigate('/', { state: { formData } }); // You might need to adjust the route here
    };

    if (!formData) {
        // Handle the case when formData is null or undefined
        alert('No data to confirm!');
        navigate('/');
        return null;
      }
  
    // Display each piece of form data for confirmation
    return (
      <div>
        <h2>Confirmation Screen</h2>
        {/* Display a summary of the formData for user confirmation */}
        {/* ... (the same presentation of formData as you currently have) ... */}
        {Object.entries(formData).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    );
  };
  
  export default ConfirmationScreen;
