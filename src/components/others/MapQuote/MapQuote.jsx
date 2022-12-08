function MapQuote({quote}) {
  return <div className={'absolute left-4 bottom-20 w-2/5'}>
    <p className={'text-lg font-montserrat mb-1'}>{"\"" + quote.quote + "\""}</p>
    <p className={'font-montserrat text-sm'}>— {quote.author}</p>
  </div>
}

export default MapQuote;