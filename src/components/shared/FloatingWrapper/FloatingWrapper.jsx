export default function FloatingWrapper(props) {
  return <div
    className={'bg-main fixed left-1/2 -translate-x-1/2 flex flex-col bottom-[13%] z-10 w-3/4 rounded-lg shadow-2xl px-6 py-4 text-white'}
    style={{...props.styles}}
  >
    {props.children}
  </div>
}