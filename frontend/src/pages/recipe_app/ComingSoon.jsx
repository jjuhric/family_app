import { HardHat } from 'lucide-react';

const ComingSoon = () => {
 return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg justify-center items-center font-extrabold text-2xl text-yellow-600 overflow-hidden">
            <HardHat className="w-16 h-16 mr-4 animate-bounce" />
            Coming Soon...
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon   