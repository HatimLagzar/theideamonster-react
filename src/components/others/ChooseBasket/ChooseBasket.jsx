import styles from "../CreateDelegableForm/CreateDelegableForm.module.css";

export default function ChooseBasket({baskets, setSelectedBasket}) {
  return <>
    <div className={styles.baskets}>
      {
        baskets instanceof Array
          ? baskets.length > 0
            ? baskets.map((basket, index) => {
              return <button
                className={'px-2 text-white bg-blue-500 rounded-full shadow w-1/2 mb-2 text-sm odd:-ml-2 even:-mr-2 flex justify-between items-center'}
                key={index + '-delegable-basket'}
                onClick={() => setSelectedBasket(basket)}
              >
                <span className={'inline-block mr-auto'}>{basket.name}</span>
                <span
                  className={'rounded-full text-center border border-white inline-block text-xs w-4 h-4 leading-none bg-main text-white ml-auto'}
                >
                    {basket.tasks.length}
                  </span>
              </button>
            })
            : 'No basket found, please create a basket from home page and add some tasks to it.'
          : 'Loading Baskets...'
      }
    </div>
    {
      /*baskets instanceof Array && baskets.length > 0
        ? <button
          key={'delegable-basket-next'}
          className={'inline-block ml-auto leading-none font-semibold font-montserrat'}
          onClick={() => setStep(SELECT_TASKS)}
        >
          Next <FontAwesomeIcon icon={faArrowRightLong} size={'xl'}/>
        </button>
        : ''*/
    }
  </>
}