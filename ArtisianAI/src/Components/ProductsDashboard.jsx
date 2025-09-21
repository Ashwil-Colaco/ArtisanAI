import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ProductsDashboard() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // 🔹 State for popup
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    description: "",
    videoUrl: "",
  });

  // ✅ Fetch products after auth state is ready
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, "products"),
        where("userId", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      });

      // Cleanup snapshot listener
      return () => unsubscribeSnapshot();
    });

    // Cleanup auth listener
    return () => unsubscribeAuth();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setEditForm({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      videoUrl: product.videoUrl || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentProduct) return;

    const productRef = doc(db, "products", currentProduct.id);
    await updateDoc(productRef, editForm);

    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-[#111111] text-white pt-[90px] px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Products</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-white/70 text-lg">No products added yet.</p>
          <button
            onClick={() => navigate("/addproduct")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => navigate("/addproduct")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-4 max-sm:ml-14"
          >
            Add Another Product
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 p-4 rounded-lg border border-white/20 flex flex-col space-y-2"
              >
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-white/70">{product.category}</p>
                <p className="text-white/50 text-sm truncate">{product.description}</p>
                {product.videoUrl && (
                  <video
                    src={product.videoUrl}
                    controls
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                )}

                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Edit Popup Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#1c1c1c] text-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
            />

            <label className="block mb-2 text-sm">Category</label>
            <input
              type="text"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
            />

            <label className="block mb-2 text-sm">Description</label>
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
            />

            <label className="block mb-2 text-sm">Video URL</label>
            <input
              type="text"
              value={editForm.videoUrl}
              onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
