async function postPledge(amount, comment, anonymous, project) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = window.localStorage.getItem("token");
  const fallbackError = `Error making a pledge`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        amount: amount,
        comment: comment,
        anonymous: anonymous,
        project: project,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.amount) {
        alert(`Donation failed: ${errorData.amount[0]}`);
      } else if (errorData.detail) {
        alert(`Donation failed: ${errorData.detail[0]}`);
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

export default postPledge;
