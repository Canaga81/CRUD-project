import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [item, setItem] = useState({}); // useState fonksiyonunun düzeltilmiş kullanımı

  useEffect(() => {
    axios
      .get("https://6628a0ff54afcabd07365b50.mockapi.io/products/" + id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, [id]); // useEffect bağımlılık dizisine id eklenmiş

  return (
    <div className="w-full h-full py-12 px-9">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3 items-center justify-center">
          <p>Məsulun İd: {item.id}</p>
          <h2>Məhsulun Adı: {item.title}</h2>
          <span>Məhsulun Qiyməti: {item.price} ₼</span>
          <div>
            <h2>Məsulun Şəkli: </h2>
            <img className="w-[500px] h-[350px] mt-2" src={item.image} alt="" />
          </div>
          <Link to={"/"}>
            <button className="bg-red-600 py-2 px-6 text-white font-bold rounded-lg text-xl outline-none border-none transition-all hover:opacity-80">Geri Dön ⬅️</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;