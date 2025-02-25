import Link from 'next/link';

const EntryCard = ({ entry }) => {
  return (
    <Link href={`/entries/${entry.id}/dayView`} passHref>
      <div className="flex flex-col items-center cursor-pointer"> {/* Add cursor-pointer for indication */}
        <div className="relative w-96 h-64 rounded-md bg-achieve-grey border-2 border-achieve-seagreen bg-opacity-70 text-white p-4 transition-transform duration-200 hover:scale-105"> {/* Add hover effect */}
          <h1 className="bg-achieve-seagreen rounded-md p-2 absolute top-3 left-3 text-lg font-bold">
            {new Date(entry.date).toLocaleDateString()}
          </h1>
          <div className="flex flex-col h-full justify-center items-center">
            <div className="w-full flex justify-around px-8">
              <div>
                <p className="text-3xl">{entry.weight}</p>
                <p className="text-xl">Weight</p>
              </div>
              <div>
                <p className="text-3xl">{entry.totalCalories}</p>
                <p className="text-xl">Calories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EntryCard;
