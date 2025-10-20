import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../redux/slices/authSlice"; // optional re-fetch or update logic
import { Edit } from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Aucun utilisateur connecté.
      </div>
    );
  }
  console.log(user);
  const userFields = [
    { label: "Prénom*", key: "firstName", value: user.firstName || "" },
    { label: "Nom*", key: "lastName", value: user.lastName || "" },
    { label: "Email*", key: "email", value: user.email || "" },
    { label: "Numéro*", key: "phone", value: user.phone || "" },
    {
      label: "Date de naissance",
      key: "birthDate",
      value: user.birthDate || "",
    },
    { label: "Genre", key: "gender", value: user.gender || "" },
  ];

  const openModal = (field) => {
    setCurrentField(field);
    setTempValue(field.value);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, [currentField.key]: tempValue };

      // ✅ Update user in backend (adjust endpoint as needed)
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // ✅ Update Redux & localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      dispatch(loginUser.fulfilled(updatedUser));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-3xl">
        <form className="space-y-6">
          {userFields.map((field) => (
            <div
              key={field.key}
              className="grid grid-cols-3 items-center border border-gray-200 rounded-md"
            >
              <div className="col-span-1 bg-gray-100 px-4 py-3 text-right font-medium text-gray-700 rounded-l-md">
                {field.label}
              </div>
              <div className="col-span-2 flex justify-between items-center bg-gray-50 px-4 py-3 rounded-r-md">
                <span className="text-gray-700">{field.value}</span>
                <button
                  type="button"
                  onClick={() => openModal(field)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold">
                Modifier votre{" "}
                {currentField?.label.toLowerCase().replace("*", "")}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentField?.label.replace("*", "")}
              </label>
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
