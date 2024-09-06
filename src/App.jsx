
import { useEffect, useState } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleSaveTime = () => {
    setTimeList([...timeList, time]);
  };

  const handleDeleteTime = (index) => {
    setTimeList(timeList.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center h-[200px] w-[400px] border rounded-xl py-2 px-4 border-yellow-600  bg-black text-white mb-4">
      <h1 className="text-4xl font-semibold mb-4">Balap Liar</h1>
        <div className="text-xl font-semibold mb-4">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="flex flex-row space-x-4">
          {running ? (
            <button
              className="border rounded-lg py-2 px-4 text-yellow-300 border-l"
              onClick={() => setRunning(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="border rounded-lg py-2 px-4  text-bold text-yellow-300"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
          )}
          <button
            className="border rounded-lg py-2 px-4 text-yellow-300"
            onClick={() => setTime(0)}
          >
            Reset
          </button>
          <button
            className="border rounded-lg py-2 px-4 text-yellow-300"
            onClick={handleSaveTime}
          >
            Save
          </button>
        </div>
      </div>
      {timeList.length > 0 && (
        <div className="flex flex-col items-center w-full">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table
                  className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white"
                >
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Peringkat
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Waktu
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeList.map((savedTime, index) => (
                      <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {("0" + Math.floor((savedTime / 60000) % 60)).slice(-2)}:
                          {("0" + Math.floor((savedTime / 1000) % 60)).slice(-2)}:
                          {("0" + ((savedTime / 10) % 100)).slice(-2)}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                         
                          <button
                            onClick={() => handleDeleteTime(index)}
                            className="bg-red-600 py-1  px-2 rounded-lg text-white text-sm"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
