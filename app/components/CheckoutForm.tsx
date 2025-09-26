import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  address: string;
};

export default function CheckoutForm({ onClose }: { onClose?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    // Gerçek uygulamada burada API çağrısı yapılır.
    console.log("Sipariş formu gönderildi:", data);
    setSubmittedData(data);
    reset();
    if (onClose) {
      // küçük gecikme ile kapatmayı sağlayabilirsiniz (opsiyonel)
      setTimeout(() => onClose(), 50000);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Teslimat Bilgileri</h2>

      {isSubmitSuccessful && submittedData ? (
        <div className="p-4 mb-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Siparişiniz alındı. Gönderilen email: <strong>{submittedData.email}</strong>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4 text-black">
          <label className="block mb-1 font-medium text-black">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email zorunlu",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Geçerli bir email girin",
              },
            })}
            className=" text-black w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Adres</label>
          <textarea
            {...register("address", {
              required: "Adres zorunlu",
              minLength: {
                value: 50,
                message: "Adres en az 50 karakter olmalı",
              },
            })}
            className="text-black w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address.message}</span>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
