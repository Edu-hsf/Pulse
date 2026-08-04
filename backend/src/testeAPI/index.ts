async function updateUser() {
  const url = 'http://localhost:5432/users/1';
  const userData = { name: 'Alex' };

  try {
    const response = await fetch(url, {
      method: 'PATCH', // Define HTTP verb
      headers: {
        'Content-Type': 'application/json' // Tell server to expect JSON
      },
      body: JSON.stringify(userData) // Convert JavaScript object to string
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateUser()