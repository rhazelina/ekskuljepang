import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Home = () => {
  const [materiList, setMateriList] = useState([]);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const q = query(collection(db, "materi"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() 
        }));
        setMateriList(list);
      } catch (error) {
        console.error("教材の読み込みエラー:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMateri();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString("ja-JP", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: "Asia/Tokyo"
    });
  };
  //     const formatDate = (date) => {
//     return date.toLocaleString("id-ID", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit"
//     });
//   };s

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyMDQsMjA0LDIwNCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')" }}>
            <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-wider">
            <span className="text-red-600">日本</span>
            <span className="text-gray-800">語課外活動へようこそ</span>
          </h2>
          {/* <p className="text-gray-600 font-medium">下から学習を始めてください</p> */}
            <p className="text-gray-600 font-medium">JANGAN LUPA DI KUMPULIN YAH TUGASNYA ♡♡♡ 
            </p>
            <p className="text-gray-600 font-small">                 Harris Senpai ―</p>
        </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-600">
            <span className="font-medium text-gray-700">
              <span className="text-red-600">東京時間: </span>
              {formatDate(now)}
            </span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materiList.length > 0 ? (
              materiList.map((materi) => (
                <Link 
                  to={`/materi/${materi.id}`} 
                  key={materi.id} 
                  className="cursor-pointer bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-red-600"
                  style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXBlciIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPjxwYXRoIGQ9Ik0wIDIwIEgyMCA0MCAyMCAwIDAgMjB6TTIwIDQwIEw0MCAyMCA0MCAwIDIwIDB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU1ZTUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXBlcikiLz48L3N2Zz4=')" }}
                >
                  <h3 className="font-bold text-xl text-gray-800 mb-1 tracking-wide">{materi.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{materi.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {materi.createdAt?.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">見る</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">利用可能な教材がありません</p>
              </div>
            )}
          </div>
        )}

        {/* Japanese decorative elements */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="w-8 h-1 bg-red-600"></div>
            <span className="text-gray-500 text-sm">頑張ってください！</span>
            <div className="w-8 h-1 bg-red-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;