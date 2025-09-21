import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ProductsDashboard() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "products"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-[#111111] text-white pt-[90px] px-8"> 
      {/* ✅ pt-[80px] ensures content starts below fixed navbar */}
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
              <div key={product.id} className="bg-white/5 p-4 rounded-lg border border-white/20 flex flex-col space-y-2">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-white/70">{product.category}</p>
                <p className="text-white/50 text-sm truncate">{product.description}</p>
                {product.videoUrl && (
                  <video src={product.videoUrl} controls className="mt-2 w-full h-48 object-cover rounded" />
                )}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
