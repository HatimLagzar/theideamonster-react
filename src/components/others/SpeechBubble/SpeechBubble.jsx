
function SpeechBubble({ text, disableImage = false, style = {} }) {
  return (
    <div
      className='absolute top-[60%] left-2 flex px-2 items-end'
      style={{ ...style }}
    >
      {!disableImage ? (
        <img
          src='/images/logo-holding-basket.png'
          width={65}
          className='mr-2'
        />
      ) : (
        ''
      )}

      <p className='bg-main rounded-full px-4 py-2 text-white leading-5'>
        {text}
      </p>
    </div>
  );
}

export default SpeechBubble;
