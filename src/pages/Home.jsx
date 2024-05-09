import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("https://6628a0ff54afcabd07365b50.mockapi.io/products");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Yükleme tamamlandıktan sonra loading durumunu false olarak ayarla
      }
    };

    getAllProducts();
  }, []);

  const deleteHandler = async (id) => {

    try {
      await axios.delete(
        `https://6628a0ff54afcabd07365b50.mockapi.io/products/${id}`
      );
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Mehsul Silindi !");
    } catch (error) {
      alert("Mehsul Silinmedi !" + error);
    }

  };

  return (

    <div className="w-full h-full py-16">
      <div className="container mx-auto px-16">
        <Link to={"/create"}>
          <button className="py-2 px-6 bg-red-500 my-9 rounded-lg text-white font-bold transition-all opacity-70 hover:opacity-100">
            Məhsul Yarat
          </button>
        </Link>
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <h1>Heç Bir Məhsul Yoxdur !</h1>
        ) : (
          <table className="table table-bordered table-striped table-secondary">
            <thead>
              <tr>
                <th>İd Kodu</th>
                <th>Şəkli</th>
                <th>Adı</th>
                <th>Qiyməti</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="h-[150px] leading-[150px]">{item.id}</td>
                  <td className="h-[150px] relative px-5">
                    <img
                      className="w-[90px] h-[90px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                      src={item.image}
                      alt=""
                    />
                  </td>
                  <td className="h-[150px] leading-[150px]">{item.title}</td>
                  <td className="h-[150px] leading-[150px]">{item.price} ₼</td>
                  <td className="flex items-center gap-3 justify-center h-[180px]">
                    <Link to={`/read/${item.id}`}>
                      <button className="bg-slate-400 py-1 px-1.5 rounded-md">🎯</button>
                    </Link>
                    <Link to={`/update/${item.id}`}>
                      <button className="bg-slate-400 py-1 px-1.5 rounded-md">🖊️</button>
                    </Link>
                    <button onClick={() => deleteHandler(item.id)} className="bg-slate-400 py-1 px-1.5 rounded-md">❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

};

export default Home;