# reactjs_form
Description:
Create a simple registration page using any Javascript framework (preferably ReactJS). Feel free to use any validation libraries, http request libraries, CSS libraries or any other library you feel necessary.
The form should validate full_name, contact_number, email, date_of_birth, password, and confirm_password fields. If the user presses the “submit” button, the form should validate, and the error messages should appear accordingly.

The API route will return either success or failure messages. The messages should appear to the user on the alert message component, and the colors should change according to the status returned.
 
 API description:
 Success: If full_name, contact_number, email, date_of_birth, and password are present, the API will return a success message containing the title and description. 
 
NOTE: The date_of_birth is a concatenation of day, month, and year dropdown values. 
Error:  If the following full_name, contact_number, email, date_of_birth, and password are missing, the API will return an error message containing the title and description. 
Form validation:
full_name: Not empty, no symbols.
contact_number: Not empty, Canadian phone number format
email: Not empty, email format
day: Not empty, calendar days
month: Not empty, Jan - Dec.
year: Not empty, any past date. 
password: 
1- Not empty.
2- Lower case (a-z), upper case (A-Z) and numbers (0-9).
3- Must have 8 characters in length
confirm_password: Must be the same as the password field
