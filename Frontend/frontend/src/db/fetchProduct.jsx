import axios from "axios";
export async function fetchProducts() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_PATH}products/getall`
    );
    console.log("data product", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Products:", error);
  }
}
