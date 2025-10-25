import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../redux/slices/authSlice";
import { Edit } from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Change password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Aucun utilisateur connecté.
      </div>
    );
  }

  const userFields = [
    { label: "Prénom*", key: "firstName", value: user.firstName || "" },
    { label: "Nom*", key: "lastName", value: user.lastName || "" },
    { label: "Email*", key: "email", value: user.email || "" },
    { label: "Numéro*", key: "numeroPhone", value: user.numeroPhone || "" },
    { label: "Adresse*", key: "address", value: user.address || "" },
  ];

  const openModal = (field) => {
    setCurrentField(field);
    setTempValue(field.value);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, [currentField.key]: tempValue };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      dispatch(loginUser.fulfilled(updatedUser));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password/${
          user._id
        }`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Mot de passe modifié avec succès.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsPasswordModalOpen(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors du changement du mot de passe."
      );
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
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </form>

        {/* Change Password Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Sécurité du compte
          </h3>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Modifier le mot de passe
          </button>
        </div>
      </div>

      {/* Edit Modal */}
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

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold">
                Modifier le mot de passe
              </h2>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="px-6 py-6 space-y-4"
            >
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="bg-green-100 text-green-700 p-2 rounded-md text-sm">
                  {message}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
