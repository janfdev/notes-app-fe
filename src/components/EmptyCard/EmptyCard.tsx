type emptyState = {
  imgSrc: string;
  message: string;
};

const EmptyCard = ({ imgSrc, message }: emptyState) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="no notes" className="w-60" />
      <p className="w-1/2 text-sm capitalize font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
