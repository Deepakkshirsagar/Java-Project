// main.js
document.addEventListener('DOMContentLoaded', function () {
    // Load the customer list when the page is loaded
    getCustomerList();
});

function authenticateAndFetch(endpoint, method, body) {
    const authEndpoint = 'https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    const loginCredentials = {
        login_id: 'test@sunbasedata.com',
        password: 'Test@123'
    };

    // Perform authentication and obtain the token
    fetch(authEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
    })
    .then(response => response.json())
    .then(data => {
        // Use the obtained token for further API calls
        const authToken = data.token;

        // Call the provided endpoint with the obtained token
        return fetch(endpoint, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process the data received from the API
        console.log(data);
        // Update your UI or perform other actions based on the data
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors appropriately
    });
}

function getCustomerList() {
    const customerListEndpoint = 'https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';

    // Perform authentication and fetch the customer list
    authenticateAndFetch(customerListEndpoint, 'GET', null);
}
