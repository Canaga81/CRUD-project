import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {

  const { id } = useParams();

  const [item, setItem] = useState({
    title: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    axios
      .get("https://6628a0ff54afcabd07365b50.mockapi.io/products/" + id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addHandler = async () => {
    try {
      axios.put(
        "https://6628a0ff54afcabd07365b50.mockapi.io/products/" + id,
        item
      );
      alert("Məhsul Güncəlləndi !");
      setItem({ title: "", image: "", price: "" });
    } catch (error) {
      alert("Məhsul Xətadan Dolayı Güncəllənmədi !" + error);
    }
  };

  return (
    <div className="w-full h-full py-12 px-9">
      <div className="container mx-auto h-screen bg-red-300 flex flex-col gap-6 items-center justify-center">
        <h1 className="text-4xl font-bold text-white tracking-[2.5px]">
          Məhsul Yarat
        </h1>
        <div className="flex flex-col gap-3 items-center justify-center w-[600px]">
          <input
            onChange={(e) => setItem({ ...item, title: e.target.value })}
            className="h-[30px] rounded-md w-full text-[18px] border py-3 px-6 border-black"
            type="text"
            placeholder="Məhsulun Adini Giriniz"
            value={item.title}
          />
          <input
            onChange={(e) => setItem({ ...item, price: e.target.value })}
            className="h-[30px] rounded-md w-full text-[18px] border py-3 px-6 border-black"
            type="number"
            placeholder="Məhsulun Qiymətini Giriniz"
            value={item.price}
          />
          <input
            onChange={(e) => setItem({ ...item, image: e.target.value })}
            className="h-[30px] rounded-md w-full text-[18px] border py-3 px-6 border-black"
            type="text"
            placeholder="Məhsulun Şəklinin Src Kodunu Giriniz"
            value={item.image}
          />

          <div className="flex items-center gap-7">
            <Link to={"/"}>
              <button className="bg-red-600 py-2 px-6 text-white font-bold rounded-lg text-xl outline-none border-none transition-all hover:opacity-80">
                Geri Dön ⬅️
              </button>
            </Link>
            <button
              onClick={addHandler}
              className="bg-green-600 py-2 px-6 text-white font-bold rounded-lg text-xl outline-none border-none transition-all hover:opacity-80"
            >
              Güncəllə ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;