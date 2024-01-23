import axios from "axios";

const getTVShow = async () => {
  try {
    const response = await axios.get("https://api.tvmaze.com/shows/19");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show data:", error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};

const getCast = async () => {
  try {
    const response = await axios.get("https://api.tvmaze.com/shows/19/cast");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes data:", error.message);
    throw error;
  }
};

const getEpisodes = async () => {
  try {
    const response = await axios.get(
      "https://api.tvmaze.com/shows/19/episodes"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes data:", error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};


const getSeasons = async () => {
  try {
    const response = await axios.get(
      "https://api.tvmaze.com/shows/19/seasons"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes data:", error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};

export {getTVShow, getEpisodes, getCast, getSeasons};

