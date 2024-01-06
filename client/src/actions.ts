export const getMembers = () => fetch('/api/members').then(res => res.json());

export function validateUsername(username: string, feedbackElement: HTMLElement) {
    if (username) {
        // Send AJAX request to Flask route
        fetch('/validate-username?username=' + encodeURIComponent(username))
            .then(response => response.json())
            .then(data => {
                if (data.is_taken) {
                    feedbackElement.textContent = "Username is taken.";
                } else {
                    feedbackElement.textContent = "Username is available.";
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

export function debounce(func: Function, delay: number) {
    let debounceTimeout
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
}

export async function postData(url: string, data: Object) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


export async function register(username: string) {
    let isValid = await checkUsernameAvailability(username);
    if (isValid) {
        // Username is available, proceed with POST request
        postData('/register', { username: username })
            .then(data => {
                console.log(data)
                if (data.success) {
                    // Redirect to the URL provided by the server
                    window.location.href = data.redirect_url;
                } else {
                    // Handle unsuccessful registration
                    console.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);  // Handle errors
            });
        
    } else {
        // Show error or handle the case when the username is not available
        alert("Username is taken, please choose another one.");
    }
}

export async function checkUsernameAvailability(username: string) {
    try {
        const response = await fetch('/validate-username?username=' + encodeURIComponent(username));
        const data = await response.json();
        return !data.is_taken;
    } catch (error) {
        console.error('Error:', error);
        return false;  // Assume not valid in case of error
    }
}