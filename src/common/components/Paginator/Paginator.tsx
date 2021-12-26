import {useState} from "react";
import styles from './Paginator.module.scss'

export const Paginator = ({totalItemsCount}: PropsType) => {
 const currentPage=1
 const pageSize=2//количество элементов на 1 странице
 const portionSize=5 //количество видимых кнопок
 const onChangedPage=(p:number) => {
  }
  // const {currentPage, pageSize, totalItemsCount, portionSize, onChangedPage} = props
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  console.log('pages', pages)

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 &&
      <button
        className={styles.arrowButton}
        onClick={() => {
          setPortionNumber(portionNumber - 1)
        }}>&lt;&lt;&lt;</button>}

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span
              // className={currentPage === p ? styles.selectedPage : styles.pageNumber}
              className={currentPage === p ? `${styles.numberPage} ${styles.selected}` : styles.numberPage}
              key={p}
              onClick={(e) => {
                onChangedPage(p)
              }}
            >{p}</span>
          )
        })}

      {portionCount > portionNumber &&
      <button
        className={styles.arrowButton}
        onClick={() => {
          setPortionNumber(portionNumber + 1)
        }}>&gt;&gt;&gt;</button>}
    </div>
  )
}
type PropsType = {
  totalItemsCount: number

}