// src/hooks/useUserCredits.js
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useUserCredits = (user) => {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    // Real-time listener 🔁
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCredits(data.credits ?? 0);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const deductCredit = async () => {
    if (!user || credits <= 0) return;
    const newCredits = credits - 1;
    await updateDoc(doc(db, "users", user.uid), { credits: newCredits });
    // no need to manually setCredits — it auto updates via onSnapshot
  };

  return { credits, deductCredit };
};

export default useUserCredits;
