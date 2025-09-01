import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";
import { toast } from "react-toastify";
import { GiToadTeeth } from "react-icons/gi";

export const addTofavorite = async (itemId, itemType) => {
  try {
    const user = getCurrentUser();
    const userId = user ? user._id : null;

    const response = await axios.post(EndPoint.ADD_TO_FAVORITE, {
      itemId,
      itemType,
      userId,
    });

    if (response.data.message === "already added") {
      toast.error("Already in favorites");
      return;
    }

    console.log("Favorite added successfully:", response.data);
    toast.success("Added to favorites ✅");
    return response.data;
  } catch (error) {
    console.error("Error in addToFavorite:", error.response?.data || error.message);
    toast.error("Something went wrong");
    throw error;
  }
};


//  try {
//     const user = getCurrentUser();
//     const userId = user ? user._id : null;
//     if (!userId) {
//       toast.error("User not logged in");
//       return;
//     }
//     const res = await axios.post(EndPoint.ADD_TO_FAVORITE, {
//       userId,
//       itemId,
//       itemType
//     });
//       toast.success("Added to favorites");
//       return res.data;
//   } catch (err) {
//     if(err.res.status === 404){
//       toast.error("already added in fav");
//     }
//     console.error("Error in addTofavorite:", err.message);
//     toast.error("Something went wrong");
//   }