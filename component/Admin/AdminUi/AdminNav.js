import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function AdminNav({ page }) {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full flex flex-row items-center justify-center relative">
      {page !== "ADMIN" && (
        <MdKeyboardBackspace
          className="absolute left-0 text-[34px] "
          onClick={() => navigate("/admin")}
        />
      )}
      <p className="font-[700] py-[20px]">{page}</p>
    </div>
  );
}
