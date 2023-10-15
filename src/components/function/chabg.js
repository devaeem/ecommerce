import axios from "axios";

export const updateStatusOrder = async (authtoken, orderId, orderstatus) =>
  await axios.put(
    import.meta.env.VITE_URL_API + "/admins/order-status",
    { orderId, orderstatus },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(import.meta.env.VITE_URL_API + "/admins/orders", {
      headers: {
        authtoken,
      },
    });
  };
