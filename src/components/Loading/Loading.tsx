import { DotLoader, BounceLoader, BeatLoader } from 'react-spinners';

const Loading = ({ text, size }: { text?: string, size: number }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-md z-50">
      <BeatLoader color="#DA70D6" size={size} />
      {text && <p className="text-center mt-12 text-[#DA70D6] text-lg font-medium">{text}</p>}
    </div>
  );
};

export default Loading;
