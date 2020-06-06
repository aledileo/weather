async function fetcher(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message);
      throw data.error;
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export default fetcher;
