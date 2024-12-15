async function postUser(username, password, email) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;
  const fallbackError = `Error trying to register`;
  try {
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.username) {
        alert(
          `Registration failed - there seems to be an issue with the username field: ${errorData.username[0]}`
        );
      } else if (errorData.email) {
        alert(`Registration failed: ${errorData.email[0]}`);
      } else if (errorData.detail) {
        alert(`Error: ${errorData.detail}`);
      } else {
        alert(fallbackError);
      }
      throw new Error(fallbackError);
    }

    return await response.json();
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw error;
  }
}

export default postUser;
