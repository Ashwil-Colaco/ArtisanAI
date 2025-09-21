import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    problem: "",
    benefits: "",
    audience: "",
    price: "",
    discount: "",
    buyLink: "",
    brand: "",
    contact: "",
    image: null, // changed from video → image
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in to add a product!");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = "";
      if (productData.image) {
        const storageRef = ref(
          storage,
          `products/${auth.currentUser.uid}/${productData.image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, productData.image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // ✅ Save to Firestore
      await addDoc(collection(db, "products"), {
        userId: auth.currentUser.uid,
        name: productData.name,
        category: productData.category,
        description: productData.description,
        problem: productData.problem,
        benefits: productData.benefits,
        audience: productData.audience,
        price: productData.price,
        discount: productData.discount,
        buyLink: productData.buyLink,
        brand: productData.brand,
        contact: productData.contact,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // ✅ Send same data to /ai
    await fetch("http://localhost:5000/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: auth.currentUser.uid,
    name: productData.name,
    category: productData.category,
    description: productData.description,
    problem: productData.problem,
    benefits: productData.benefits,
    audience: productData.audience,
    price: productData.price,
    discount: productData.discount,
    buyLink: productData.buyLink,
    brand: productData.brand,
    contact: productData.contact,
    imageUrl,
  }),
});



      alert("Product added successfully!");
      navigate("/products"); // Redirect to dashboard
    } catch (err) {
      console.error(err);
      alert("Error uploading product. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-white px-4 pt-25">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row w-full">
        {/* Right Side: Product Details */}
        <div className="lg:w-2/3 ml-auto fixed top-[65px] right-0 p-8 space-y-4 lg:pl-8 lg:pr-8 pr-8 pb-8 overflow-auto max-h-[calc(100vh-65px)] box-border">
          <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="text" name="category" placeholder="Category/Type" value={productData.category} onChange={handleChange} required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <textarea name="description" placeholder="Short Description" value={productData.description} onChange={handleChange} required rows={3}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition resize-none"/>
          <textarea name="problem" placeholder="Problem it Solves" value={productData.problem} onChange={handleChange} rows={2}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition resize-none"/>
          <textarea name="benefits" placeholder="Customer Benefits" value={productData.benefits} onChange={handleChange} rows={2}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition resize-none"/>
          <input type="text" name="audience" placeholder="Target Audience" value={productData.audience} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="text" name="discount" placeholder="Discounts/Offers" value={productData.discount} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="text" name="buyLink" placeholder="Where to Buy" value={productData.buyLink} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="text" name="brand" placeholder="Brand/Company Name" value={productData.brand} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          <input type="text" name="contact" placeholder="Contact" value={productData.contact} onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition"/>
          
          {/* Image Upload Section */}
          <div className="order-2 lg:order-1 lg:w-1/3 flex flex-col justify-center items-center lg:h-screen lg:fixed lg:top-24 lg:left-0 mr-8">
            <label className="mb-4 text-lg font-semibold">Upload Product Image</label>
            {!productData.image ? (
              <label className="flex flex-col justify-center items-center w-32 h-32 border-2 border-dashed border-white/50 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-white/70 text-sm text-center">Click to Upload</span>
                <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden"/>
              </label>
            ) : (
              <div className="flex flex-col items-center">
                <img src={URL.createObjectURL(productData.image)} alt="preview" className="mt-4 w-48 h-48 object-cover rounded-lg"/>
                <button type="button" onClick={() => setProductData({ ...productData, image: null })}
                  className="mt-2 px-4 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition">
                  Delete Image
                </button>
              </div>
            )}
          </div>

          <button type="submit" disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-lg py-3 font-semibold mt-5">
            {uploading ? "Uploading..." : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
}