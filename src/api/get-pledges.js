async function getPledges() {
  const url = `${import.meta.env.VITE_API_URL}/pledges`;
  const token = "d4bff4a0b410dd7a7a1b7b21c79146234c579664";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = `Error fetching the pledges`;
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default getPledges;
