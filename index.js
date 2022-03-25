function purchase()
{
    // Declaring Global Variables
    var total = 0;
    var donation = 0;
    var totalWithDonation = 0;
    var errors = '';
    var userDetails = '';
    var reciept = '';
    var cardLastFour = '';

    // Retrieving Form fields data i.e. Name, Email id, Payment details and Items purchasing Quantity.
    var userName = document.getElementById('fullName').value;
    var userEmail = document.getElementById('emailId').value;
    var cardNumber = document.getElementById('creditCard').value;
    var expiryYear = document.getElementById('cardYear').value;

    var Basket = document.getElementById('basket').value;
    var Garden = document.getElementById('garden').value;
    var Cycle = document.getElementById('cycle').value;
    var MotorOil = document.getElementById('motoroil').value;
    var BigHammer = document.getElementById('bighammer').value;
    var Skateboard = document.getElementById('skateboard').value;

    // Converting Strings to Integers for calculations
    expiryYear = parseInt(expiryYear);
    Basket = parseInt(Basket);
    Garden = parseInt(Garden);
    Cycle = parseInt(Cycle);
    MotorOil = parseInt(MotorOil);
    BigHammer = parseInt(BigHammer);
    Skateboard = parseInt(Skateboard);
    cardLastFour = cardNumber.substr(cardNumber.length - 4); // Finding last 4 digit of credit card number

    // Regular Expressions for validating Name, Email, and payment details.
    var nameRegex = /^[A-Za-z]{1,}[\s]?[A-Za-z]{1,}$/;
    var emailRegex = /^[A-Za-z0-9\.]{1,50}[\@][A-Za-z0-9\-]{1,50}[\.][A-Za-z]{2,3}$/;
    var creditRegex = /^[\d]{4}[\-][\d]{4}[\-][\d]{4}[\-][\d]{4}$/;
    var cardYearRegex = /^[\d]{4}$/;

    // Validating mandatory field name.
    if (!nameRegex.test(userName)) {
        errors += 'Please enter your name. <br>';
    }

    // Validating if email is in format of email@domain.com
    if (!emailRegex.test(userEmail)) {
        errors += 'Please enter email address in email@domain.com format only. <br>';
    }

    // Displaying errors in paragraph tag if name or email is not in correct format.
    if (errors != '') {
        document.getElementById('errors').innerHTML = errors;
        document.getElementById('result').innerHTML = '';
        document.getElementById('userDet').innerHTML = '';
        document.getElementById('receiptTable').innerHTML = '';
    }
    else 
    { // Adding user details to a userDetails variable as table rows to display for final result.
        userDetails += `<tr><td style="font-weight: bold;">Name</td><td>${userName}</td></tr>`;
        userDetails += `<tr><td style="font-weight: bold;">Email</td><td>${userEmail}</td></tr>`;
        userDetails += `<tr><td style="font-weight: bold;">Credit Card</td><td>xxxx-xxxx-xxxx-${cardLastFour}</td></tr>`;
        // Adding headings for table reciept.
        reciept += `<tr style="font-weight: bold;"><td>Item</td><td>Quantity</td><td>Unit Price</td><td>Total Price</td></tr>`;
        // Calculations for items purchased
        if (Basket > 0) {
            total += Basket * 10; // adding total of this item to preexisting total value for donation and grand total calculations.
            reciept += `<tr><td>Tools</td><td>${Basket}</td><td>$10</td><td>$${Basket * 10}</td></tr>`; // If items are purchased a table row for that item is added to reciept variable.
        }
        if (Garden > 0) {
            total += Garden * 13;
            reciept += `<tr><td>Ladder</td><td>${Garden}</td><td>$13</td><td>$${Garden * 13}</td></tr>`;
        }
        if (Cycle > 0) {
            total += Cycle * 20;
            reciept += `<tr><td>Cycle</td><td>${Cycle}</td><td>$18</td><td>$${Cycle * 18}</td></tr>`;
        }
        if (MotorOil > 0) {
            total += MotorOil * 21;
            reciept += `<tr><td>MotorOil</td><td>${MotorOil}</td><td>$21</td><td>$${MotorOil * 21}</td></tr>`;
        }
        if (BigHammer > 0) {
            total += BigHammer * 7;
            reciept += `<tr><td>BigHammer</td><td>${BigHammer}</td><td>$7</td><td>$${BigHammer * 7}</td></tr>`;
        }
        if (Skateboard > 0) {
            total += Skateboard * 6;
            reciept += `<tr><td>Skateboard</td><td>${Skateboard}</td><td>$6</td><td>$${Skateboard * 6}</td></tr>`;
        }

        // Calculation donation if 10 % is higher or 10 $ .
        if ((total / 10) > 10) { // if 10 % of total is more than 10$
            donation = total / 10;
            reciept += `<tr><td>Donation</td><td colspan="2">10%</td><td>$${donation}</td></tr>`; // Adding donation row to reciept variable.
        }
        else if ((total / 10) <= 10 && total > 0) { // if 10 % of total is less than 10 $
            donation = 10;
            reciept += `<tr><td>Donation</td><td colspan="2">Minimum</td><td>$${donation}</td></tr>`;
        }

        if (total > 0 && donation > 0) { // if customers have purchased something than do further calculations.
            totalWithDonation = total + donation; // Calculation grand total = total + donation.
            reciept += `<tr style="font-weight: bold;"><td colspan="3">Total</td><td>$${totalWithDonation}</td></tr>`; // Adding grand total row to reciept variable.
            // Validations for credit card number, expiry month and expiry year is done only if customers have purchased some items.
            if (!creditRegex.test(cardNumber)) {
                errors += 'Please enter credit card in xxxx-xxxx-xxxx-xxxx format only. <br>';
            }

            if (document.getElementById('cardMonth').value == '')
            {
                errors += 'Please select Credit card expiry month. <br>';
            }
        
            if (!cardYearRegex.test(expiryYear)) 
            {
                errors += 'Please enter Credit card expiry year in YYYY format only. <br>';
            }
        }

        // Display if have errors for payment details.
        if (errors != '')
        {
            document.getElementById('errors').innerHTML = errors;
            document.getElementById('result').innerHTML = '';
            document.getElementById('userDet').innerHTML = '';
            document.getElementById('receiptTable').innerHTML = '';
        } 
        else if (totalWithDonation > 0) // Display the user details and purchase reciept if there are no errors and users have purchased something.
        {
            document.getElementById('errors').innerHTML = '';
            document.getElementById('result').innerHTML = `Thank you for your purchase!`;
            document.getElementById('userDet').innerHTML = userDetails;
            document.getElementById('receiptTable').innerHTML = reciept;
            document.getElementById('receipt').style.display = 'block';
            document.getElementById('fundRaiser').style.display = 'none';
        }
        else // Display user details with Thank you for their time note if no items are purchased.
        {
            document.getElementById('result').innerHTML = `Thank you for your time!`;
            document.getElementById('receipt').style.display = 'block';
            document.getElementById('fundRaiser').style.display = 'none';
        }
    }
    return false; // returning boolean false so that after clicking submit we stay on same webpage.
}
