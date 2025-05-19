import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const MateriDetail = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const docRef = doc(db, "materi", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMateri({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching document: ", error);
        setLoading(false);
      }
    };
    fetchMateri();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md border-l-4 border-red-600">
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">教材を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (!materi) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md border-l-4 border-red-600">
          <h3 className="text-xl font-bold text-gray-800 mb-2">教材が見つかりません</h3>
          <p className="text-gray-600">指定された教材は存在しません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyMDQsMjA0LDIwNCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')" }}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-600" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXBlciIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPjxwYXRoIGQ9Ik0wIDIwIEgyMCA0MCAyMCAwIDAgMjB6TTIwIDQwIEw0MCAyMCA0MCAwIDIwIDB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU1ZTUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXBlcikiLz48L3N2Zz4=')" }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            <span className="text-red-600">{materi.title.split(' ')[0]}</span>
            {materi.title.substring(materi.title.indexOf(' '))}
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(materi.createdAt?.toDate()).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'short'
            })}
          </div>
        </div>

        {materi.image && (
          <div className="mb-8 overflow-hidden rounded-lg border-2 border-gray-200 shadow-md">
            <img 
              src={materi.image} 
              alt={materi.title} 
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=画像が読み込めません";
              }}
            />
          </div>
        )}

        <div className="prose max-w-none">
          <pre className="font-sans text-gray-700 leading-relaxed whitespace-pre-wrap">
            {materi.content}
          </pre>
        </div>

        {materi.tugasLink && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <a
              href={materi.tugasLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium tracking-wide shadow-md hover:shadow-lg"
            >
              <span>課題を提出する</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriDetail;